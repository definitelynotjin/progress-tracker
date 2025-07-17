// components/kanban/TaskCard.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnType } from "./types";
import { GripVertical } from "lucide-react";

export default function TaskCard({ id, column }: { id: string; column: ColumnType }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: {
            column,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition ?? "transform 250ms ease",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="p-3 bg-gray-400 rounded shadow-md text-white hover:bg-gray-500 transition flex items-center justify-between"
        >
            <span>{id}</span>

            {/* 🟡 Only this icon is draggable now */}
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab p-1 hover:text-yellow-300"
            >
                <GripVertical size={16} />
            </div>
        </div>
    );
}
