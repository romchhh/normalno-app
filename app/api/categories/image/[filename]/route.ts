import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Sanitize filename to prevent directory traversal
    const sanitizedFilename = path.basename(filename);
    
    const filePath = path.join(process.cwd(), "public", "categories", sanitizedFilename);
    
    console.log("[GET /api/categories/image] Requested filename:", sanitizedFilename);
    console.log("[GET /api/categories/image] File path:", filePath);
    console.log("[GET /api/categories/image] File exists:", existsSync(filePath));
    
    if (!existsSync(filePath)) {
      console.error("[GET /api/categories/image] File not found:", filePath);
      return new NextResponse("File not found", { status: 404 });
    }
    
    const fileBuffer = await readFile(filePath);
    const fileStats = await import("fs/promises").then(m => m.stat(filePath));
    
    console.log("[GET /api/categories/image] File size:", fileStats.size, "bytes");
    console.log("[GET /api/categories/image] File modified:", fileStats.mtime);
    
    // Determine content type based on file extension
    const ext = path.extname(sanitizedFilename).toLowerCase();
    const contentType = 
      ext === ".png" ? "image/png" :
      ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
      ext === ".gif" ? "image/gif" :
      ext === ".webp" ? "image/webp" :
      "application/octet-stream";
    
    // Use cache with revalidation for production, but allow immediate updates
    // Add ETag based on file modification time for cache invalidation
    const etag = `"${fileStats.mtime.getTime()}"`;
    const ifNoneMatch = request.headers.get("if-none-match");
    
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "ETag": etag,
        "Last-Modified": fileStats.mtime.toUTCString(),
        // Cache for 1 hour, but allow revalidation
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch (error: unknown) {
    console.error("[GET /api/categories/image] Error serving category image:", error);
    if (error instanceof Error) {
      console.error("[GET /api/categories/image] Error stack:", error.stack);
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

