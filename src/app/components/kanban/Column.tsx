// components/kanban/Column.tsx
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { ColumnType } from "./types";
import toast from "react-hot-toast";

interface ColumnProps {
    column: ColumnType;
    items: string[];
    onAddCard: (column: ColumnType) => void;
}

export default function Column({ column, items, onAddCard }: ColumnProps) {
    return (
        <div className="w-64 bg-gray-700  rounded p-4 flex
        flex-col gap-y-2 overflow-y-auto"
            style={{ maxHeight: `${items.length * 80 + 100}px` }} // 80px per card + 100px for header/button
        >
            <h2 className="font-semibold text-center mb-4 text-white">{column}</h2>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                    {items.map((item) => (
                        <TaskCard key={item} id={item} column={column} />
                    ))}
                </div>
            </SortableContext>
            {/* Add new task button under each column */}
            <button
                className="mt-4 text-blue-300 hover:underline text-sm self-start"
                onClick={() => {
                    // You can replace with your add task logic here
                    onAddCard(column);
                    // toast(`Add new task to ${column}`);
                }}
            >
                + Add a card
            </button>
        </div>
    );
}
