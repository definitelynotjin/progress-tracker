"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Task, ColumnType } from "./types";
import { initialTasks } from "./KanbanBoard";

type TaskContextType = {
    tasks: Record<ColumnType, Task[]>;
    setTasks: React.Dispatch<React.SetStateAction<Record<ColumnType, Task[]>>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState(initialTasks);

    useEffect(() => {
        fetch("http://localhost:8000/api/tasks")
            .then(res => res.json())
            .then(data => {
                // Transform data if needed to match your state shape
                // Example assumes API returns an array of tasks
                const grouped: Record<ColumnType, Task[]> = {
                    Backlog: [],
                    "To Do": [],
                    "In Progress": [],
                    Done: [],
                };
                data.forEach((task: Task) => {
                    grouped[task.column].push(task);
                });
                setTasks(grouped);
            })
            .catch(err => {
                console.error("Failed to fetch tasks:", err);
            });
    }, []);

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
