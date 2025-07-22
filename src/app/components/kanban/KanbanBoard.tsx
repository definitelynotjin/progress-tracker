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
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Modal from "./Modal";
import { DragOverlay } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Task } from "./types";
import TaskDetail from "./TaskDetail";

import type { ColumnType } from "./types";

const initialTasks: Record<ColumnType, Task[]> = {
    "Backlog": [
        { id: "task-a", title: "Lorem ipsum dolor sit amet", content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.</p>", updatedAt: new Date().toISOString(), column: "Backlog", priority: "Low", assignee: "Ali" },
        { id: "task-b", title: "Consectetur adipiscing elit", content: "<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>", updatedAt: new Date().toISOString(), column: "Backlog", priority: "Medium", assignee: "Burhan" },
    ],
    "To Do": [
        { id: "task-c", title: "Sed do eiusmod tempor incididunt", content: "<p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>", updatedAt: new Date().toISOString(), column: "To Do", priority: "High", assignee: "Coki" },
        { id: "task-d", title: "Ut labore et dolore magna aliqua", content: "<p>Ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>", updatedAt: new Date().toISOString(), column: "To Do", priority: "Medium", assignee: "Dennis" },
    ],
    "In Progress": [
        { id: "task-e", title: "Ut enim ad minim veniam", content: "<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>", updatedAt: new Date().toISOString(), column: "In Progress", priority: "High", assignee: "Erfan" },
    ],
    Done: [
        { id: "task-f", title: "Quis nostrud exercitation ullamco", content: "<p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>", updatedAt: new Date().toISOString(), column: "Done", priority: "Low", assignee: "Frank" },
    ],
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>(initialTasks);
    const [columnOrder, setColumnOrder] = useState<ColumnType[]>(Object.keys(initialTasks) as ColumnType[]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalColumn, setModalColumn] = useState<ColumnType | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    // Removed unused activeColumnId state
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

    // Unified drag logic for columns and cards
    const handleDragStart = (event: DragEndEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over || active.id === over.id) return;

        // Column drag
        if (columnOrder.includes(active.id as ColumnType) && columnOrder.includes(over.id as ColumnType)) {
            const oldIndex = columnOrder.findIndex((col) => col === active.id);
            const newIndex = columnOrder.findIndex((col) => col === over.id);
            if (oldIndex === -1 || newIndex === -1) return;
            const updated = [...columnOrder];
            const [moved] = updated.splice(oldIndex, 1);
            updated.splice(newIndex, 0, moved);
            setColumnOrder(updated);
            return;
        }

        // Card drag
        const sourceCol = active.data?.current?.column as ColumnType;
        let targetCol = over.data?.current?.column as ColumnType | undefined;
        if (!targetCol && typeof over.id === "string" && over.id.startsWith("placeholder-")) {
            targetCol = over.id.replace("placeholder-", "") as ColumnType;
        }
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

    // Wrapper for sortable column
    function SortableColumn({ id, children }: { id: string; children: React.ReactNode }) {
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
        };
        return (
            <div ref={setNodeRef} style={style} {...attributes} className="relative">
                {/* Handlebar for dragging column */}
                <button
                    {...listeners}
                    className="absolute left-1 top-1 z-10 flex items-center justify-center w-6 h-6 rounded bg-gray-700 hover:bg-gray-200 cursor-grab"
                    style={{ cursor: 'grab' }}
                    aria-label="Drag column"
                >
                    <GripVertical size={18} className="text-gray-400 group-hover:text-gray-900" />
                </button>
                <div className="pl-8">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Unified DndContext for columns and cards */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                    <div className="flex flex-row justify-left gap-4 overflow-auto bg-gray-800 p-10 min-h-screen">
                        {columnOrder.map((column) => (
                            <SortableColumn key={column} id={column}>
                                <Column
                                    column={column}
                                    items={tasks[column]}
                                    onAddCard={handleAddCard}
                                    onTaskClick={handleTaskClick}
                                />
                            </SortableColumn>
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {activeTask ? (
                        <TaskCard task={activeTask} />
                    ) : null}
                </DragOverlay>
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
