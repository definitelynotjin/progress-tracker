'use client';

import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { addTaskAPI, updateTaskAPI } from './kanbanApi';
import { COLUMN_TYPES } from './kanbanConfig';
import { Task } from './types';

export type KanbanTasks = Record<(typeof COLUMN_TYPES)[number], Task[]>;

const initialTasks: KanbanTasks = {
    Backlog: [],
    'To Do': [],
    'In Progress': [],
    Done: [],
};

type KanbanContextType = {
    tasks: KanbanTasks;
    setTasks: React.Dispatch<React.SetStateAction<KanbanTasks>>;
    updateTask: (updatedTask: Task) => Promise<void>;
    addTask: (column: keyof KanbanTasks, newTask: Task) => Promise<void>;
};

export const KanbanContext = createContext<KanbanContextType>({
    tasks: initialTasks,
    setTasks: () => {},
    updateTask: async () => {},
    addTask: async () => {},
});

export function KanbanProvider({
    children,
    initialTasks: incomingTasks,
}: {
    children: React.ReactNode;
    initialTasks: KanbanTasks;
}) {
    const [tasks, setTasks] = useState<KanbanTasks>(incomingTasks);

    async function updateTask(updatedTask: Task) {
        setTasks((prev) => {
            const columnTasks = prev[updatedTask.column] ?? [];
            return {
                ...prev,
                [updatedTask.column]: columnTasks.map((t) =>
                    t.id === updatedTask.id ? updatedTask : t,
                ),
            };
        });

        try {
            await updateTaskAPI(updatedTask);
        } catch (error) {
            toast.error('failed to update task');
        }
    }

    async function addTask(column: keyof KanbanTasks, newTask: Task) {
        // Update locally
        setTasks((prev) => ({
            ...prev,
            [column]: [...(prev[column] ?? []), newTask],
        }));

        try {
            await addTaskAPI(newTask);
        } catch (error) {
            toast.error('failed to add new task');
        }
    }
    return (
        <KanbanContext.Provider value={{ tasks, setTasks, updateTask, addTask }}>
            {children}
        </KanbanContext.Provider>
    );
}

export function useKanban() {
    return useContext(KanbanContext);
}
