"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableCard from "./DraggableCard";
import { ColumnType } from "./KanbanBoard";

interface ColumnProps {
    column: ColumnType;
    items: string[];
}

export default function Column({ column, items }: ColumnProps) {
    return (
        <div className="flex-shrink-0 w-100 bg-white rounded-lg shadow-md p-5 flex flex-col border-0.5 border-red-500">
            <h2 className="text-xl font-semibold mb-4">{column}</h2>

            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                    {items.map((task) => (
                        <DraggableCard key={task} id={task} column={column} />
                    ))}
                </div>
            </SortableContext>

            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                + Add a card
            </button>
        </div>
    );
}
