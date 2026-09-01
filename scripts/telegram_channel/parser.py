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
# ": ", ": - ", " - " after field labels
LABEL_SEP = r"\s*[:\-–—]?\s*(?:-\s*)?"
PRICE_RE = re.compile(
    rf"(?:💵\s*)?(?:Ціна|Цена){LABEL_SEP}([\d\s]+)\s*\$",
    re.IGNORECASE,
)
MONTHLY_RE = re.compile(
    rf"(?:Щомісячний\s+платіж|платіж){LABEL_SEP}([\d\s]+)\s*\$/\s*міс",
    re.IGNORECASE,
)
ADVANCE_RE = re.compile(
    rf"Авансовий\s+внесок{LABEL_SEP}([\d\s]+)\s*\$",
    re.IGNORECASE,
)
YEAR_RE = re.compile(
    rf"(?:📆\s*)?Рік{LABEL_SEP}(\d{{4}})(?:/\d{{2}}|-\d{{2}})?|"
    rf"📆{LABEL_SEP}(\d{{4}})(?:/\d{{2}}|-\d{{2}})?|"
    rf"(\d{{4}})\s*рік",
    re.IGNORECASE,
)
MILEAGE_RE = re.compile(
    rf"(?:🛣\s*)?Пробіг{LABEL_SEP}([\d\s]+)\s*(?:тис\.?\s*)?км",
    re.IGNORECASE,
)
ENGINE_RE = re.compile(rf"(?:🛠\s*)?Двигун{LABEL_SEP}(.+)", re.IGNORECASE)
TRANSMISSION_RE = re.compile(rf"(?:🕹\s*)?Коробка{LABEL_SEP}(.+)", re.IGNORECASE)
DRIVE_RE = re.compile(
    rf"(?:Привід|🛞){LABEL_SEP}(.+)|(?:Задній|Передній|Повний)\s+привід",
    re.IGNORECASE,
)
POWER_RE = re.compile(r"(\d+(?:\.\d+)?)\s*к\.?\s*с\.?", re.IGNORECASE)
KW_POWER_RE = re.compile(r"(\d+(?:\.\d+)?)\s*к\s*Вт", re.IGNORECASE)
BATTERY_RE = re.compile(r"Батарея\s*[:\-]?\s*([\d\s]+)\s*kWh", re.IGNORECASE)
PIPE_FIELD_NAMES = (
    "Марка",
    "Модель",
    "Ціна",
    "Пробіг",
    "Рік",
    "Двигун",
    "Паливо",
    "Коробка",
    "Тип авто",
    "Привід",
    "Опис",
)
PIPE_FIELD_RE = re.compile(
    rf"^(.+?)\s*[:\-–—]\s*(.+)$",
    re.IGNORECASE,
)

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


def normalize_field_key(raw_key: str) -> str:
    key = raw_key.strip().lower()
    key = re.sub(r"^[^\wА-Яа-яІіЇїЄєҐґ]+", "", key)
    aliases = {
        "марка": "марка",
        "модель": "модель",
        "ціна": "ціна",
        "пробіг": "пробіг",
        "рік": "рік",
        "двигун": "двигун",
        "паливо": "паливо",
        "коробка": "коробка",
        "тип авто": "тип авто",
        "привід": "привід",
        "опис": "опис",
    }
    return aliases.get(key, key)


def parse_labeled_segments(text: str) -> dict[str, str]:
    fields: dict[str, str] = {}

    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue

        if "|" in stripped:
            parts = [part.strip() for part in stripped.split("|") if part.strip()]
        elif re.match(r"^(Опис|Марка)\b", stripped, re.IGNORECASE):
            parts = [stripped]
        else:
            continue

        for part in parts:
            cleaned_part = re.sub(r"^[^\wА-Яа-яІіЇїЄєҐґ]+", "", part.strip())
            match = PIPE_FIELD_RE.match(cleaned_part)
            if not match:
                continue
            key = normalize_field_key(match.group(1))
            value = match.group(2).strip()
            if key in fields and key != "опис":
                continue
            fields[key] = value

    desc_match = re.search(r"Опис\s*[:\-–—]?\s*(.+)", text, re.IGNORECASE | re.DOTALL)
    if desc_match:
        block = desc_match.group(1)
        block = re.split(r"\n\s*(?:📞|Контакти:|#\w|\Z)", block, maxsplit=1)[0]
        fields["опис"] = block.strip()

    return fields


def has_pipe_car_format(text: str) -> bool:
    fields = parse_labeled_segments(text)
    return bool(fields.get("марка") and fields.get("модель") and (fields.get("ціна") or fields.get("рік")))


def parse_mileage_value(raw: str) -> int:
    lower = raw.lower()
    digits = re.sub(r"[^\d]", "", raw.split("км")[0].split("km")[0])
    if not digits:
        return 0
    value = int(digits)
    if "тис" in lower and value < 1000:
        value *= 1000
    return value


def clean_description(text: str) -> str:
    lines: list[str] = []
    for line in text.splitlines():
        if SKIP_LINE_RE.match(line.strip()):
            continue
        lines.append(line)
    return "\n".join(lines).strip()


def extract_engine_power(text: str) -> float:
    kw_match = KW_POWER_RE.search(text)
    if kw_match:
        return float(kw_match.group(1))
    hp_match = POWER_RE.search(text)
    if hp_match:
        return float(hp_match.group(1))
    return 0.0


def build_title_from_fields(fields: dict[str, str], brands: list[str]) -> Optional[str]:
    brand = fields.get("марка", "").strip()
    mark = fields.get("модель", "").strip()
    if brand and mark:
        return f"{brand} {mark}"
    if brand:
        return brand
    return None


def parse_from_pipe_fields(cleaned: str, brands: list[str]) -> Optional[ParsedCar]:
    fields = parse_labeled_segments(cleaned)
    if not has_pipe_car_format(cleaned):
        return None

    brand = fields.get("марка", "").strip()
    mark = fields.get("модель", "").strip()
    title = build_title_from_fields(fields, brands) or ""
    if not title:
        return None

    for known_brand in brands:
        if brand.lower() == known_brand.lower():
            brand = known_brand
            break

    year = 0
    if fields.get("рік"):
        year = extract_year(f"Рік: {fields['рік']}")
    if not year:
        year = extract_year(cleaned)

    mileage = parse_mileage_value(fields["пробіг"]) if fields.get("пробіг") else 0
    if not mileage:
        mileage_match = MILEAGE_RE.search(cleaned)
        if mileage_match:
            mileage = parse_mileage_value(mileage_match.group(0))

    price = parse_money(fields["ціна"]) if fields.get("ціна") else 0.0
    if not price:
        price_match = PRICE_RE.search(cleaned)
        if price_match:
            price = parse_money(price_match.group(1))

    fuel_raw = fields.get("паливо", "")
    engine_raw = fields.get("двигун", "")
    engine_type = normalize_engine(fuel_raw or engine_raw, cleaned)
    if not engine_type and (fuel_raw or engine_raw):
        engine_type = normalize_engine(engine_raw, cleaned)

    transmission = ""
    if fields.get("коробка"):
        transmission = normalize_transmission(fields["коробка"])

    drive_type = ""
    if fields.get("привід"):
        drive_type = normalize_drive(fields["привід"])

    body_type = None
    if fields.get("тип авто"):
        lower = fields["тип авто"].lower()
        if "кросов" in lower or "suv" in lower:
            body_type = "SUV"
        elif "седан" in lower:
            body_type = "Sedan"
        elif "елект" in lower or "ev" in lower:
            body_type = "EV"

    description = fields.get("опис") or cleaned
    if fields.get("опис"):
        description = fields["опис"]

    power = extract_engine_power(f"{engine_raw}\n{cleaned}")

    monthly = None
    monthly_match = MONTHLY_RE.search(cleaned)
    if monthly_match:
        monthly = parse_money(monthly_match.group(1))

    advance = None
    advance_match = ADVANCE_RE.search(cleaned)
    if advance_match:
        advance = parse_money(advance_match.group(1))

    if not body_type:
        body_type = detect_body_type(cleaned, title)

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
        description=description,
        category=detect_category(cleaned, title),
        bodyType=body_type,
    )


def is_car_post(text: str) -> bool:
    if not text or not text.strip():
        return False

    cleaned = clean_description(text)
    compact = re.sub(r"\s+", " ", cleaned).strip()

    if re.fullmatch(r"ОНОВИТИ\s+АВТО\s*[🚘🚙🚗]?\s*", compact, re.IGNORECASE):
        return False

    if SKIP_LINE_RE.match(compact) and len(compact) < 40:
        return False

    has_price = has_price_signal(cleaned)
    if not has_price:
        return False

    has_car_signal = bool(
        CAR_EMOJI_RE.search(cleaned.splitlines()[0] if cleaned.splitlines() else "")
        or re.search(r"🚘|🚙|🚗", cleaned)
        or (YEAR_RE.search(cleaned) and MILEAGE_RE.search(cleaned))
        or (YEAR_RE.search(cleaned) and MONTHLY_RE.search(cleaned))
        or has_pipe_car_format(cleaned)
    )
    return has_car_signal


def parse_money(raw: str) -> float:
    value = re.sub(r"[^\d.]", "", raw.replace(",", "."))
    try:
        return float(value)
    except ValueError:
        return 0.0


def extract_year(text: str) -> int:
    year_match = YEAR_RE.search(text)
    if not year_match:
        return 0
    raw = next(group for group in year_match.groups() if group)
    digits = re.sub(r"\D", "", raw)
    if len(digits) >= 4:
        return int(digits[:4])
    return 0


def has_price_signal(text: str) -> bool:
    price_match = PRICE_RE.search(text)
    if price_match and re.search(r"\d", price_match.group(1)):
        return True
    fields = parse_labeled_segments(text)
    if fields.get("ціна") and re.search(r"\d", fields["ціна"]):
        return True
    return bool(MONTHLY_RE.search(text))


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
    if (
        "kwh" in text.lower()
        or "⚡" in text
        or "електро" in lower
        or "електрич" in lower
        or "ev" in lower
    ):
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
    if "автомат" in lower or "automatic" in lower or "автоматич" in lower:
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
    if (
        "⚡" in text
        or "kwh" in lower
        or "електрок" in lower
        or "електрич" in lower
        or " ev" in lower
        or "tesla" in lower
    ):
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
    brands = load_brands()

    if has_pipe_car_format(cleaned):
        pipe_result = parse_from_pipe_fields(cleaned, brands)
        if pipe_result:
            return pipe_result

    title = extract_title(cleaned)
    if not title:
        return None

    brand, mark = split_brand_model(title, brands)

    year = extract_year(cleaned)

    mileage = 0
    mileage_match = MILEAGE_RE.search(cleaned)
    if mileage_match:
        mileage = parse_mileage_value(mileage_match.group(0))

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
        engine_raw = engine_match.group(1).strip().lstrip("-—– ").strip()
        engine_type = normalize_engine(engine_raw, cleaned)
    elif BATTERY_RE.search(cleaned) or "⚡" in cleaned:
        engine_type = "Електро"

    transmission = ""
    transmission_match = TRANSMISSION_RE.search(cleaned)
    if transmission_match:
        transmission_raw = transmission_match.group(1).strip().lstrip("-—– ").strip()
        transmission = normalize_transmission(transmission_raw)

    drive_type = ""
    drive_match = DRIVE_RE.search(cleaned)
    if drive_match:
        drive_raw = drive_match.group(1) or drive_match.group(0)
        drive_type = normalize_drive(drive_raw)

    power = extract_engine_power(cleaned)

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
