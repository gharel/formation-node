import { useState } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onToggleDone: (id: Task["id"], completed: boolean) => Promise<void> | void;
  onDelete: (id: Task["id"]) => Promise<void> | void;
  onSave: (id: Task["id"], patch: Partial<Task>) => Promise<void> | void;
};

export default function TaskItem({ task, onToggleDone, onDelete, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(task.id, { title: title.trim() });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <li className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row" style={{ flex: 1 }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleDone(task.id, e.target.checked)}
            style={{ width: 18, height: 18 }}
            aria-label="Marquer terminé"
          />
          {editing ? (
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          ) : (
            <div style={{ marginLeft: 8 }}>
              <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</strong>
              <div className="small">ID: {String(task.id)}</div>
            </div>
          )}
        </div>
        <div className="row">
          {!editing ? (
            <button className="secondary" onClick={() => setEditing(true)}>Éditer</button>
          ) : (
            <button onClick={handleSave} disabled={saving}>{saving ? "Sauvegarde..." : "Sauver"}</button>
          )}
          <button className="danger" onClick={() => onDelete(task.id)}>Supprimer</button>
        </div>
      </div>
    </li>
  );
}