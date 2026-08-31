"""Parse car listing posts from Telegram channel captions."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parents[2]

SKIP_LINE_RE = re.compile(r"^\s*ОНОВИТИ\s+АВТО", re.IGNORECASE)
CAR_EMOJI_RE = re.compile(r"^[🚘🚙🚗🏎]")
PRICE_RE = re.compile(
    r"(?:Ціна|Цена)\s*[-—:–]?\s*([\d\s]+)\s*\$?",
    re.IGNORECASE,
)
MONTHLY_RE = re.compile(
    r"(?:Щомісячний\s+платіж|платіж)\s*[-—:–]?\s*([\d\s]+)\s*\$/\s*міс",
    re.IGNORECASE,
)
ADVANCE_RE = re.compile(
    r"Авансовий\s+внесок\s*[-—:–]?\s*([\d\s]+)\s*\$",
    re.IGNORECASE,
)
YEAR_RE = re.compile(
    r"(?:📆|Рік)\s*[:\-]?\s*(\d{4})|(\d{4})\s*рік",
    re.IGNORECASE,
)
MILEAGE_RE = re.compile(
    r"Пробіг\s*[:\-]?\s*([\d\s]+)\s*(?:тис\.?\s*)?км",
    re.IGNORECASE,
)
ENGINE_RE = re.compile(r"Двигун\s*[:\-]?\s*(.+)", re.IGNORECASE)
TRANSMISSION_RE = re.compile(r"Коробка\s*[:\-]?\s*(.+)", re.IGNORECASE)
DRIVE_RE = re.compile(
    r"(?:Привід|🛞)\s*[:\-]?\s*(.+)|(?:Задній|Передній|Повний)\s+привід",
    re.IGNORECASE,
)
POWER_RE = re.compile(r"(\d+)\s*к\.?\s*с\.?", re.IGNORECASE)
BATTERY_RE = re.compile(r"Батарея\s*[:\-]?\s*([\d\s]+)\s*kWh", re.IGNORECASE)

DEFAULT_BRANDS = [
    "Mercedes-Benz",
    "Mercedes",
    "Land Rover",
    "Alfa Romeo",
    "Volkswagen",
    "Lamborghini",
    "Maserati",
    "Chevrolet",
    "Mitsubishi",
    "Volvo",
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Audi",
    "Kia",
    "Hyundai",
    "Nissan",
    "Skoda",
    "Tesla",
    "Rivian",
    "Genesis",
    "Infiniti",
    "Lexus",
    "Porsche",
    "Jeep",
    "Dodge",
    "Ram",
    "GMC",
    "Cadillac",
    "Buick",
    "Chrysler",
    "Fiat",
    "Mini",
    "Subaru",
    "Mazda",
    "Bentley",
    "Jaguar",
    "Acura",
    "Lincoln",
    "Smart",
    "Scion",
    "Utility",
    "Great Dane",
]


def load_brands() -> list[str]:
    models_path = ROOT / "public" / "models.json"
    if not models_path.exists():
        return DEFAULT_BRANDS
    try:
        data = json.loads(models_path.read_text(encoding="utf-8"))
        titles = [str(item.get("title", "")).strip() for item in data if item.get("title")]
        merged = list(dict.fromkeys(titles + DEFAULT_BRANDS))
        return sorted(merged, key=len, reverse=True)
    except (json.JSONDecodeError, OSError):
        return DEFAULT_BRANDS


def clean_description(text: str) -> str:
    lines: list[str] = []
    for line in text.splitlines():
        if SKIP_LINE_RE.match(line.strip()):
            continue
        lines.append(line)
    return "\n".join(lines).strip()


def is_car_post(text: str) -> bool:
    if not text or not text.strip():
        return False

    cleaned = clean_description(text)
    compact = re.sub(r"\s+", " ", cleaned).strip()

    if re.fullmatch(r"ОНОВИТИ\s+АВТО\s*[🚘🚙🚗]?\s*", compact, re.IGNORECASE):
        return False

    if SKIP_LINE_RE.match(compact) and len(compact) < 40:
        return False

    has_price = bool(
        PRICE_RE.search(cleaned)
        or MONTHLY_RE.search(cleaned)
    )
    if not has_price:
        return False

    has_car_signal = bool(
        CAR_EMOJI_RE.search(cleaned.splitlines()[0] if cleaned.splitlines() else "")
        or re.search(r"🚘|🚙|🚗", cleaned)
        or (YEAR_RE.search(cleaned) and MILEAGE_RE.search(cleaned))
        or (YEAR_RE.search(cleaned) and MONTHLY_RE.search(cleaned))
    )
    return has_car_signal


def parse_money(raw: str) -> float:
    value = re.sub(r"[^\d.]", "", raw.replace(",", "."))
    try:
        return float(value)
    except ValueError:
        return 0.0


def extract_title(text: str) -> Optional[str]:
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if CAR_EMOJI_RE.match(stripped) or stripped.startswith("🚘") or stripped.startswith("🚙"):
            title = re.sub(r"^[🚘🚙🚗🏎]\s*", "", stripped).strip()
            title = re.sub(r"[⚡️🔥✨]+", "", title).strip(" -—")
            if " — " in title:
                title = title.split(" — ", 1)[0].strip()
            return title
    return None


def split_brand_model(title: str, brands: list[str]) -> tuple[str, str]:
    normalized = title.strip()
    for brand in brands:
        if normalized.lower().startswith(brand.lower()):
            rest = normalized[len(brand) :].strip(" -—")
            if rest:
                return brand, rest
            return brand, brand

    parts = normalized.split()
    if len(parts) >= 2:
        return parts[0], " ".join(parts[1:])
    return normalized, normalized


def normalize_engine(raw: str, text: str) -> str:
    lower = raw.lower()
    if "kwh" in text.lower() or "⚡" in text or "електро" in lower or "ev" in lower:
        return "Електро"
    if "газ" in lower and "бензин" in lower:
        return "Газ / Бензин"
    if "дизел" in lower:
        return "Дизель"
    if "гіbrid" in lower or "гібрид" in lower or "hybrid" in lower:
        return "Гібрид"
    if "бензин" in lower or "gas" in lower:
        return "Бензин"
    return raw.strip()


def normalize_transmission(raw: str) -> str:
    lower = raw.lower()
    if "автомат" in lower or "automatic" in lower:
        return "Автомат"
    if "механ" in lower or "manual" in lower:
        return "Механіка"
    if "робот" in lower:
        return "Робот"
    if "варіатор" in lower or "cvt" in lower:
        return "Варіатор"
    return raw.strip()


def normalize_drive(raw: str) -> str:
    lower = raw.lower()
    if "повн" in lower or "4wd" in lower or "awd" in lower or "4x4" in lower:
        return "Повний"
    if "задн" in lower or "rwd" in lower:
        return "Задній"
    if "перед" in lower or "fwd" in lower:
        return "Передній"
    return raw.strip()


def detect_category(text: str, title: str) -> str:
    lower = f"{title}\n{text}".lower()
    if "⚡" in text or "kwh" in lower or "електрок" in lower or " ev" in lower:
        return "Електро"
    if "нов" in lower and "авто" in lower:
        return "Нові авто"
    return "Авто в Україні"


def detect_body_type(text: str, title: str) -> Optional[str]:
    lower = f"{title}\n{text}".lower()
    if any(x in lower for x in ("suv", "кросовер", "crossover")):
        return "SUV"
    if any(x in lower for x in ("sedan", "седан")):
        return "Sedan"
    if "⚡" in text or "kwh" in lower or "електро" in lower:
        return "EV"
    return None


@dataclass
class ParsedCar:
    title: str
    brand: str
    mark: str
    year: int
    mileage: int
    price: float
    priceUSD: str
    monthlyPayment: Optional[float]
    advancePayment: Optional[float]
    engineType: str
    transmission: str
    driveType: str
    enginePower: float
    description: str
    category: str
    bodyType: Optional[str]

    def to_dict(self) -> dict:
        return asdict(self)


def parse_car_post(text: str) -> Optional[ParsedCar]:
    if not is_car_post(text):
        return None

    cleaned = clean_description(text)
    title = extract_title(cleaned)
    if not title:
        return None

    brands = load_brands()
    brand, mark = split_brand_model(title, brands)

    year_match = YEAR_RE.search(cleaned)
    year = 0
    if year_match:
        year = int(next(g for g in year_match.groups() if g))

    mileage = 0
    mileage_match = MILEAGE_RE.search(cleaned)
    if mileage_match:
        mileage = int(re.sub(r"\s", "", mileage_match.group(1)))
        if "тис" in mileage_match.group(0).lower():
            mileage *= 1000

    price = 0.0
    price_match = PRICE_RE.search(cleaned)
    if price_match:
        price = parse_money(price_match.group(1))

    monthly = None
    monthly_match = MONTHLY_RE.search(cleaned)
    if monthly_match:
        monthly = parse_money(monthly_match.group(1))

    advance = None
    advance_match = ADVANCE_RE.search(cleaned)
    if advance_match:
        advance = parse_money(advance_match.group(1))

    engine_type = ""
    engine_match = ENGINE_RE.search(cleaned)
    if engine_match:
        engine_type = normalize_engine(engine_match.group(1), cleaned)
    elif BATTERY_RE.search(cleaned) or "⚡" in cleaned:
        engine_type = "Електро"

    transmission = ""
    transmission_match = TRANSMISSION_RE.search(cleaned)
    if transmission_match:
        transmission = normalize_transmission(transmission_match.group(1))

    drive_type = ""
    drive_match = DRIVE_RE.search(cleaned)
    if drive_match:
        drive_raw = drive_match.group(1) or drive_match.group(0)
        drive_type = normalize_drive(drive_raw)

    power = 0.0
    power_match = POWER_RE.search(cleaned)
    if power_match:
        power = float(power_match.group(1))

    return ParsedCar(
        title=title,
        brand=brand,
        mark=mark,
        year=year,
        mileage=mileage,
        price=price,
        priceUSD=str(int(price)) if price else "0",
        monthlyPayment=monthly,
        advancePayment=advance,
        engineType=engine_type,
        transmission=transmission,
        driveType=drive_type,
        enginePower=power,
        description=cleaned,
        category=detect_category(cleaned, title),
        bodyType=detect_body_type(cleaned, title),
    )


if __name__ == "__main__":
    sample = """🚘 Volkswagen ID.4 PRO ⚡️

📆 2021 рік
🔋 Батарея: 82 kWh
🛣 Запас ходу: 400–500 км
📍 Пробіг: 86 тис. км
🛞 Задній привід

💰 Щомісячний платіж - 600 $/міс
Авансовий внесок - 11 500  $
Ціна — 23 999$

ОНОВИТИ АВТО 🚘"""
    parsed = parse_car_post(sample)
    print(json.dumps(parsed.to_dict() if parsed else None, ensure_ascii=False, indent=2))
