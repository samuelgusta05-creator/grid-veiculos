import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const customers = await readRemote("customers");
  const idx = customers.findIndex((c) => c.id === id);
  if (idx === -1) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
  customers[idx] = { ...customers[idx], ...body };
  await writeRemote("customers", customers, `Atualiza cliente: ${customers[idx].name}`);
  return NextResponse.json(customers[idx]);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const customers = await readRemote("customers");
  const next = customers.filter((c) => c.id !== id);
  if (next.length === customers.length) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
  await writeRemote("customers", next, `Remove cliente: ${id}`);
  return NextResponse.json({ ok: true });
}
