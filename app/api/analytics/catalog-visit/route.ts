import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      phone,
      username,
      firstName,
      lastName,
      telegramId,
      userAgent,
    } = body;

    // Отримати IP адресу з заголовків
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Якщо є telegramId, знайти або створити користувача
    let userId: number | null = null;
    if (telegramId) {
      try {
        const telegramIdValue = String(telegramId);
        let user = await prisma.user.findUnique({
          where: { telegramId: telegramIdValue },
        });

        if (!user) {
          // Створити нового користувача, якщо його немає
          user = await prisma.user.create({
            data: {
              telegramId: telegramIdValue,
              username: username || null,
              firstName: firstName || "Unknown",
              lastName: lastName || null,
              languageCode: "uk",
              isBot: false,
            },
          });
        } else {
          // Оновити інформацію користувача, якщо вона змінилася
          if (username || firstName || lastName) {
            user = await prisma.user.update({
              where: { telegramId: telegramIdValue },
              data: {
                username: username || user.username,
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
              },
            });
          }
        }

        userId = user.id;
      } catch (error) {
        console.error("Error finding/creating user:", error);
        // Продовжити без userId, якщо є помилка
      }
    }

    // Створити запис про відвідування
    const visit = await prisma.catalogVisit.create({
      data: {
        userId: userId,
        phone: phone || null,
        username: username || null,
        firstName: firstName || null,
        lastName: lastName || null,
        userAgent: userAgent || request.headers.get("user-agent") || null,
        ipAddress: ipAddress !== "unknown" ? ipAddress : null,
        visitedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, visitId: visit.id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating catalog visit:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to record visit", details: errorMessage },
      { status: 500 }
    );
  }
}

