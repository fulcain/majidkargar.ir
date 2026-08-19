import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
// Effectively permanent — you don't want to keep logging back in.
const SESSION_MAX_AGE = 60 * 60 * 24 * 365 * 10; // 10 years

export function isAdminConfigured(): boolean {
  return Boolean(process.env.APP_PASSWORD);
}

function sessionToken(): string {
  const password = process.env.APP_PASSWORD;
  if (!password) return "";
  return createHmac("sha256", password)
    .update("freebuff-admin-session")
    .digest("hex");
}

export async function isAdminAuthed(): Promise<boolean> {
  if (!isAdminConfigured()) return false;

  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value) return false;

  const expected = sessionToken();
  const a = Buffer.from(value);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}


