import { NextResponse } from "next/server";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";
import { publishCarToChannel } from "@/lib/telegram-car-publish";
import { revalidateCarPages } from "@/lib/revalidate-cars";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const carId = Number((await params).id);
  if (!Number.isFinite(carId) || carId <= 0) {
    return NextResponse.json({ error: "Невірний ID" }, { status: 400 });
  }

  const result = await publishCarToChannel(carId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error || "Помилка публікації" }, { status: 400 });
  }

  revalidateCarPages(carId);
  return NextResponse.json({
    success: true,
    channelId: result.channelId,
    messageIds: result.messageIds,
  });
}
