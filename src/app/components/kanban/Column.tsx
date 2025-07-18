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

export default function Column({ column, items, onAddCard, onTaskClick }: ColumnProps) {
    return (
        <div className="w-64 bg-gray-700 rounded p-4 flex flex-col gap-y-2 overflow-y-auto"
            style={{ maxHeight: `${items.length * 80 + 100}px` }}
        >
            <h2 className="font-semibold text-center mb-4 text-white">{column}</h2>
            <SortableContext items={items.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                    {items.map((task) => (
                        <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                    ))}
                </div>
            </SortableContext>
            <button
                className="mt-4 text-gray-300 hover:underline text-sm self-start"
                onClick={() => onAddCard(column)}
            >
                + Add a card
            </button>
        </div>
    );
}
