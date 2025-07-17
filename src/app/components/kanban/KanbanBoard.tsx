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
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";
import Modal from "./Modal";
import { DragOverlay } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export type ColumnType = "To Do" | "In Progress" | "Done";

const initialTasks: Record<ColumnType, string[]> = {
    "To Do": ["Task A", "Task B"],
    "In Progress": ["Task C"],
    Done: ["Task D"],
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Record<ColumnType, string[]>>(initialTasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalColumn, setModalColumn] = useState<ColumnType | null>(null);

    const [activeId, setActiveId] = useState<string | null>(null);

    const handleAddCard = (column: ColumnType) => {
        setModalColumn(column);
        setModalOpen(true);
    };

    const handleModalSubmit = (taskName: string) => {
        if (modalColumn && taskName.trim()) {
            setTasks((prev) => ({
                ...prev,
                [modalColumn]: [...prev[modalColumn], taskName.trim()],
            }));
        }
        setModalOpen(false);
        setModalColumn(null);
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);

        if (!over || active.id === over.id) return;

        const sourceCol = active.data.current?.column as ColumnType;
        const targetCol = over.data.current?.column as ColumnType;

        if (!sourceCol || !targetCol) return;

        if (sourceCol === targetCol) {
            const oldIndex = tasks[sourceCol].indexOf(active.id as string);
            const newIndex = tasks[targetCol].indexOf(over.id as string);

            const updated = [...tasks[sourceCol]];
            const [moved] = updated.splice(oldIndex, 1);
            updated.splice(newIndex, 0, moved);

            setTasks((prev) => ({
                ...prev,
                [sourceCol]: updated,
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

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id as string);
    };

    const columns = Object.keys(tasks) as ColumnType[];

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-row border-1 justify-center gap-4 overflow-x-auto bg-gray-50 p-8 min-h-screen">
                    <SortableContext items={columns} strategy={verticalListSortingStrategy}>
                        {columns.map((column) => (
                            <Column key={column} column={column} items={tasks[column]} onAddCard={handleAddCard} />
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? (
                            <TaskCard id={activeId} column={"To Do"} /> // column can be anything for display
                        ) : null}
                    </DragOverlay>
                </div>
            </DndContext>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
        </>
    );
}
