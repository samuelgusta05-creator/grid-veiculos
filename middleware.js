import { NextResponse } from "next/server";

const COOKIE_KEY = "grid_session";

function secret() {
  return process.env.COOKIE_SECRET || "dev-secret-change-me";
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(sig);
}

async function verifySessionToken(token) {
  if (!token) return false;
  const [value, sig] = token.split(".");
  if (!value || !sig) return false;
  const expected = await sign(value);
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return false;
  return Number(value) > Date.now();
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_KEY)?.value;
    if (!(await verifySessionToken(token))) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    const token = req.cookies.get(COOKIE_KEY)?.value;
    if (!(await verifySessionToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
