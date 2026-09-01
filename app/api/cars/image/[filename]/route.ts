import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { resolveCarUploadDir } from "@/lib/project-root";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(resolveCarUploadDir(), sanitizedFilename);

    if (!existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const [fileBuffer, fileStats] = await Promise.all([
      readFile(filePath),
      stat(filePath),
    ]);

    const ext = path.extname(sanitizedFilename).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : ext === ".gif"
            ? "image/gif"
            : ext === ".webp"
              ? "image/webp"
              : "application/octet-stream";

    const etag = `"${fileStats.mtime.getTime()}"`;
    if (request.headers.get("if-none-match") === etag) {
      return new NextResponse(null, { status: 304 });
    }

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        ETag: etag,
        "Last-Modified": fileStats.mtime.toUTCString(),
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch (error: unknown) {
    console.error("[GET /api/cars/image] Error serving car image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
