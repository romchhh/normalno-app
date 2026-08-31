#!/usr/bin/env python3
"""Sync car listings from a Telegram channel into the SQLite database."""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
from collections import OrderedDict
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

SETUP_CMD = "npm run tg-sync:setup"


def load_env_file(path: Path) -> None:
    if not path.is_file():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ.setdefault(key, value)


def load_env(root: Path) -> None:
    env_candidates = [
        root / ".env",
        SCRIPT_DIR.parents[1] / ".env",
        SCRIPT_DIR.parents[2] / ".env",
        Path.cwd() / ".env",
    ]

    seen: set[Path] = set()
    for env_path in env_candidates:
        resolved = env_path.resolve()
        if resolved in seen or not resolved.is_file():
            continue
        seen.add(resolved)
        try:
            from dotenv import load_dotenv

            load_dotenv(resolved, override=False)
        except ImportError:
            load_env_file(resolved)


def ensure_dependencies() -> None:
    missing: list[str] = []
    try:
        import telethon  # noqa: F401
    except ImportError:
        missing.append("telethon")

    if missing:
        message = (
            "Python залежності не встановлені. Виконайте на сервері: "
            f"{SETUP_CMD}"
        )
        print(json.dumps({"ok": False, "error": message}, ensure_ascii=False))
        raise SystemExit(1)


ensure_dependencies()

from telethon import TelegramClient  # noqa: E402
from telethon.tl.types import Message  # noqa: E402

from db import (  # noqa: E402
    generate_uid,
    get_car_photo,
    resolve_db_path,
    resolve_project_root,
    upsert_car,
)
from parser import is_car_post, parse_car_post  # noqa: E402

ROOT = resolve_project_root(SCRIPT_DIR / "sync.py")
load_env(ROOT)

DEFAULT_CHANNEL_ID = -1001949651952


def project_paths(root: Path) -> dict[str, Path]:
    return {
        "upload_dir": root / "public" / "uploads" / "cars",
        "session_default": root / "scripts" / "telegram_channel" / "session",
    }


def resolve_session_path(root: Path) -> str:
    paths = project_paths(root)
    session_path = os.getenv("TELEGRAM_SESSION_PATH", str(paths["session_default"])).strip()
    session = Path(session_path)
    if not session.is_absolute():
        session = (root / session_path).resolve()
    return str(session)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Sync cars from Telegram channel")
    parser.add_argument("--login", action="store_true", help="Authorize Telegram user session")
    parser.add_argument("--limit", type=int, default=int(os.getenv("TELEGRAM_SYNC_LIMIT", "400")))
    parser.add_argument("--channel", type=int, default=int(os.getenv("TELEGRAM_CHANNEL_ID", str(DEFAULT_CHANNEL_ID))))
    parser.add_argument("--json", action="store_true", help="Print result as JSON")
    return parser.parse_args()


def get_message_text(message: Message) -> str:
    return (message.message or message.text or "").strip()


def build_message_groups(messages: list[Message]) -> OrderedDict[str | int, list[Message]]:
    grouped: OrderedDict[str | int, list[Message]] = OrderedDict()
    for message in messages:
        key: str | int = message.grouped_id if message.grouped_id else f"single_{message.id}"
        grouped.setdefault(key, []).append(message)

    for key in grouped:
        grouped[key].sort(key=lambda item: item.id)
    return grouped


def get_group_text(messages: list[Message]) -> str:
    parts: list[str] = []
    for message in messages:
        text = get_message_text(message)
        if text:
            parts.append(text)
    return "\n".join(parts).strip()


async def download_group_photos(
    client: TelegramClient,
    messages: list[Message],
    group_key: str | int,
    upload_dir: Path,
) -> str:
    upload_dir.mkdir(parents=True, exist_ok=True)
    paths: list[str] = []
    index = 0

    for message in messages:
        if not message.photo:
            continue
        filename = f"tg_{group_key}_{message.id}_{index}.jpg"
        target = upload_dir / filename
        web_path = f"/uploads/cars/{filename}"
        if not target.exists():
            await client.download_media(message, file=str(target))
        if target.exists():
            paths.append(web_path)
        index += 1

    return " ".join(paths)


def group_has_photos(messages: list[Message]) -> bool:
    return any(message.photo for message in messages)


async def sync_channel(args: argparse.Namespace) -> dict:
    root = resolve_project_root(SCRIPT_DIR / "sync.py")
    paths = project_paths(root)

    api_id = os.getenv("TELEGRAM_API_ID")
    api_hash = os.getenv("TELEGRAM_API_HASH")
    if not api_id or not api_hash:
        raise RuntimeError("Додайте TELEGRAM_API_ID та TELEGRAM_API_HASH у .env")

    session_path = resolve_session_path(root)
    database_url = os.getenv("DATABASE_URL", "file:./dev.db")
    db_path = resolve_db_path(root, database_url)

    stats = {
        "imported": 0,
        "updated": 0,
        "photosAdded": 0,
        "skipped": 0,
        "errors": [],
        "processedGroups": 0,
        "channelId": args.channel,
        "limit": args.limit,
        "projectRoot": str(root),
        "databasePath": str(db_path),
    }

    client = TelegramClient(session_path, int(api_id), api_hash)
    await client.start()

    if args.login:
        await client.disconnect()
        return {"ok": True, "message": "Telegram session authorized"}

    try:
        messages = await client.get_messages(args.channel, limit=args.limit)
        groups = build_message_groups(messages)

        for group_key, messages_in_group in groups.items():
            stats["processedGroups"] += 1
            try:
                text = get_group_text(messages_in_group)
                if not text or not is_car_post(text):
                    stats["skipped"] += 1
                    continue

                parsed = parse_car_post(text)
                if not parsed:
                    stats["skipped"] += 1
                    continue

                external_id = f"tg:{args.channel}:{group_key}"
                existing_photo = get_car_photo(db_path, external_id)
                photo: str | None = existing_photo

                if group_has_photos(messages_in_group) and not existing_photo:
                    downloaded = await download_group_photos(
                        client, messages_in_group, group_key, paths["upload_dir"]
                    )
                    if downloaded.strip():
                        photo = downloaded
                        stats["photosAdded"] += 1
                elif not existing_photo:
                    photo = None

                result = upsert_car(
                    db_path,
                    external_id=external_id,
                    uid=generate_uid(external_id),
                    title=parsed.title,
                    brand=parsed.brand,
                    mark=parsed.mark,
                    year=parsed.year,
                    mileage=parsed.mileage,
                    price=parsed.price,
                    price_usd=parsed.priceUSD,
                    monthly_payment=parsed.monthlyPayment,
                    advance_payment=parsed.advancePayment,
                    engine_type=parsed.engineType,
                    transmission=parsed.transmission,
                    drive_type=parsed.driveType,
                    engine_power=parsed.enginePower,
                    description=parsed.description,
                    category=parsed.category,
                    body_type=parsed.bodyType,
                    photo=photo or None,
                )

                if result == "created":
                    stats["imported"] += 1
                else:
                    stats["updated"] += 1
            except Exception as exc:  # noqa: BLE001
                stats["errors"].append(f"{group_key}: {exc}")
    finally:
        await client.disconnect()

    stats["ok"] = True
    return stats


def main() -> int:
    args = parse_args()
    try:
        result = asyncio.run(sync_channel(args))
        if args.json or not args.login:
            print(json.dumps(result, ensure_ascii=False))
        elif args.login:
            print(result.get("message", "OK"))
        return 0 if result.get("ok") else 1
    except Exception as exc:  # noqa: BLE001
        payload = {"ok": False, "error": str(exc)}
        print(json.dumps(payload, ensure_ascii=False))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
