"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnType } from "./types";

interface DraggableCardProps {
    id: string;
    column: ColumnType;
}

export default function DraggableCard({ id, column }: DraggableCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: { column },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-gray-400 rounded-md p-3 shadow-sm cursor-move hover:bg-gray-200 transition"
        >
            {id}
        </div>
    );
}
