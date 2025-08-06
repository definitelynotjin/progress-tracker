// app/(board)/kanban/kanbanApi.ts
import { Task } from './types';

const columnToIdMap: Record<string, number> = {
  Backlog: 1,
  'To Do': 2,
  'In Progress': 3,
  Done: 4,
};

export async function fetchKanbanData() {
  const res = await fetch('http://localhost:8000/api/kanban');
  if (!res.ok) throw new Error('Failed to fetch kanban data');
  const data = await res.json();
  return data;
}

export async function updateTaskAPI(task: Task) {
  const taskForBackend = {
    ...task,
    board_column_id: columnToIdMap[task.column],
  };

  return await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
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

  return await fetch('http://localhost:8000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskForBackend),
  });
}
