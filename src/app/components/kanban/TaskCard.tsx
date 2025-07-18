import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./types";
import { GripVertical } from "lucide-react";



type TaskCardProps = { task: Task; onClick?: () => void };

export default function TaskCard({ task, onClick }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
        data: {
            column: task.column,
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
            className="p-3 bg-gray-600 rounded shadow-md text-white hover:bg-gray-500 transition flex items-center justify-between cursor-pointer"
            onClick={onClick}
        >
            <span className="text-sm">{task.title}</span>
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab p-1 hover:text-gray-900"
                onClick={e => e.stopPropagation()}
            >
                <GripVertical size={16} />
            </div>
        </div>
    );
}
