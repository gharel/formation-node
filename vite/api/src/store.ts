import { promises as fs } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { Task } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(__dirname, "..", "data", "tasks.json");

export async function load(): Promise<Task[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Task[];
    return [];
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await save([]);
      return [];
    }
    throw e;
  }
}

export async function save(tasks: Task[]): Promise<void> {
  const tmp = DATA_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(tasks, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
}

export async function nextId(tasks: Task[]): Promise<number> {
  return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}
