export const COLUMN_TYPES = ["Backlog", "To Do", "In Progress", "Done"] as const;

export const PRIORITIES = ["Low", "Medium", "High"] as const;

export type ColumnType = typeof COLUMN_TYPES[number];
export type PriorityType = typeof PRIORITIES[number];
