/** Client-safe RBAC helpers (no Node / crypto / fs). */

export type AdminRole = "super_admin" | "content_manager" | "sales";

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  sales: "Sales",
};

export function roleRank(role: AdminRole): number {
  switch (role) {
    case "super_admin":
      return 3;
    case "content_manager":
      return 2;
    case "sales":
      return 1;
    default:
      return 0;
  }
}

export function canAccessPath(role: AdminRole, pathname: string): boolean {
  if (role === "super_admin") return true;

  const salesBlocked = [
    "/admin/cars/add",
    "/admin/categories",
    "/admin/banner",
    "/admin/wizard",
    "/admin/settings",
    "/admin/admins",
    "/admin/broadcast",
  ];
  const contentBlocked = [
    "/admin/settings",
    "/admin/admins",
    "/admin/wizard",
    "/admin/broadcast",
  ];

  if (role === "sales") {
    if (pathname.startsWith("/admin/cars/") && pathname !== "/admin/cars") return false;
    if (salesBlocked.some((p) => pathname === p || pathname.startsWith(p + "/"))) return false;
    if (pathname.startsWith("/admin/cars") && pathname.includes("add")) return false;
    return true;
  }

  if (role === "content_manager") {
    if (contentBlocked.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      if (pathname.startsWith("/admin/wizard/analytics")) return true;
      return false;
    }
    return true;
  }

  return false;
}

export function canManageCars(role: AdminRole): boolean {
  return role === "super_admin" || role === "content_manager";
}

export function canManageSettings(role: AdminRole): boolean {
  return role === "super_admin";
}

export function canManageAdmins(role: AdminRole): boolean {
  return role === "super_admin";
}

export function filterNavForRole<T extends { id: string; items: { href: string }[] }>(
  nav: T[],
  role: AdminRole
): T[] {
  return nav
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccessPath(role, item.href)),
    }))
    .filter((group) => group.items.length > 0);
}
