import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseMoney } from "@/lib/car-form";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";
import { revalidateCarPages } from "@/lib/revalidate-cars";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const carId = Number((await params).id);
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) {
      return NextResponse.json({ error: "Машина не знайдена" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (err) {
    console.log("GET car error:", err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
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
    const carId = Number((await params).id);
    const data = await req.json();

    const price = parseMoney(data.priceUSD ?? data.price);
    const monthlyPayment = parseMoney(data.monthlyPayment);
    const advancePayment = parseMoney(data.advancePayment);
    const description = String(data.description || data.text || "");

    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data: {
        brand: String(data.brand || "").trim(),
        mark: String(data.mark || "").trim(),
        title: String(data.title || "").trim(),
        description,
        text: description,
        photo: data.photo?.trim() ? String(data.photo).trim() : null,
        video: data.video?.trim() ? String(data.video).trim() : null,
        category: String(data.category || "").trim(),
        year: parseInt(data.year, 10) || 0,
        engineType: String(data.engineType || "").trim(),
        transmission: String(data.transmission || "").trim(),
        mileage: parseInt(String(data.mileage || "0").replace(/\D/g, ""), 10) || 0,
        priceUSD: String(price || data.priceUSD || "0"),
        price,
        monthlyPayment: monthlyPayment || null,
        advancePayment: advancePayment || null,
        status: data.status || "available",
        bodyType: data.bodyType?.trim() ? String(data.bodyType).trim() : null,
        driveType: String(data.driveType || "").trim(),
        partnerId:
          data.partnerId != null && data.partnerId !== ""
            ? Number(data.partnerId) || null
            : null,
      },
    });

    revalidateCarPages(updatedCar.id);

    return NextResponse.json(updatedCar);
  } catch (err: unknown) {
    console.error("UPDATE car error:", err);
    const errorMessage = err instanceof Error ? err.message : "Невідома помилка";
    return NextResponse.json(
      { error: "Не вдалося оновити машину", details: errorMessage },
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
    const carId = Number((await params).id);
    await prisma.car.delete({ where: { id: carId } });
    revalidateCarPages(carId);
    return NextResponse.json({ message: "Машина видалена" });
  } catch (err) {
    console.error("DELETE car error:", err);
    return NextResponse.json({ error: "Не вдалося видалити машину" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const carId = Number((await params).id);
    const data = await req.json();
    const status = String(data.status || "inactive");
    const car = await prisma.car.update({
      where: { id: carId },
      data: { status },
    });
    revalidateCarPages(car.id);
    return NextResponse.json(car);
  } catch (err) {
    console.error("PATCH car error:", err);
    return NextResponse.json({ error: "Не вдалося оновити статус" }, { status: 500 });
  }
}
