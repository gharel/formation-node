export type Task = {
  id: number | string;
  title: string;
  completed?: boolean;
};

export type CreateTask = Omit<Task, "id">;
export type UpdateTask = Partial<Omit<Task, "id">>;