import { NextResponse } from "next/server";
import { readRemote, writeRemote } from "@/lib/data";

function slugify(str) {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const vehicles = await readRemote("vehicles");
  return NextResponse.json(vehicles);
}

export async function POST(req) {
  const body = await req.json();
  const { brand, model, year, price, description, image } = body;
  if (!brand || !model || !year || !price) {
    return NextResponse.json({ error: "Marca, modelo, ano e preço são obrigatórios" }, { status: 400 });
  }
  const vehicles = await readRemote("vehicles");
  let id = slugify(`${brand}-${model}-${year}`);
  let suffix = 1;
  const existingIds = new Set(vehicles.map((v) => v.id));
  while (existingIds.has(id)) {
    id = slugify(`${brand}-${model}-${year}-${suffix}`);
    suffix++;
  }
  const vehicle = {
    id,
    brand,
    model,
    year: String(year),
    price: Number(price),
    description: description || "",
    image: image || "/assets/estoque/placeholder.jpg",
    status: "disponivel",
    soldAt: null,
    soldPrice: null,
    createdAt: new Date().toISOString(),
  };
  vehicles.unshift(vehicle);
  await writeRemote("vehicles", vehicles, `Adiciona veículo: ${brand} ${model} ${year}`);
  return NextResponse.json(vehicle, { status: 201 });
}
