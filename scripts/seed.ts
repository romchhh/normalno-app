import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { CATALOG_CATEGORIES, categoriesToJsonRecord } from "../lib/categories";

dotenv.config();

const prisma = new PrismaClient();

type SeedCar = {
  uid: string;
  brand: string;
  mark: string;
  category: string;
  title: string;
  year: number;
  priceUSD: string;
  mileage: number;
  engineType: string;
  transmission: string;
  driveType: string;
  photo: string;
};

const PHOTO = "/hero-auto.jpg";

const TEST_CARS: SeedCar[] = [
  {
    uid: "seed-new-001",
    brand: "Toyota",
    mark: "Camry",
    category: "Нові авто",
    title: "Toyota Camry 2024 SE",
    year: 2024,
    priceUSD: "28500",
    mileage: 12,
    engineType: "Бензин",
    transmission: "Автомат",
    driveType: "Передній",
    photo: "/autos/new-car.webp",
  },
  {
    uid: "seed-new-002",
    brand: "Honda",
    mark: "Accord",
    category: "Нові авто",
    title: "Honda Accord 2023 Touring",
    year: 2023,
    priceUSD: "26900",
    mileage: 8,
    engineType: "Бензин",
    transmission: "Автомат",
    driveType: "Передній",
    photo: PHOTO,
  },
  {
    uid: "seed-used-001",
    brand: "Volkswagen",
    mark: "Passat",
    category: "Авто в Україні",
    title: "Volkswagen Passat 2021 Comfortline",
    year: 2021,
    priceUSD: "19500",
    mileage: 42000,
    engineType: "Бензин",
    transmission: "Автомат",
    driveType: "Передній",
    photo: "/autos/car-in-use.webp",
  },
  {
    uid: "seed-used-002",
    brand: "Skoda",
    mark: "Octavia",
    category: "Авто в Україні",
    title: "Skoda Octavia 2020 Style",
    year: 2020,
    priceUSD: "16200",
    mileage: 58000,
    engineType: "Бензин",
    transmission: "Автомат",
    driveType: "Передній",
    photo: PHOTO,
  },
  {
    uid: "seed-ev-001",
    brand: "Tesla",
    mark: "Model 3",
    category: "Електромобілі",
    title: "Tesla Model 3 2022 Long Range",
    year: 2022,
    priceUSD: "31500",
    mileage: 28000,
    engineType: "Електро",
    transmission: "Автомат",
    driveType: "Задній",
    photo: "/autos/e-cars.webp",
  },
  {
    uid: "seed-ev-002",
    brand: "Hyundai",
    mark: "Ioniq 5",
    category: "Електромобілі",
    title: "Hyundai Ioniq 5 2023 SEL",
    year: 2023,
    priceUSD: "33800",
    mileage: 15000,
    engineType: "Електро",
    transmission: "Автомат",
    driveType: "AWD",
    photo: PHOTO,
  },
  {
    uid: "seed-com-001",
    brand: "Mercedes-Benz",
    mark: "Sprinter",
    category: "Комерційні",
    title: "Mercedes-Benz Sprinter 2020 Cargo",
    year: 2020,
    priceUSD: "35900",
    mileage: 95000,
    engineType: "Дизель",
    transmission: "Автомат",
    driveType: "Задній",
    photo: "/autos/commercial.webp",
  },
  {
    uid: "seed-com-002",
    brand: "Ford",
    mark: "Transit",
    category: "Комерційні",
    title: "Ford Transit 2021 L3H2",
    year: 2021,
    priceUSD: "28700",
    mileage: 72000,
    engineType: "Дизель",
    transmission: "Механіка",
    driveType: "Задній",
    photo: PHOTO,
  },
  {
    uid: "seed-bus-001",
    brand: "Volkswagen",
    mark: "Transporter",
    category: "Мікроавтобуси",
    title: "Volkswagen Transporter T6.1 2019",
    year: 2019,
    priceUSD: "24800",
    mileage: 110000,
    engineType: "Дизель",
    transmission: "Автомат",
    driveType: "Передній",
    photo: "/autos/micro-bus.webp",
  },
  {
    uid: "seed-bus-002",
    brand: "Mercedes-Benz",
    mark: "Vito",
    category: "Мікроавтобуси",
    title: "Mercedes-Benz Vito 2020 Tourer",
    year: 2020,
    priceUSD: "27600",
    mileage: 88000,
    engineType: "Дизель",
    transmission: "Автомат",
    driveType: "Задній",
    photo: PHOTO,
  },
  {
    uid: "seed-trailer-001",
    brand: "Utility",
    mark: "3000R",
    category: "Причепи",
    title: "Utility 3000R Reefer Trailer 2018",
    year: 2018,
    priceUSD: "18900",
    mileage: 0,
    engineType: "—",
    transmission: "—",
    driveType: "—",
    photo: "/autos/trailers.webp",
  },
  {
    uid: "seed-trailer-002",
    brand: "Great Dane",
    mark: "Champion",
    category: "Причепи",
    title: "Great Dane Champion SE Dry Van 2019",
    year: 2019,
    priceUSD: "14200",
    mileage: 0,
    engineType: "—",
    transmission: "—",
    driveType: "—",
    photo: PHOTO,
  },
];

function buildCarData(car: SeedCar) {
  const price = parseFloat(car.priceUSD);

  return {
    uid: car.uid,
    brand: car.brand,
    sku: car.uid,
    mark: car.mark,
    category: car.category,
    title: car.title,
    description: `${car.title} — тестове оголошення ${CATALOG_CATEGORIES.find((c) => c.name === car.category)?.name ?? car.category}.`,
    text: `<p>${car.title} доступне для перегляду в каталозі <strong>Нормально авто</strong>.</p>`,
    photo: car.photo,
    price,
    quantity: 1,
    priceOld: null as number | null,
    editions: null,
    modifications: null,
    externalId: null,
    parentUid: null,
    engineType: car.engineType,
    engineVolume: car.engineType === "Електро" ? 0 : 2.0,
    transmission: car.transmission,
    driveType: car.driveType,
    year: car.year,
    enginePower: car.engineType === "Електро" ? 250 : 180,
    priceUSD: car.priceUSD,
    monthlyPayment: Math.round(price * 37.5 * 0.0314),
    advancePayment: Math.round(price * 37.5 * 0.4),
    countryOfOrigin: "США",
    mileage: car.mileage,
    weight: 1500,
    length: 4.8,
    width: 1.85,
    height: 1.45,
    video: null as string | null,
  };
}

async function writeCategoriesFile() {
  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }

  const filePath = path.join(dataDir, "categories.json");
  await writeFile(filePath, JSON.stringify(categoriesToJsonRecord(), null, 2), "utf-8");
  console.log(`✅ categories.json (${CATALOG_CATEGORIES.length} категорій)`);
}

async function seedCars() {
  let created = 0;
  let updated = 0;

  for (const car of TEST_CARS) {
    const data = buildCarData(car);
    const existing = await prisma.car.findUnique({
      where: { uid: car.uid },
    });

    if (existing) {
      await prisma.car.update({ where: { uid: car.uid }, data });
      updated++;
    } else {
      await prisma.car.create({ data });
      created++;
    }
  }

  console.log(`✅ Авто: створено ${created}, оновлено ${updated} (всього ${TEST_CARS.length})`);
}

async function main() {
  await writeCategoriesFile();
  await seedCars();
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
