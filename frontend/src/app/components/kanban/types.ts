import { ASSIGNEE, COLUMN_TYPES, PRIORITIES } from "./kanbanConfig";

export type ColumnType = typeof COLUMN_TYPES[number];
export type PriorityType = typeof PRIORITIES[number];
export type AssigneeType = typeof ASSIGNEE[number];


export type Task = {
    id: string;
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
  newTask: (task: Omit<Task, 'id'>) => Promise <void>,
  updateTask: (task: Task) => Promise <void>,
  deleteTask: (id: number) =>Promise <void>

};

export type ChecklistItem = {
    id: string;
    text: string;
    done: boolean;
}
