import type { Task, CreateTask, UpdateTask } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${res.statusText}: ${msg}`);
  }
  return (await res.json()) as T;
}

export const api = {
  listTasks: () => http<Task[]>(`${BASE_URL}/tasks`),
  getTask: (id: Task["id"]) => http<Task>(`${BASE_URL}/tasks/${id}`),
  createTask: (data: CreateTask) =>
    http<Task>(`${BASE_URL}/tasks`, { method: "POST", body: JSON.stringify(data) }),
  updateTask: (id: Task["id"], data: UpdateTask) =>
    http<Task>(`${BASE_URL}/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTask: (id: Task["id"]) =>
    http<{ success: boolean }>(`${BASE_URL}/tasks/${id}`, { method: "DELETE" }),
};