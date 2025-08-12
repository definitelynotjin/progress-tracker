// app/(board)/kanban/kanbanApi.ts
// this is where the dashboard gets its data
import { Task } from '../types/types';

const columnToIdMap: Record<string, number> = {
  Backlog: 1,
  'To Do': 2,
  'In Progress': 3,
  Done: 4,
};

const BASE_URL = 'http://127.0.0.1:8000/api/kanban';

export async function fetchKanbanData() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch kanban data');
  const data = await response.json();
  // console.log(JSON.stringify(data, null, 2));
  // console.log('if you can see this, the kanbanapi is working', data);
}

export async function updateTaskAPI(task: Task) {
  const taskForBackend = {
    ...task,
    board_column_id: columnToIdMap[task.column],
  };

  return await fetch(`${BASE_URL}/${task.id}`, {
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

  return await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskForBackend),
  });
}
