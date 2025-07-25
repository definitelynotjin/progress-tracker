import { GripVertical, Pencil } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./types";
import PriorityBadge from "./PriorityBadge";

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

    // Only open modal when clicking the card, not the dot
    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent modal if clicking the dot
        if ((e.target as HTMLElement).dataset.handle === "dot") return;
        if (onClick) onClick();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="py-3 px-3 bg-gray-600 rounded shadow-md text-white hover:bg-gray-500 transition relative min-w-[275px] max-w-[350px] w-full animate-fade-in"
            onClick={handleCardClick}
        >
            {/* Edit icon top right */}
            <button
                className="absolute top-2 right-2 z-20 p-2 rounded hover:bg-gray-500"
                onClick={e => { e.stopPropagation(); if (onClick) onClick(); }}
                aria-label="Edit task"
            >
                <Pencil size={14} className="text-gray-300 hover:text-white" />
            </button>
            {/* Card content and drag icon centered */}
            <div className="flex flex-col items-center justify-center w-full h-full">
                {/* Header: Priority badge and title */}
                <div className="flex flex-col items-start gap-1 w-full">
                    <div className="flex items-center w-full">
                        {task.priority && <PriorityBadge priority={task.priority} />}
                    </div>
                    <span className="text-sm font-semibold">{task.title}</span>
                </div>
                {/* Scrollable text body */}
                <div className="w-full overflow-y-auto max-h-24">
                    {task.content && (
                        <span
                            className="tiptap-taskcard prose max-w-none text-xs text-left text-gray-200 mt-1 gap-2 flex flex-col [&_ol]:list-decimal [&_ul]:list-disc [&_li]:my-2"
                            dangerouslySetInnerHTML={{ __html: task.content }}
                        />
                    )}
                </div>
                {/* Footer: Assigned to avatar and grip icon */}
                <div className="flex items-center w-full mt-2">
                    <div className="flex-1"></div>
                    {task.assignee ? (
                        <span
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-gray-900 font-bold text-xs border-2 border-gray-300 shadow"
                            title={task.assignee}
                        >
                            {task.assignee.charAt(0).toUpperCase()}
                        </span>
                    ) : null}
                </div>
                <div
                    data-handle="dot"
                    {...attributes}
                    {...listeners}
                    className="mt-4 flex items-center justify-center cursor-grab"
                    style={{ background: "transparent" }}
                >
                    <GripVertical size={24} className="text-gray-400 hover:text-gray-900 rotate-90" />
                </div>
            </div>
        </div>
    );
}
