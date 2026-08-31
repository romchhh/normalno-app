/** Edge-safe session parsing (Web Crypto — usable in middleware). */

import type { AdminRole } from "@/lib/admin-rbac";

export type AdminSession = {
  username: string;
  role: AdminRole;
  name: string;
  exp: number;
};

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "normalno-admin-dev-secret"
  );
}

function bytesToBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]!);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function hmacSha256Base64Url(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return bytesToBase64Url(sig);
}

/** Validate admin_session cookie (Edge + Node). */
export async function parseSessionTokenEdge(
  token: string | undefined | null
): Promise<AdminSession | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = await hmacSha256Base64Url(sessionSecret(), payload);
  if (!timingSafeEqualStr(sig, expected)) return null;

  try {
    let raw: string;
    if (typeof Buffer !== "undefined") {
      raw = Buffer.from(payload, "base64url").toString("utf-8");
    } else {
      const padded =
        payload.replace(/-/g, "+").replace(/_/g, "/") +
        "===".slice((payload.length + 3) % 4);
      raw = atob(padded);
    }
    const session = JSON.parse(raw) as AdminSession;
    if (!session.exp || session.exp < Date.now()) return null;
    if (!session.username || !session.role) return null;
    return session;
  } catch {
    return null;
  }
}
