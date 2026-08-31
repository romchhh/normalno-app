import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { statusLabel } from "@/lib/car-status";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;

  const format = (request.nextUrl.searchParams.get("format") || "xlsx").toLowerCase();

  const cars = await prisma.car.findMany({ orderBy: { createdAt: "desc" } });

  const rows = cars.map((car) => ({
    id: car.id,
    uid: car.uid,
    title: car.title,
    brand: car.brand,
    mark: car.mark,
    year: car.year,
    mileage: car.mileage,
    priceUSD: car.priceUSD,
    monthlyPayment: car.monthlyPayment,
    advancePayment: car.advancePayment,
    status: statusLabel(car.status),
    statusId: car.status,
    bodyType: car.bodyType || "",
    driveType: car.driveType || "",
    engineType: car.engineType,
    transmission: car.transmission,
    category: car.category,
    photo: car.photo || "",
    video: car.video || "",
    description: car.description,
  }));

  const sheet = XLSX.utils.json_to_sheet(rows);

  if (format === "csv") {
    const csv = XLSX.utils.sheet_to_csv(sheet);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="cars-export.csv"`,
      },
    });
  }

  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Cars");
  const buffer = XLSX.write(book, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="cars-export.xlsx"`,
    },
  });
}
