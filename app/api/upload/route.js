import { NextResponse } from "next/server";
import { writeBinaryFile } from "@/lib/github";

function slugify(str) {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req) {
  const body = await req.json();
  const { filename, base64, folder } = body;
  if (!filename || !base64) {
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  }
  const ext = (filename.split(".").pop() || "jpg").toLowerCase();
  const name = `${slugify(filename.replace(/\.[^.]+$/, ""))}-${Date.now()}.${ext}`;
  const dir = folder || "estoque";
  const path = `public/assets/${dir}/${name}`;
  const dataOnly = base64.includes(",") ? base64.split(",")[1] : base64;
  await writeBinaryFile(path, dataOnly, `Upload de imagem: ${name}`);
  return NextResponse.json({ url: `/assets/${dir}/${name}` });
}
