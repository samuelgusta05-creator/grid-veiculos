import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";

export async function GET() {
  const settings = await readRemote("settings");
  return NextResponse.json(settings);
}

export async function PUT(req) {
  const body = await req.json();
  const current = await readRemote("settings");
  const next = { ...current, ...body };
  await writeRemote("settings", next, "Atualiza configurações");
  return NextResponse.json(next);
}
