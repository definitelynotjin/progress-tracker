// components/kanban/types.ts
export type ColumnType = "Backlog" | "To Do" | "In Progress" | "Done";

export interface Task {
    id: string;
    title: string;       // add a title field for the task/page name
    content: string;     // rich text content as HTML string (default empty)
    column: ColumnType;  // the column the task belongs to
    updatedAt?: string;  // optional timestamp of last update
    priority?: "Low" | "Medium" | "High";
}
