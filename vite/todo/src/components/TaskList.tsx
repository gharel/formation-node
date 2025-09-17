import type { Task } from "../types";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggleDone: (id: Task["id"], done: boolean) => Promise<void> | void;
  onDelete: (id: Task["id"]) => Promise<void> | void;
  onSave: (id: Task["id"], patch: Partial<Task>) => Promise<void> | void;
};

export default function TaskList({ tasks, onToggleDone, onDelete, onSave }: Props) {
  if (!tasks.length) return <div className="card">Aucune tâche.</div>;
  return (
    <ul>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggleDone={onToggleDone} onDelete={onDelete} onSave={onSave} />)
      )}
    </ul>
  );
}