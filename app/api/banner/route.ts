import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";

const BANNER_PATH = "/sale-banner.png";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("banner") as File | null;

    if (!file) {
      return NextResponse.json({ message: "Файл не завантажено" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Файл повинен бути зображенням" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Максимальний розмір файлу — 10MB" },
        { status: 400 }
      );
    }

    const publicDir = path.join(process.cwd(), "public");
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(publicDir, "sale-banner.png");
    await writeFile(filePath, buffer);

    const stats = await stat(filePath);
    const timestamp = stats.mtime.getTime();

    revalidatePath("/");
    revalidatePath("/catalog");

    return NextResponse.json({
      message: "Банер успішно завантажено",
      path: BANNER_PATH,
      timestamp,
    });
  } catch (err: unknown) {
    console.error("Banner upload error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Помилка при завантаженні банера";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "sale-banner.png");

    let timestamp = Date.now();
    if (existsSync(filePath)) {
      try {
        const stats = await stat(filePath);
        timestamp = stats.mtime.getTime();
      } catch {
        // keep Date.now()
      }
    }

    return NextResponse.json({
      path: BANNER_PATH,
      timestamp,
    });
  } catch {
    return NextResponse.json({
      path: BANNER_PATH,
      timestamp: Date.now(),
    });
  }
}
