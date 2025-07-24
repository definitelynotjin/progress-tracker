// components/kanban/Column.tsx

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { ColumnType, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

function EmptyCard({ id }: { id: string }) {
    const { setNodeRef, attributes, listeners, isDragging } = useSortable({ id });
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`h-12 text-xs flex items-center justify-center bg-gray-700/30 text-gray-300 border-gray-900${isDragging ? ' opacity-50' : ''}`}
        >
            Drop the card here
        </div>
    );
}

interface ColumnProps {
    column: ColumnType;
    items: Task[];
    onAddCard: (column: ColumnType) => void;
    onTaskClick: (task: Task) => void;
}


export default function Column({ column, items, onAddCard, onTaskClick }: ColumnProps) {
    const sortableItems = items.length > 0 ? items.map(task => task.id) : [`placeholder-${column}`];

    return (
        <div className="flex-1 min-w-0 relative rounded-t-lg flex flex-col">
            {/* Colored bar at the very top of the column, static position */}
            {column.trim().toLowerCase() === "backlog" && <div className="h-1 rounded-t-lg bg-blue-200" />}
            {column.trim().toLowerCase() === "to do" && <div className="h-1 rounded-t-lg bg-purple-200" />}
            {column.trim().toLowerCase() === "in progress" && <div className="h-1 rounded-t-lg bg-teal-200" />}
            {column.trim().toLowerCase() === "done" && <div className="h-1 rounded-t-lg bg-lime-200" />}
            {/* Main column background container */}
            <div className="bg-gray-700 rounded-b flex flex-col h-full">
                {/* Title fixed at the top */}
                <div className="py-4 px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-left text-white">{column}</h2>
                        <span className="ml-2 text-white text-xs text-right font-semibold min-w-6">
                            {items.length}
                        </span>
                    </div>
                </div>
                {/* Scrollable card area only */}
                <div className="px-4 flex flex-col gap-y-2 flex-1 min-h-0 overflow-y-auto">
                    <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2 text-center">
                            {items.length === 0 ? (
                                <EmptyCard id={`placeholder-${column}`} />
                            ) : (
                                items.map((task) => (
                                    <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                                ))
                            )}
                        </div>
                    </SortableContext>
                </div>
                {/* Add card button at the bottom, inside the column */}
                <div className="p-3 mt-auto">
                    <button
                        onClick={() => onAddCard(column)}
                        className="w-full text-gray-100 align-text-top hover:underline text-xs text-center group"
                        aria-label="Add card"
                    >
                        <Plus size={18} className="mx-auto bold text-gray-300 group-hover:text-gray-100 transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    );
}
