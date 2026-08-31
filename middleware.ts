import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canAccessPath } from "@/lib/admin-rbac";
import { parseSessionTokenEdge } from "@/lib/admin-session-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = await parseSessionTokenEdge(request.cookies.get("admin_session")?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (!canAccessPath(session.role, pathname)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-admin-role", session.role);
  response.headers.set("x-admin-user", session.username);
  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
