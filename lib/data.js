import fs from "fs";
import path from "path";
import { readJsonFile, writeJsonFile } from "./github";

const FILES = {
  vehicles: "data/vehicles.json",
  customers: "data/customers.json",
  appointments: "data/appointments.json",
  settings: "data/settings.json",
};

function localPath(name) {
  return path.join(process.cwd(), FILES[name]);
}

// Server-render reads: local bundled file (fast, no API call, fresh per-deploy).
export function readLocal(name, fallback = []) {
  try {
    const raw = fs.readFileSync(localPath(name), "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// Admin writes: commit straight to GitHub so it persists + triggers redeploy.
export async function writeRemote(name, data, message) {
  await writeJsonFile(FILES[name], data, message);
}

export async function readRemote(name) {
  const { data } = await readJsonFile(FILES[name], []);
  return data;
}

export function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
