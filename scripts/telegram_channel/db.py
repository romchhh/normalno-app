"""SQLite upsert helpers for parsed Telegram cars."""

from __future__ import annotations

import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal, Optional


def resolve_db_path(root: Path, database_url: str) -> Path:
    url = database_url.strip().strip('"').strip("'")
    if url.startswith("file:"):
        rel = url[5:]
        if rel.startswith("./"):
            return (root / "prisma" / rel[2:]).resolve()
        return Path(rel).resolve()
    return (root / "prisma" / "dev.db").resolve()


def generate_uid(external_id: str) -> str:
    safe = external_id.replace(":", "_").replace("-", "_")
    return f"tg_{safe}"


def find_by_external_id(conn: sqlite3.Connection, external_id: str) -> Optional[int]:
    row = conn.execute(
        'SELECT id FROM "Car" WHERE "externalId" = ? LIMIT 1',
        (external_id,),
    ).fetchone()
    return int(row[0]) if row else None


def upsert_car(
    db_path: Path,
    *,
    external_id: str,
    uid: str,
    title: str,
    brand: str,
    mark: str,
    year: int,
    mileage: int,
    price: float,
    price_usd: str,
    monthly_payment: Optional[float],
    advance_payment: Optional[float],
    engine_type: str,
    transmission: str,
    drive_type: str,
    engine_power: float,
    description: str,
    category: str,
    body_type: Optional[str],
    photo: Optional[str],
) -> Literal["created", "updated"]:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    conn = sqlite3.connect(db_path)
    try:
        existing_id = find_by_external_id(conn, external_id)
        if existing_id:
            conn.execute(
                """
                UPDATE "Car"
                SET
                  "title" = ?,
                  "brand" = ?,
                  "mark" = ?,
                  "year" = ?,
                  "mileage" = ?,
                  "price" = ?,
                  "priceUSD" = ?,
                  "monthlyPayment" = ?,
                  "advancePayment" = ?,
                  "engineType" = ?,
                  "transmission" = ?,
                  "driveType" = ?,
                  "enginePower" = ?,
                  "description" = ?,
                  "text" = ?,
                  "category" = ?,
                  "bodyType" = ?,
                  "photo" = ?,
                  "status" = 'available',
                  "updatedAt" = ?
                WHERE id = ?
                """,
                (
                    title,
                    brand,
                    mark,
                    year,
                    mileage,
                    price,
                    price_usd,
                    monthly_payment,
                    advance_payment,
                    engine_type,
                    transmission,
                    drive_type,
                    engine_power,
                    description,
                    description,
                    category,
                    body_type,
                    photo,
                    now,
                    existing_id,
                ),
            )
            conn.commit()
            return "updated"

        conn.execute(
            """
            INSERT INTO "Car" (
              "uid", "brand", "sku", "mark", "category", "title", "description", "text",
              "photo", "price", "quantity", "externalId", "status", "bodyType",
              "engineType", "engineVolume", "transmission", "driveType", "year",
              "enginePower", "priceUSD", "monthlyPayment", "advancePayment",
              "countryOfOrigin", "mileage", "weight", "length", "width", "height",
              "createdAt", "updatedAt"
            ) VALUES (
              ?, ?, '', ?, ?, ?, ?, ?,
              ?, ?, 1, ?, 'available', ?,
              ?, 0, ?, ?, ?,
              ?, ?, ?, ?,
              '', ?, 0, 0, 0, 0,
              ?, ?
            )
            """,
            (
                uid,
                brand,
                mark,
                category,
                title,
                description,
                description,
                photo,
                price,
                external_id,
                body_type,
                engine_type,
                transmission,
                drive_type,
                year,
                engine_power,
                price_usd,
                monthly_payment,
                advance_payment,
                mileage,
                now,
                now,
            ),
        )
        conn.commit()
        return "created"
    finally:
        conn.close()
