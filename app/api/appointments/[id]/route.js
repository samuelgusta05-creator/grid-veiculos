import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const appointments = await readRemote("appointments");
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  appointments[idx] = { ...appointments[idx], ...body };
  await writeRemote("appointments", appointments, `Atualiza agendamento: ${appointments[idx].customerName}`);
  return NextResponse.json(appointments[idx]);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const appointments = await readRemote("appointments");
  const next = appointments.filter((a) => a.id !== id);
  if (next.length === appointments.length) return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  await writeRemote("appointments", next, `Remove agendamento: ${id}`);
  return NextResponse.json({ ok: true });
}
