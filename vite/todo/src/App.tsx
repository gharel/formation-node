import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import type { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  async function refresh() {
    setError(null);
    setLoading(true);
    try {
      const data = await api.listTasks();
      const sorted = [...data].sort((a, b) => {
        const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
        const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
        if (ta !== tb) return tb - ta;
        return String(b.id).localeCompare(String(a.id));
      });
      setTasks(sorted);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function createTask(dto: Omit<Task, "id">) {
    await api.createTask(dto);
    await refresh();
  }

  async function toggleDone(id: Task["id"], done: boolean) {
    await api.updateTask(id, { done });
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
  }

  async function savePatch(id: Task["id"], patch: Partial<Task>) {
    await api.updateTask(id, patch);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  async function remove(id: Task["id"]) {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = useMemo(() => {
    const byFilter = tasks.filter((t) =>
      filter === "all" ? true : filter === "done" ? t.done : !t.done
    );
    const q = query.trim().toLowerCase();
    if (!q) return byFilter;
    return byFilter.filter((t) =>
      [t.title, t.description ?? "", String(t.id)].some((s) => s.toLowerCase().includes(q))
    );
  }, [tasks, filter, query]);

  return (
    <div className="container">
      <header className="header">
        <h1>Tasks</h1>
        <span className="badge">GET /tasks</span>
      </header>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row">
          <input placeholder="Recherche (titre, desc, id)" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">Toutes</option>
            <option value="open">Ouvertes</option>
            <option value="done">Terminées</option>
          </select>
          <button className="secondary" onClick={refresh}>Rafraîchir</button>
        </div>
      </div>

      <TaskForm onCreate={createTask} />

      {error && <div className="card" style={{ borderColor: "#b0333b" }}>Erreur: {error}</div>}
      {loading ? (
        <div className="card">Chargement...</div>
      ) : (
        <TaskList tasks={filtered} onToggleDone={toggleDone} onDelete={remove} onSave={savePatch} />
      )}

      <footer className="small" style={{ marginTop: 24, opacity: .7 }}>
        Cette UI consomme: GET /tasks, POST /tasks, GET /tasks/:id, PUT /tasks/:id, DELETE /tasks/:id.
      </footer>
    </div>
  );
}