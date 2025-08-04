"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Task, ColumnType, AssigneeType } from "./types";
import { initialTasks } from "./KanbanBoard";

type TaskContextType = {
    tasks: Record<ColumnType, Task[]>;
    setTasks: React.Dispatch<React.SetStateAction<Record<ColumnType, Task[]>>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Record<ColumnType, Task[]>>({
        Backlog: [],
        "To Do": [],
        "In Progress": [],
        Done: [],
    });

    // Hydrate initialTasks on client only, and generate checklists client-side
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("./TaskCard").then(({ extractChecklistFromHTML }) => {
                const hydrated: Record<ColumnType, Task[]> = {
                    Backlog: [],
                    "To Do": [],
                    "In Progress": [],
                    Done: [],
                };
                for (const col of Object.keys(initialTasks) as ColumnType[]) {
                    hydrated[col] = initialTasks[col].map(task => ({
                        ...task,
                        checklist: extractChecklistFromHTML(task.content || "")
                    }));
                }
                setTasks(hydrated);
            });
        }
    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:8000/api/tasks")
    //         .then(res => res.json())
    //         .then(data => {
    //             if (Array.isArray(data) && data.length > 0) {
    //                 const grouped: Record<ColumnType, Task[]> = {
    //                     Backlog: [],
    //                     "To Do": [],
    //                     "In Progress": [],
    //                     Done: [],
    //                 };
    //                 data.forEach((task: Task) => {
    //                     grouped[task.column].push(task);
    //                 });
    //                 setTasks(grouped);
    //             } else {
    //                 // Fallback to mock data
    //                 setTasks(initialTasks);
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Failed to fetch tasks:", err);
    //             setTasks(initialTasks); // Fallback on error
    //         });
    // }, []);

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
