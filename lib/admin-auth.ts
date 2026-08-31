import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  type AdminRole,
  ROLE_LABELS,
  roleRank,
  canAccessPath,
  canManageCars,
  canManageSettings,
  canManageAdmins,
  filterNavForRole,
} from "@/lib/admin-rbac";

export type { AdminRole };
export {
  ROLE_LABELS,
  roleRank,
  canAccessPath,
  canManageCars,
  canManageSettings,
  canManageAdmins,
  filterNavForRole,
};

export type AdminUser = {
  username: string;
  passwordHash: string;
  role: AdminRole;
  name: string;
  active: boolean;
};

export type AdminSession = {
  username: string;
  role: AdminRole;
  name: string;
  exp: number;
};

const USERS_FILE = path.join(process.cwd(), "data", "admin-users.json");
const SESSION_TTL_SEC = 60 * 60 * 24 * 7;

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "normalno-admin-dev-secret"
  );
}

export function hashPassword(password: string, salt?: string): string {
  const s = salt || randomBytes(16).toString("hex");
  const hash = scryptSync(password, s, 64).toString("hex");
  return `${s}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 64).toString("hex");
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(next, "hex"));
  } catch {
    return false;
  }
}

async function ensureUsersFile(): Promise<AdminUser[]> {
  if (!existsSync(USERS_FILE)) {
    const dir = path.dirname(USERS_FILE);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin";
    const bootstrap: AdminUser[] = [
      {
        username,
        passwordHash: hashPassword(password),
        role: "super_admin",
        name: "Super Admin",
        active: true,
      },
    ];
    await writeFile(USERS_FILE, JSON.stringify(bootstrap, null, 2));
    return bootstrap;
  }
  const raw = await readFile(USERS_FILE, "utf-8");
  return JSON.parse(raw) as AdminUser[];
}

export async function listAdminUsers(): Promise<Omit<AdminUser, "passwordHash">[]> {
  const users = await ensureUsersFile();
  return users.map(({ passwordHash: _, ...u }) => u);
}

export async function findAdminUser(username: string): Promise<AdminUser | null> {
  const users = await ensureUsersFile();
  return users.find((u) => u.username === username && u.active) || null;
}

export async function saveAdminUsers(users: AdminUser[]): Promise<void> {
  const dir = path.dirname(USERS_FILE);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function upsertAdminUser(input: {
  username: string;
  password?: string;
  role: AdminRole;
  name: string;
  active?: boolean;
}): Promise<void> {
  const users = await ensureUsersFile();
  const idx = users.findIndex((u) => u.username === input.username);
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      role: input.role,
      name: input.name,
      active: input.active ?? users[idx].active,
      ...(input.password ? { passwordHash: hashPassword(input.password) } : {}),
    };
  } else {
    if (!input.password) throw new Error("Пароль обовʼязковий для нового користувача");
    users.push({
      username: input.username,
      passwordHash: hashPassword(input.password),
      role: input.role,
      name: input.name,
      active: input.active ?? true,
    });
  }
  await saveAdminUsers(users);
}

export async function deleteAdminUser(username: string): Promise<void> {
  const users = await ensureUsersFile();
  if (users.length <= 1) throw new Error("Не можна видалити останнього адміна");
  await saveAdminUsers(users.filter((u) => u.username !== username));
}

export function signSession(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const sig = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function parseSessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as AdminSession;
    if (!session.exp || session.exp < Date.now()) return null;
    if (!session.username || !session.role) return null;
    return session;
  } catch {
    return null;
  }
}

export function createSessionForUser(user: AdminUser): string {
  return signSession({
    username: user.username,
    role: user.role,
    name: user.name,
    exp: Date.now() + SESSION_TTL_SEC * 1000,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    return parseSessionToken(cookieStore.get("admin_session")?.value);
  } catch {
    return null;
  }
}

export function hasMinRole(session: AdminSession | null, min: AdminRole): boolean {
  if (!session) return false;
  return roleRank(session.role) >= roleRank(min);
}

export function canEditLeads(role: AdminRole): boolean {
  return role === "super_admin" || role === "sales" || role === "content_manager";
}

export async function requireAdmin(
  minRole: AdminRole = "sales"
): Promise<{ session: AdminSession } | { error: NextResponse }> {
  const session = await getAdminSession();
  if (!session) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (!hasMinRole(session, minRole)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { session };
}
