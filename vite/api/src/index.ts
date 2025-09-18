import express from "express";
import cors from "cors";
import { load, save, nextId } from "./store.js";
import type { Task } from "./types.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await load();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, completed = false } = req.body ?? {};
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title must be non-empty string" });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be boolean" });
  }
  const tasks = await load();
  const task: Task = { id: await nextId(tasks), title: title.trim(), completed };
  const updated = [...tasks, task];
  await save(updated);
  res.status(201).json(task);
});

app.get("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "invalid ID" });
  const tasks = await load();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "invalid ID" });
  const { title, completed } = req.body ?? {};
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return res.status(400).json({ error: "title must be non-empty string" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be boolean" });
  }
  const tasks = await load();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const updated: Task = {
    ...tasks[idx],
    ...(title !== undefined ? { title: title.trim() } : {}),
    ...(completed !== undefined ? { completed } : {})
  };
  tasks[idx] = updated;
  await save(tasks);
  res.json(updated);
});

app.delete("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "invalid ID" });
  const tasks = await load();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const removed = tasks[idx];
  tasks.splice(idx, 1);
  await save(tasks);
  res.json(removed);
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});
