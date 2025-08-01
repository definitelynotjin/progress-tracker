"use client";

import { useState } from "react";
import { useTasks } from "./TaskContext";
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

export const initialTasks: Record<ColumnType, Task[]> = {
    "Backlog": [
        {
            id: "task-a",
            title: "Survey network topology",
            content: `
                <ul>
                    <li>Document the current network layout</li>
                    <li>Identify all connected devices</li>
                    <li>Checking the caches</li>
                </ul>
            `,
            updatedAt: new Date().toISOString(),
            column: "Backlog",
            priority: "Low",
            assignee: "Ali",
            dueDate: { from: "2025-08-01", to: "2025-08-03" }
        },
        {
            id: "task-b",
            title: "Plan IP address allocation",
            content: `
                <ul>
                    <li>Design an efficient IP addressing scheme</li>
                    <li>Plan for new subnets</li>
                </ul>
            `,
            updatedAt: new Date().toISOString(),
            column: "Backlog",
            priority: "Medium",
            assignee: "Burhan",
            dueDate: { from: "2025-08-04", to: "2025-08-07" }
        },
    ],
    "To Do": [
        {
            id: "task-c",
            title: "Configure VLANs on switches",
            content: `
                <ul>
                    <li>Set up VLANs for department separation</li>
                    <li>Improve network security</li>
                </ul>
            `,
            updatedAt: new Date().toISOString(),
            column: "To Do",
            priority: "High",
            assignee: "Coki",
            dueDate: { from: "2025-08-08", to: "2025-08-10" }
        },
        {
            id: "task-d",
            title: "Install network monitoring tools",
            content: `
                <ul>
                    <li>Deploy Zabbix or Nagios</li>
                    <li>Monitor network health</li>
                </ul>
            `,
            updatedAt: new Date().toISOString(),
            column: "To Do",
            priority: "Medium",
            assignee: "Dennis",
            dueDate: { from: "2025-08-11", to: "2025-08-13" }
        },
    ],
    "In Progress": [
        {
            id: "task-e",
            title: "Troubleshoot connectivity issues",
            content: `
                <ul>
                    <li>Investigate intermittent connection drops</li>
                    <li>Resolve office connectivity problems</li>
                </ul>
            `,
            updatedAt: new Date().toISOString(),
            column: "In Progress",
            priority: "High",
            assignee: "Erfan",
            dueDate: { from: "2025-08-14", to: "2025-08-16" }
        },
    ],
    Done: [
        {
            id: "task-f",
            title: "Upgrade router firmware",
            content: `
                <ul>
                    <li>Update firmware on all core routers</li>
                    <li>Verify successful upgrade</li>
                </ul>
            `,
            updatedAt: new Date().toISOString(),
            column: "Done",
            priority: "Low",
            assignee: "Frank",
            dueDate: { from: "2025-08-17", to: "2025-08-18" }
        },
    ],
};

export default function KanbanBoard() {
    const { tasks, setTasks } = useTasks();
    const [columnOrder, setColumnOrder] = useState<ColumnType[]>(Object.keys(tasks ?? {}) as ColumnType[]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalColumn, setModalColumn] = useState<ColumnType | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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

    const handleChecklistChange = (taskId: string, checklist: Task["checklist"]) => {
        setTasks(prev => {
            const updated = { ...prev };
            for (const col of Object.keys(updated) as ColumnType[]) {
                updated[col] = updated[col].map(task =>
                    task.id === taskId ? { ...task, checklist } : task
                );
            }
            return updated;
        });
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
                    className="absolute left-1 top-1.5 z-10 flex items-center justify-center w-7 h-7 rounded bg-gray-700 hover:bg-gray-200 cursor-grab"
                    style={{ cursor: 'grab' }}
                    aria-label="Drag column"
                >
                    <GripVertical size={22} className="text-gray-400 group-hover:text-gray-900" />
                </button>
                <div className="pl-11">
                    {children}
                </div>
            </div>
        );
    }

    const activeTask = Object.values(tasks)
        .flat()
        .find((task) => task.id === activeId);

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
                    <div className="flex flex-row  gap-4 rounded-xl overflow-auto bg-gray-800 p-16 min-h-screen">
                        {columnOrder.map((column) => (
                            <SortableColumn key={column} id={column}>
                                <Column
                                    column={column}
                                    items={tasks[column]}
                                    onAddCard={handleAddCard}
                                    onTaskClick={handleTaskClick}
                                    onChecklistChange={handleChecklistChange}
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
