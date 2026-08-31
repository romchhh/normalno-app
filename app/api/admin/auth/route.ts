import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSessionForUser,
  findAdminUser,
  getAdminSession,
  verifyPassword,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Вкажіть логін і пароль" }, { status: 400 });
    }

    const user = await findAdminUser(String(username).trim());
    if (!user || !verifyPassword(String(password), user.passwordHash)) {
      return NextResponse.json({ error: "Невірний логін або пароль" }, { status: 401 });
    }

    const token = createSessionForUser(user);
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: { username: user.username, role: user.role, name: user.name },
    });
  } catch (error: unknown) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      username: session.username,
      role: session.role,
      name: session.name,
    },
  });
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
