
'use client';
import React, { createContext, useContext, useState } from "react";

import { Task } from "./types";
import { COLUMN_TYPES } from "./kanbanConfig";

export type KanbanTasks = Record<typeof COLUMN_TYPES[number], Task[]>;

const initialTasks: KanbanTasks = {
    Backlog: [],
    "To Do": [],
    "In Progress": [],
    Done: [],
};

type KanbanContextType = {
    tasks: KanbanTasks;
    setTasks: React.Dispatch<React.SetStateAction<KanbanTasks>>;
};

const KanbanContext = createContext<KanbanContextType>({
    tasks: initialTasks,
    setTasks: () => { },
});

export function KanbanProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<KanbanTasks>(initialTasks);
    return (
        <KanbanContext.Provider value={{ tasks, setTasks }}>
            {children}
        </KanbanContext.Provider>
    );
}

export function useKanban() {
    return useContext(KanbanContext);
}
