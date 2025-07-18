// components/kanban/Column.tsx

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { ColumnType, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";

function EmptyCard({ id }: { id: string }) {
    const { setNodeRef, attributes, listeners, isDragging } = useSortable({ id });
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`h-12 text-xs flex items-center justify-center bg-gray-700/30 text-gray-300 ${isDragging ? 'opacity-50' : ''}`}
        >
            Add card here
        </div>
    );
}

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
    const sortableItems = items.length > 0 ? items.map(task => task.id) : [`placeholder-${column}`];

    return (
        <div className="w-64 bg-gray-700 rounded p-4 flex flex-col gap-y-2 relative">
            <div className={`w-full h-0.5 rounded-full mb-1 ${columnColors[column] ?? "bg-gray-300"}`} />
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-left text-white">{column}</h2>
                <span className="ml-2 text-white text-xs text-right font-semibold min-w-6">
                    {items.length}
                </span>
            </div>
            <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 text-center max-h-96 overflow-y-auto">
                    {items.length === 0 ? (
                        <EmptyCard id={`placeholder-${column}`} />
                    ) : (
                        items.map((task) => (
                            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                        ))
                    )}
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
