import { prisma } from "@/lib/db";
import { searchCarsByTitle } from "@/lib/prisma-filters";
import { NextRequest, NextResponse } from "next/server";
import { generateCarUid, parseMoney } from "@/lib/car-form";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const cars = await searchCarsByTitle(query);
  return NextResponse.json(cars);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const data = await request.json();

    if (!data.title?.trim()) {
      return NextResponse.json({ message: "Назва обовʼязкова" }, { status: 400 });
    }
    if (!data.brand?.trim() || !data.mark?.trim()) {
      return NextResponse.json({ message: "Марка і модель обовʼязкові" }, { status: 400 });
    }

    let uid = String(data.uid || data.tildaUid || "").trim() || generateCarUid();
    for (let i = 0; i < 3; i++) {
      const exists = await prisma.car.findUnique({ where: { uid } });
      if (!exists) break;
      uid = generateCarUid();
    }

    const price = parseMoney(data.priceUSD ?? data.price);
    const monthlyPayment = parseMoney(data.monthlyPayment);
    const advancePayment = parseMoney(data.advancePayment);
    const description = String(data.description || data.text || "");

    const car = await prisma.car.create({
      data: {
        uid,
        brand: String(data.brand).trim(),
        mark: String(data.mark).trim(),
        title: String(data.title).trim(),
        description,
        text: description,
        photo: data.photo?.trim() || null,
        video: data.video?.trim() || null,
        category: String(data.category || "").trim(),
        year: parseInt(data.year, 10) || 0,
        engineType: String(data.engineType || "").trim(),
        transmission: String(data.transmission || "").trim(),
        mileage: parseInt(String(data.mileage || "0").replace(/\D/g, ""), 10) || 0,
        priceUSD: String(price || data.priceUSD || "0"),
        price,
        monthlyPayment: monthlyPayment || null,
        advancePayment: advancePayment || null,
        sku: String(data.sku || ""),
        quantity: parseInt(data.quantity, 10) || 1,
        engineVolume: parseFloat(data.engineVolume) || 0,
        enginePower: parseFloat(data.enginePower) || 0,
        driveType: String(data.driveType || ""),
        bodyType: data.bodyType?.trim() ? String(data.bodyType).trim() : null,
        countryOfOrigin: String(data.countryOfOrigin || ""),
        weight: parseFloat(data.weight) || 0,
        length: parseFloat(data.length) || 0,
        width: parseFloat(data.width) || 0,
        height: parseFloat(data.height) || 0,
        status: data.status || "available",
        partnerId:
          data.partnerId != null && data.partnerId !== ""
            ? Number(data.partnerId) || null
            : null,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating car:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
