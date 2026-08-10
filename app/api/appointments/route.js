import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";
import crypto from "crypto";

export async function GET() {
  const appointments = await readRemote("appointments");
  return NextResponse.json(appointments);
}

export async function POST(req) {
  const body = await req.json();
  const { customerName, customerPhone, date, time, vehicleInterest, notes } = body;
  if (!customerName || !date || !time) {
    return NextResponse.json({ error: "Nome, data e hora são obrigatórios" }, { status: 400 });
  }
  const appointments = await readRemote("appointments");
  const appointment = {
    id: crypto.randomUUID(),
    customerName,
    customerPhone: customerPhone || "",
    date,
    time,
    vehicleInterest: vehicleInterest || "",
    notes: notes || "",
    status: "agendado",
    createdAt: new Date().toISOString(),
  };
  appointments.push(appointment);
  appointments.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  await writeRemote("appointments", appointments, `Agenda visita: ${customerName}`);
  return NextResponse.json(appointment, { status: 201 });
}
