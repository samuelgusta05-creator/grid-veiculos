const COOKIE_NAME = "grid_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

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

export async function createSessionCookie() {
  const expires = Date.now() + MAX_AGE * 1000;
  const value = String(expires);
  const sig = await sign(value);
  const token = `${value}.${sig}`;
  return { name: COOKIE_NAME, value: token, maxAge: MAX_AGE };
}

export async function verifySessionToken(token) {
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

export const COOKIE_KEY = COOKIE_NAME;
