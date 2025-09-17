export type Task = {
  id: number | string;
  title: string;
  description?: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type UpdateTask = Partial<Omit<Task, "id" | "createdAt">>;