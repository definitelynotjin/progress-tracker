// components/kanban/Column.tsx

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { ColumnType, Task } from "./types";


interface ColumnProps {
    column: ColumnType;
    items: Task[];
    onAddCard: (column: ColumnType) => void;
    onTaskClick: (task: Task) => void;
}

const columnColors: Record<string, string> = {
    Backlog: "bg-gray-400",
    "To Do": "bg-blue-500",
    "In Progress": "bg-yellow-500",
    "Done": "bg-green-500",
};

export default function Column({ column, items, onAddCard, onTaskClick }: ColumnProps) {
    // Debug: log the column name to check for typos or unexpected values
    console.log('Column:', JSON.stringify(column));

    return (
        <div className="w-64 bg-gray-700 rounded p-4 flex flex-col gap-y-2 relative">
            <div className={`w-full h-1 rounded-full mb-3 ${columnColors[column] ?? "bg-gray-300"}`} />
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-left text-white">{column}</h2>
                <span className="ml-2 text-white text-xs text-right font-semibold min-w-6">
                    {items.length}
                </span>
            </div>
            <SortableContext items={items.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 text-center max-h-96 overflow-y-auto">
                    {items.map((task) => (
                        <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                    ))}
                </div>
            </SortableContext>
            <button
                className="mt-4 text-gray-100 hover:underline text-xs text-center self-start"
                onClick={() => onAddCard(column)}
            >
                + Add card
            </button>
        </div>
    );
}
