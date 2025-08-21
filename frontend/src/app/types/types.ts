import {
	ASSIGNEE,
	COLUMN_TYPES,
	PRIORITIES,
} from '../components/kanban/kanbanConfig';

export type ColumnType = (typeof COLUMN_TYPES)[number];
export type PriorityType = (typeof PRIORITIES)[number];
export type AssigneeType = (typeof ASSIGNEE)[number];

export type DueDateRange = {
	from: Date;
	to: Date;
};

export type Task = {
	id: number;
	title: string;
	content: string;
	column: ColumnType;
	updatedAt?: string;
	priority?: PriorityType;
	assignee?: AssigneeType;
	dueDate?: { from: Date; to: Date } | null;
	checklist?: ChecklistItem[];
};

export type boardType = {
	tasks: Record<ColumnType, Task[]>;
	newTask: (task: Omit<Task, 'id'>) => Promise<void>;
	updateTask: (task: Task) => Promise<void>;
	deleteTask: (id: number) => Promise<void>;
	loadTasks: () => Promise<void>;
};

export type ChecklistItem = {
	id: string;
	text: string;
	done: boolean;
};
