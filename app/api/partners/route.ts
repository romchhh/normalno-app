import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";
import { slugifyPartner } from "@/lib/partners";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";

  const partners = await prisma.partner.findMany({
    where: all ? undefined : { active: true },
    orderBy: { name: "asc" },
    include: { _count: { select: { cars: true } } },
  });

  return NextResponse.json(partners);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const photo = String(body.photo || "").trim() || null;
    const description = String(body.description || "").trim();

    // Достатньо назви; фото й опис опційні
    if (!name && !photo) {
      return NextResponse.json(
        { error: "Вкажіть хоча б назву або фото партнера" },
        { status: 400 }
      );
    }

    let slug = String(body.slug || "").trim() || slugifyPartner(name || "partner");
    slug = slugifyPartner(slug);

    for (let i = 0; i < 5; i++) {
      const exists = await prisma.partner.findUnique({ where: { slug } });
      if (!exists) break;
      slug = `${slugifyPartner(name || "partner")}-${i + 2}`;
    }

    const partner = await prisma.partner.create({
      data: {
        name: name || "Партнер",
        slug,
        photo,
        description,
        active: body.active !== false,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (e) {
    console.error("Create partner error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Помилка створення" },
      { status: 500 }
    );
  }
}
