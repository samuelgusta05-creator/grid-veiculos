import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";
import crypto from "crypto";

export async function GET() {
  const customers = await readRemote("customers");
  return NextResponse.json(customers);
}

export async function POST(req) {
  const body = await req.json();
  const { name, phone, email, notes } = body;
  if (!name || !phone) {
    return NextResponse.json({ error: "Nome e telefone são obrigatórios" }, { status: 400 });
  }
  const customers = await readRemote("customers");
  const customer = {
    id: crypto.randomUUID(),
    name,
    phone,
    email: email || "",
    notes: notes || "",
    createdAt: new Date().toISOString(),
  };
  customers.unshift(customer);
  await writeRemote("customers", customers, `Adiciona cliente: ${name}`);
  return NextResponse.json(customer, { status: 201 });
}
