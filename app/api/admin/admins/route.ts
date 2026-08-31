import { NextRequest, NextResponse } from "next/server";
import {
  deleteAdminUser,
  listAdminUsers,
  requireAdmin,
  upsertAdminUser,
  type AdminRole,
} from "@/lib/admin-auth";

export async function GET() {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;
  const users = await listAdminUsers();
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const username = String(body.username || "").trim();
    const name = String(body.name || username).trim();
    const role = body.role as AdminRole;
    const password = body.password ? String(body.password) : undefined;

    if (!username || !role) {
      return NextResponse.json({ error: "username і role обовʼязкові" }, { status: 400 });
    }
    if (!["super_admin", "content_manager", "sales"].includes(role)) {
      return NextResponse.json({ error: "Невірна роль" }, { status: 400 });
    }

    await upsertAdminUser({
      username,
      name,
      role,
      password,
      active: body.active !== false,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Помилка" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  try {
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ error: "username обовʼязковий" }, { status: 400 });
    }
    if (username === auth.session.username) {
      return NextResponse.json({ error: "Не можна видалити себе" }, { status: 400 });
    }
    await deleteAdminUser(String(username));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Помилка" },
      { status: 400 }
    );
  }
}
