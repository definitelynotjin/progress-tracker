// app/(board)/kanban/kanbanApi.ts
import { id } from "date-fns/locale";
import { Task } from './types';
import React from 'react';

const columnToIdMap: Record<string, number> = {
  Backlog: 1,
  'To Do': 2,
  'In Progress': 3,
  Done: 4,
};

export async function fetchKanbanData() {
  const res = await fetch('http://127.0.0.1:8000/api/kanban');
  if (!res.ok) throw new Error('Failed to fetch kanban data');
  const data = await res.json();

  const normalizedData ={
    Backlog: [],
    "To Do": [],
    "In Progress": [],
    Done: [],

  }
  const idToColumnMap ={
        1: "Backlog",
        2: "To Do",
        3: "In Progress",
        4: "Done",
    };


    data.forEach((column) =>{
        column.tasks.forEach((task) =>{

        const ColumnName = idToColumnMap[task.board_column_id];

        const smallTask ={
            title: task.title,
            column:ColumnName,
            priority: task.priority,
            assignee: task.assignee,
            dueDate: task.dueDate,
        }
        normalizedData[ColumnName].push(smallTask);
    })
});

console.log('here it is', normalizedData);
  return normalizedData;
}

export async function updateTaskAPI(task: Task) {
  const taskForBackend = {
    ...task,
    board_column_id: columnToIdMap[task.column],
  };

  return await fetch(`http://127.0.0.1/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskForBackend),
  });
}

export async function addTaskAPI(task: Task) {
  const taskForBackend = {
    ...task,
    board_column_id: columnToIdMap[task.column],
  };

  return await fetch('http://127.0.0.1/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskForBackend),
  });
}
