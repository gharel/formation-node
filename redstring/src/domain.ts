export type TaskStatus = 'todo' | 'in_progress' | 'in_validation' | 'finished';
export type UserRole = 'visitor' | 'creator' | 'validator';

export interface User {
	id: number;
	name: string;
	role: UserRole;
}

export interface Task {
	id: number;
	title: string;
	description?: string;
	status: TaskStatus;
	assigneeId?: number | null;
	createdAt: string;
	updatedAt: string;
}
