"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./Column";

export type ColumnType = "To Do" | "In Progress" | "Done";

const initialTasks: Record<ColumnType, string[]> = {
    "To Do": ["Task A", "Task B"],
    "In Progress": ["Task C"],
    Done: ["Tasks D"],
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Record<ColumnType, string[]>>(initialTasks);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const sourceCol = active.data.current?.column as ColumnType;
        const targetCol = over.data.current?.column as ColumnType;

        if (!sourceCol || !targetCol) return;

        if (sourceCol === targetCol) {
            const oldIndex = tasks[sourceCol].indexOf(active.id as string);
            const newIndex = tasks[targetCol].indexOf(over.id as string);
            setTasks((prev) => ({
                ...prev,
                [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
            }));
        } else {
            setTasks((prev) => {
                const newSourceTasks = prev[sourceCol].filter(
                    (task) => task !== active.id
                );
                const newTargetTasks = [...prev[targetCol]];
                const overIndex = newTargetTasks.indexOf(over.id as string);
                newTargetTasks.splice(overIndex, 0, active.id as string);

                return {
                    ...prev,
                    [sourceCol]: newSourceTasks,
                    [targetCol]: newTargetTasks,
                };
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-row flex-wrap gap-6 justify-center p-8 bg-gray-50 min-h-screen">
                {Object.entries(tasks).map(([column, items]) => (
                    <Column key={column} column={column as ColumnType} items={items} />
                ))}
            </div>
        </DndContext>
    );
}
