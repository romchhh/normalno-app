import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

async function requireAdmin() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get("admin_session"));
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const take = 20;
  const skip = (page - 1) * take;

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (source && source !== "all") where.source = source;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { phone: { contains: q } },
      { carLabel: { contains: q } },
    ];
  }

  const [leads, total, newCount, inProgressCount, doneCount] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.lead.count({ where }),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.lead.count({ where: { status: "in_progress" } }),
    prisma.lead.count({ where: { status: "done" } }),
  ]);

  return NextResponse.json({
    leads,
    total,
    page,
    totalPages: Math.ceil(total / take),
    stats: { newCount, inProgressCount, doneCount },
  });
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, status } = body as { id?: number; status?: string };

  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const allowed = ["new", "in_progress", "done", "spam"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ lead });
}
