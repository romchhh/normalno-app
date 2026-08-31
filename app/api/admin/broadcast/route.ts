import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth";
import {
  broadcastToAllUsers,
  countBroadcastAudience,
  isTelegramBotConfigured,
  type BroadcastLinkButton,
} from "@/lib/telegram-bot";

export async function GET() {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  const audience = await countBroadcastAudience();
  return NextResponse.json({
    configured: isTelegramBotConfigured(),
    audience,
  });
}

function parseButtons(raw: unknown): BroadcastLinkButton[] {
  let list: unknown = raw;
  if (typeof raw === "string") {
    try {
      list = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(list)) return [];

  return list
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const text = String((item as { text?: string }).text || "").trim();
      const url = String((item as { url?: string }).url || "").trim();
      if (!text || !url) return null;
      if (!/^https?:\/\//i.test(url) && !/^tg:\/\//i.test(url)) return null;
      return { text: text.slice(0, 64), url };
    })
    .filter((b): b is BroadcastLinkButton => Boolean(b))
    .slice(0, 8);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  if (!isTelegramBotConfigured()) {
    return NextResponse.json(
      { error: "Додайте TELEGRAM_BOT_TOKEN у .env" },
      { status: 400 }
    );
  }

  let photoPath: string | null = null;

  try {
    const contentType = request.headers.get("content-type") || "";
    let text = "";
    let withAppButton = true;
    let buttons: BroadcastLinkButton[] = [];
    let parseMode: "HTML" | "Markdown" | "MarkdownV2" = "HTML";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      text = String(form.get("text") || "").trim();
      withAppButton = String(form.get("withAppButton") || "true") !== "false";
      buttons = parseButtons(form.get("buttons"));
      const mode = String(form.get("parseMode") || "HTML");
      if (mode === "Markdown" || mode === "MarkdownV2" || mode === "HTML") {
        parseMode = mode;
      }

      const photo = form.get("photo");
      if (photo && typeof photo !== "string" && "arrayBuffer" in photo) {
        const file = photo as File;
        if (!file.type.startsWith("image/")) {
          return NextResponse.json(
            { error: "Фото повинно бути зображенням" },
            { status: 400 }
          );
        }
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { error: "Максимальний розмір фото — 10MB" },
            { status: 400 }
          );
        }

        const dir = path.join(process.cwd(), "public", "uploads", "broadcast");
        if (!existsSync(dir)) await mkdir(dir, { recursive: true });

        const ext =
          file.type.includes("png")
            ? ".png"
            : file.type.includes("webp")
              ? ".webp"
              : ".jpg";
        photoPath = path.join(dir, `broadcast_${Date.now()}${ext}`);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(photoPath, buffer);
      }
    } else {
      const body = await request.json();
      text = String(body.text || "").trim();
      withAppButton = body.withAppButton !== false;
      buttons = parseButtons(body.buttons);
      if (
        body.parseMode === "Markdown" ||
        body.parseMode === "MarkdownV2" ||
        body.parseMode === "HTML"
      ) {
        parseMode = body.parseMode;
      }
    }

    if (text.length < 2) {
      return NextResponse.json({ error: "Введіть текст розсилки" }, { status: 400 });
    }
    if (text.length > 3500) {
      return NextResponse.json(
        { error: "Текст занадто довгий (макс. 3500 символів)" },
        { status: 400 }
      );
    }

    const result = await broadcastToAllUsers({
      text,
      withAppButton,
      buttons,
      parseMode,
      photoPath,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error("Broadcast error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Помилка розсилки" },
      { status: 500 }
    );
  } finally {
    if (photoPath && existsSync(photoPath)) {
      try {
        await unlink(photoPath);
      } catch {
        /* ignore cleanup */
      }
    }
  }
}
