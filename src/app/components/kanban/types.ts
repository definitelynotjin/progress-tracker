// components/kanban/types.ts

import { COLUMN_TYPES, PRIORITIES } from "./kanbanConfig";
export type ColumnType = typeof COLUMN_TYPES[number];
export type PriorityType = typeof PRIORITIES[number];

export interface Task {
    id: string;
    title: string;
    content: string;
    column: ColumnType;
    updatedAt?: string;
    priority?: PriorityType;
}
