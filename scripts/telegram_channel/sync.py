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

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT / "scripts" / "telegram_channel") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts" / "telegram_channel"))

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


def load_env() -> None:
    env_path = ROOT / ".env"
    try:
        from dotenv import load_dotenv

        load_dotenv(env_path)
    except ImportError:
        load_env_file(env_path)


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


load_env()
ensure_dependencies()

from telethon import TelegramClient  # noqa: E402
from telethon.tl.types import Message  # noqa: E402

from db import generate_uid, resolve_db_path, upsert_car  # noqa: E402
from parser import is_car_post, parse_car_post  # noqa: E402

DEFAULT_CHANNEL_ID = -1001949651952
UPLOAD_DIR = ROOT / "public" / "uploads" / "cars"
SESSION_DEFAULT = ROOT / "scripts" / "telegram_channel" / "session"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Sync cars from Telegram channel")
    parser.add_argument("--login", action="store_true", help="Authorize Telegram user session")
    parser.add_argument("--limit", type=int, default=int(os.getenv("TELEGRAM_SYNC_LIMIT", "200")))
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
        await client.download_media(message, file=str(target))
        paths.append(f"/uploads/cars/{filename}")
        index += 1

    return " ".join(paths)


async def sync_channel(args: argparse.Namespace) -> dict:
    api_id = os.getenv("TELEGRAM_API_ID")
    api_hash = os.getenv("TELEGRAM_API_HASH")
    if not api_id or not api_hash:
        raise RuntimeError("Додайте TELEGRAM_API_ID та TELEGRAM_API_HASH у .env")

    session_path = os.getenv("TELEGRAM_SESSION_PATH", str(SESSION_DEFAULT))
    database_url = os.getenv("DATABASE_URL", "file:./dev.db")
    db_path = resolve_db_path(ROOT, database_url)

    stats = {
        "imported": 0,
        "updated": 0,
        "skipped": 0,
        "errors": [],
        "processedGroups": 0,
        "channelId": args.channel,
        "limit": args.limit,
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

                photo = await download_group_photos(client, messages_in_group, group_key, UPLOAD_DIR)
                external_id = f"tg:{args.channel}:{group_key}"

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
