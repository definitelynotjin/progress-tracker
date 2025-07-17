// components/kanban/types.ts
export type ColumnType = "To Do" | "In Progress" | "Done";

export interface Task {
    id: string;
    content: string;
}
