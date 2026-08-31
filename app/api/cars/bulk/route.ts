import { NextRequest, NextResponse } from "next/server";
import { upload_cars } from "@/lib/cars-db";
import { prisma } from "@/lib/db";
import * as XLSX from "xlsx";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Файл не завантажено" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process file with your function
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const stats = await upload_cars(workbook, prisma);

    return NextResponse.json({
      message: "Імпорт завершено успішно",
      stats: {
        created: stats.created,
        updated: stats.updated,
        errors: stats.errors,
        total: stats.total,
        processed: stats.created + stats.updated,
      },
    });
  } catch (err: unknown) {
    console.error("Upload error:", err);
    const errorMessage = err instanceof Error ? err.message : "Помилка при завантаженні файлу";

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
