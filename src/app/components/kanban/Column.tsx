// components/kanban/Column.tsx
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { ColumnType } from "./types";

interface ColumnProps {
    column: ColumnType;
    items: string[];
}

export default function Column({ column, items }: ColumnProps) {
    return (
        <div className="w-64 bg-gray-100 rounded p-4 flex flex-col">
            <h2 className="font-semibold text-center mb-4">{column}</h2>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 overflow-y-auto max-h-64">
                    {items.map((item) => (
                        <TaskCard key={item} id={item} column={column} />
                    ))}
                </div>
            </SortableContext>

            {/* Add new task button under each column */}
            <button
                className="mt-4 text-blue-600 hover:underline text-sm self-start"
                onClick={() => {
                    // You can replace with your add task logic here
                    alert(`Add new task to ${column}`);
                }}
            >
                + Add a card
            </button>
        </div>
    );
}
