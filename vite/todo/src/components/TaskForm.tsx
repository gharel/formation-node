import { useState } from "react";
import type { CreateTask } from "../types";

type Props = {
  onCreate: (data: CreateTask) => Promise<void> | void;
};

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim() || undefined, done: false });
      setTitle("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 16 }}>
      <div className="header">
        <h2>Nouvelle tâche</h2>
        <span className="small">POST /tasks</span>
      </div>
      <div className="grid">
        <input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optionnel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 12 }} className="row">
        <button type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</button>
      </div>
    </form>
  );
}