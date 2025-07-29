"use client";

import React, { createContext, useContext, useState } from "react";
import type { Task, ColumnType } from "./types";
import { initialTasks } from "./KanbanBoard";

type TaskContextType = {
    tasks: Record<ColumnType, Task[]>;
    setTasks: React.Dispatch<React.SetStateAction<Record<ColumnType, Task[]>>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState(initialTasks);
    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
};
