import { NextResponse } from "next/server";
import { createSessionCookie, COOKIE_KEY } from "@/lib/auth";

export async function POST(req) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "ADMIN_PASSWORD não configurado no servidor" }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }
  const cookie = await createSessionCookie();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_KEY, cookie.value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: cookie.maxAge,
  });
  return res;
}
