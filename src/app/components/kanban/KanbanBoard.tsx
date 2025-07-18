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
import { Task } from "./types";
import TaskDetail from "./TaskDetail";

import type { ColumnType } from "./types";

const initialTasks: Record<ColumnType, Task[]> = {

    "Backlog": [
        { id: "task-a", title: "Task O", content: "", updatedAt: new Date().toISOString(), column: "Backlog" },
        { id: "task-b", title: "Task P", content: "", updatedAt: new Date().toISOString(), column: "Backlog" },
    ],
    "To Do": [
        { id: "task-a", title: "Task A", content: "", updatedAt: new Date().toISOString(), column: "To Do" },
        { id: "task-b", title: "Task B", content: "", updatedAt: new Date().toISOString(), column: "To Do" },
    ],
    "In Progress": [
        { id: "task-c", title: "Task C", content: "", updatedAt: new Date().toISOString(), column: "In Progress" },
    ],
    Done: [
        { id: "task-d", title: "Task D", content: "", updatedAt: new Date().toISOString(), column: "Done" },
    ],
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>(initialTasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalColumn, setModalColumn] = useState<ColumnType | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const activeTask = Object.values(tasks)
        .flat()
        .find((task) => task.id === activeId);
    const handleAddCard = (column: ColumnType) => {
        setModalColumn(column);
        setModalOpen(true);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const handleTaskSave = (updatedTask: Task) => {
        setTasks(prev => ({
            ...prev,
            [updatedTask.column]: prev[updatedTask.column].map(t =>
                t.id === updatedTask.id ? updatedTask : t
            ),
        }));
        setSelectedTask(null);
    };

    const handleTaskCancel = () => setSelectedTask(null);

    const handleModalSubmit = (taskName: string) => {
        if (modalColumn && taskName.trim()) {
            setTasks((prev) => ({
                ...prev,
                [modalColumn]: [
                    ...prev[modalColumn],
                    {
                        id: crypto.randomUUID(),
                        title: taskName.trim(),
                        content: "",
                        updatedAt: new Date().toISOString(),
                        column: modalColumn,
                    },
                ],
            }));
            setModalOpen(false);
            setModalColumn(null);
        }
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
            const oldIndex = tasks[sourceCol].findIndex((task) => task.id === active.id);
            const newIndex = tasks[targetCol].findIndex((task) => task.id === over.id);

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
                    (task) => task.id !== active.id
                );
                const movedTask = prev[sourceCol].find((task) => task.id === active.id);
                if (!movedTask) return prev;

                const updatedMovedTask = { ...movedTask, column: targetCol };
                const newTargetTasks = [...prev[targetCol]];
                const overIndex = newTargetTasks.findIndex((task) => task.id === over.id);
                newTargetTasks.splice(overIndex, 0, updatedMovedTask);

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
                <div className="flex flex-row border-1 justify-center gap-4 overflow-x-auto bg-gray-800 p-8 min-h-screen">
                    <SortableContext items={columns} strategy={verticalListSortingStrategy}>
                        {columns.map((column) => (
                            <Column
                                key={column}
                                column={column}
                                items={tasks[column]}
                                onAddCard={handleAddCard}
                                onTaskClick={handleTaskClick}
                            />
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {activeTask ? (
                            <TaskCard task={activeTask} />
                        ) : null}
                    </DragOverlay>
                </div>
            </DndContext>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
            {selectedTask && (
                <TaskDetail
                    task={selectedTask}
                    onSave={handleTaskSave}
                    onCancel={handleTaskCancel}
                />
            )}
        </>
    );
}
