import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const SESSION_COOKIE = "admin_session";
// Effectively permanent — the admin login should never run out.
const SESSION_MAX_AGE = 60 * 60 * 24 * 365 * 10; // 10 years

async function sessionToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode("freebuff-admin-session"),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request) ?? NextResponse.next();

  // Rolling session: any visit carrying a valid admin cookie re-issues it with
  // the long expiry, so the login never runs out (and existing 7-day cookies
  // get upgraded automatically, no re-login needed).
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const password = process.env.APP_PASSWORD;
  if (session && password && session === (await sessionToken(password))) {
    response.cookies.set(SESSION_COOKIE, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
