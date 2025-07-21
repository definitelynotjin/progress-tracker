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
    // Each card is about 56px tall (including margin), min height is as if there is 1 card
    const cardHeight = 56;
    const headerHeight = 120;
    // Reduce min height for empty columns for compactness
    const columnHeight = (items.length === 0)
        ? (1 * cardHeight + 40) // 40px header/buttons for empty
        : (items.length * cardHeight + headerHeight);

    return (
        <div className="flex-1 min-w-80 relative rounded-t-lg" style={{ height: `${columnHeight}px` }}>
            {/* Colored bar at the very top of the column, static position */}
            {column.trim().toLowerCase() === "backlog" && <div className="h-1.5 rounded-t-lg bg-gray-400" />}
            {column.trim().toLowerCase() === "to do" && <div className="h-1.5 rounded-t-lg bg-purple-200" />}
            {column.trim().toLowerCase() === "in progress" && <div className="h-1.5 rounded-t-lg bg-teal-500" />}
            {column.trim().toLowerCase() === "done" && <div className="h-1.5 rounded-t-lg bg-lime-400" />}
            {/* Main column content below the colored bar */}
            <div className="bg-gray-700 rounded-b p-4 flex flex-col gap-y-2 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-left text-white">{column}</h2>
                    <span className="ml-2 text-white text-xs text-right font-semibold min-w-6">
                        {items.length}
                    </span>
                </div>
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
                <button
                    className="mt-4 text-gray-100 hover:underline text-xs text-center self-start"
                    onClick={() => onAddCard(column)}
                >
                    + Add card
                </button>
            </div>
        </div>
    );
}
