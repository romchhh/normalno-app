// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const processedData = {
      ...data,
      telegramId: String(data.telegramId),
      chatId: data.chatId != null ? String(data.chatId) : null,
    };

    const newUser = await prisma.user.create({
      data: processedData, // Обов'язково має включати хоча б telegramId, firstName, languageCode, isBot
    });

    return NextResponse.json(newUser);
  } catch {
    return NextResponse.json(
      { error: "Не вдалося створити користувача" },
      { status: 500 }
    );
  }
}
