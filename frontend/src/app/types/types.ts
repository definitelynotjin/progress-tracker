import {
  ASSIGNEE,
  COLUMN_TYPES,
  PRIORITIES,
} from '../components/kanban/kanbanConfig';

export type ColumnType = (typeof COLUMN_TYPES)[number];
export type PriorityType = (typeof PRIORITIES)[number];
export type AssigneeType = (typeof ASSIGNEE)[number];

export type Task = {
  id: number;
  title: string;
  content: string;
  column: ColumnType;
  updatedAt?: string;
  priority?: PriorityType;
  assignee?: AssigneeType;
  dueDate?: string | { from: string; to: string };
  checklist?: ChecklistItem[];
};

export type boardType = {
  tasks: Task[];
  newTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};
