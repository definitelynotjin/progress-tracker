import React from "react";
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
            className="py-3 px-3 bg-gray-600 rounded shadow-md text-white hover:bg-gray-500 transition relative overflow-y-auto max-h-64 w-full"
            onClick={handleCardClick}
        >
            {/* Edit icon top right */}
            <button
                className="absolute top-2 right-2 z-20 p-2 rounded hover:bg-gray-500"
                onClick={e => { e.stopPropagation(); if (onClick) onClick(); }}
                aria-label="Edit task"
            >
                <Pencil size={12} className="text-gray-300 hover:text-white" />
            </button>
            {/* Card content and drag icon centered */}
            <div className="flex flex-col items-center justify-center w-full h-full">
                {/* Card content */}
                <div className="flex flex-col items-start gap-1 w-full">
                    {task.priority && <PriorityBadge priority={task.priority} />}
                    <span className="text-sm font-semibold">{task.title}</span>
                    {task.content && (
                        <span
                            className="text-xs text-left text-gray-200 mt-1"
                            dangerouslySetInnerHTML={{ __html: task.content }}
                        />
                    )}
                </div>
                {/* Draggable grip icon centered below content */}
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
