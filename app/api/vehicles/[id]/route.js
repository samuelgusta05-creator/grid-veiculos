import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const vehicles = await readRemote("vehicles");
  const idx = vehicles.findIndex((v) => v.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 });
  }
  const current = vehicles[idx];
  const next = { ...current, ...body };

  if (body.status === "vendido" && current.status !== "vendido") {
    next.soldAt = new Date().toISOString();
    next.soldPrice = body.soldPrice ? Number(body.soldPrice) : current.price;
  }
  if (body.status === "disponivel" && current.status === "vendido") {
    next.soldAt = null;
    next.soldPrice = null;
  }
  if (body.price !== undefined) next.price = Number(body.price);

  vehicles[idx] = next;
  await writeRemote("vehicles", vehicles, `Atualiza veículo: ${next.brand} ${next.model} ${next.year}`);
  return NextResponse.json(next);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const vehicles = await readRemote("vehicles");
  const next = vehicles.filter((v) => v.id !== id);
  if (next.length === vehicles.length) {
    return NextResponse.json({ error: "Veículo não encontrado" }, { status: 404 });
  }
  await writeRemote("vehicles", next, `Remove veículo: ${id}`);
  return NextResponse.json({ ok: true });
}
