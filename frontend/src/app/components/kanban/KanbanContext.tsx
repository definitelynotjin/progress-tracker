'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from './types';
import { COLUMN_TYPES } from './kanbanConfig';

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

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<KanbanTasks>(initialTasks);

  useEffect(() => {
    fetch('http://localhost:8000/api/kanban')
      .then((res) => res.json())
      .then((data) => {
        const grouped: KanbanTasks = {
          Backlog: [],
          'To Do': [],
          'In Progress': [],
          Done: [],
        };
        data.forEach((col: { name: keyof KanbanTasks; tasks: Task[] }) => {
          grouped[col.name] = col.tasks;
        });
        setTasks(grouped);
      })
      .catch(() => setTasks(initialTasks));
  }, []);

  async function updateTask(updatedTask: Task) {
    // Update locally
    setTasks((prev) => {
      const columnTasks = prev[updatedTask.column] ?? [];
      return {
        ...prev,
        [updatedTask.column]: columnTasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t,
        ),
      };
    });

    // Then send update to backend
    await fetch(`http://localhost:8000/api/tasks/${updatedTask.id}`, {
      method: 'PUT', // or PATCH depending on your API
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
  }

  async function addTask(column: keyof KanbanTasks, newTask: Task) {
    // Update locally
    setTasks((prev) => ({
      ...prev,
      [column]: [...(prev[column] ?? []), newTask],
    }));

    // Save to backend
    await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
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
