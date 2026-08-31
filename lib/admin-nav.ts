export type AdminNavItem = {
  href: string;
  label: string;
  icon: string;
  match?: "exact" | "prefix";
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    id: "main",
    label: "Головне",
    items: [
      { href: "/admin", label: "Дашборд", icon: "dashboard", match: "exact" },
      { href: "/admin/leads", label: "Заявки", icon: "leads", match: "prefix" },
      { href: "/admin/users", label: "Користувачі бота", icon: "users", match: "prefix" },
      { href: "/admin/broadcast", label: "Розсилка", icon: "broadcast", match: "exact" },
    ],
  },
  {
    id: "cars",
    label: "База авто",
    items: [
      { href: "/admin/cars", label: "Автомобілі", icon: "cars", match: "prefix" },
      { href: "/admin/cars/add", label: "Додати авто", icon: "add", match: "exact" },
      { href: "/admin/partners", label: "Партнери", icon: "partners", match: "prefix" },
      { href: "/admin/categories", label: "Категорії", icon: "categories", match: "prefix" },
      { href: "/admin/banner", label: "Банер", icon: "banner", match: "exact" },
    ],
  },
  {
    id: "analytics",
    label: "Аналітика",
    items: [
      { href: "/admin/analytics", label: "Відвідування", icon: "visits", match: "prefix" },
      { href: "/admin/wizard/analytics", label: "Wizard аналітика", icon: "wizard-stats", match: "exact" },
    ],
  },
  {
    id: "settings",
    label: "Налаштування",
    items: [
      { href: "/admin/wizard", label: "Калькулятор / Wizard", icon: "calc", match: "exact" },
      { href: "/admin/settings", label: "Telegram / Система", icon: "settings", match: "exact" },
      { href: "/admin/admins", label: "Адміни", icon: "users", match: "exact" },
    ],
  },
];

export function isNavActive(pathname: string, item: AdminNavItem): boolean {
  if (item.match === "exact" || item.href === "/admin") {
    return pathname === item.href;
  }
  if (item.href === "/admin/cars") {
    return (
      pathname === "/admin/cars" ||
      (pathname.startsWith("/admin/cars/") && !pathname.startsWith("/admin/cars/add"))
    );
  }
  if (item.href === "/admin/wizard") {
    return pathname === "/admin/wizard";
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
