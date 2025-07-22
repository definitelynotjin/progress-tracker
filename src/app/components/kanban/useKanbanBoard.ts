import { useState } from "react";
import { ColumnType } from "./kanbanConfig";
import { Task } from "./types";

export function useKanbanBoard(initialTasks: Record<ColumnType, Task[]>) {
    const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>(initialTasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalColumn, setModalColumn] = useState<ColumnType | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const activeTask = Object.values(tasks).flat().find((task) => task.id === activeId);

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

    return {
        tasks,
        setTasks,
        modalOpen,
        setModalOpen,
        modalColumn,
        setModalColumn,
        activeId,
        setActiveId,
        selectedTask,
        setSelectedTask,
        activeTask,
        handleAddCard,
        handleTaskClick,
        handleTaskSave,
        handleTaskCancel,
        handleModalSubmit,
    };
}
