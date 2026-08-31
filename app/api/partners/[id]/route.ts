import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";
import { slugifyPartner } from "@/lib/partners";
import { isCarPubliclyListed } from "@/lib/car-status";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const key = (await params).id;
  const asId = Number(key);

  const partner = await prisma.partner.findFirst({
    where: Number.isFinite(asId) && asId > 0 ? { id: asId } : { slug: key },
    include: {
      _count: { select: { cars: true } },
      cars: {
        where: {
          OR: [
            { status: null },
            { status: "available" },
            { status: "on_order" },
            { status: "reserved" },
          ],
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          photo: true,
          priceUSD: true,
          year: true,
          mileage: true,
          monthlyPayment: true,
          brand: true,
          mark: true,
          status: true,
        },
      },
    },
  });

  if (!partner) {
    return NextResponse.json({ error: "Партнера не знайдено" }, { status: 404 });
  }

  return NextResponse.json({
    ...partner,
    cars: partner.cars.filter((c) => isCarPubliclyListed(c.status)),
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const id = Number((await params).id);
    const body = await req.json();
    const name = String(body.name || "").trim();
    const photo = String(body.photo || "").trim() || null;
    const description = String(body.description || "").trim();

    if (!name && !photo) {
      return NextResponse.json(
        { error: "Вкажіть хоча б назву або фото партнера" },
        { status: 400 }
      );
    }

    let slug =
      String(body.slug || "").trim() || slugifyPartner(name || "partner");
    slug = slugifyPartner(slug);

    const clash = await prisma.partner.findFirst({
      where: { slug, NOT: { id } },
    });
    if (clash) {
      slug = `${slug}-${id}`;
    }

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: name || "Партнер",
        slug,
        photo,
        description,
        active: body.active !== false,
      },
    });

    return NextResponse.json(partner);
  } catch (e) {
    console.error("Update partner error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Помилка оновлення" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const id = Number((await params).id);
    await prisma.partner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete partner error:", e);
    return NextResponse.json({ error: "Не вдалося видалити" }, { status: 500 });
  }
}
