// components/kanban/TaskCard.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnType } from "./types";

export default function TaskCard({ id, column }: { id: string; column: ColumnType }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: {
            column, // This is needed for onDragEnd
        },
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
            className="p-3 bg-gray-400 gap-y-6 rounded shadow-md cursor-move text-white hover:bg-gray-500 transition"
        >
            {id}
        </div>
    );
}
