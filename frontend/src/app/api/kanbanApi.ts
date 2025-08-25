import { Task } from '../types/types';

const columnToIdMap: Record<string, number> = {
	Backlog: 1,
	'To Do': 2,
	'In Progress': 3,
	Done: 4,
};

const API_URL = 'http://127.0.0.1:8000';

export async function fetchKanbanData() {
	const response = await fetch('/api/kanban');
	if (!response.ok) throw new Error('Failed to fetch kanban data');
	const data = await response.json();
	return data;
}

export async function updateTaskAPI(task: Task) {
	const taskForBackend = {
		...task,
		board_column_id: columnToIdMap[task.column],
	};

	const res = await fetch(`${API_URL}/api/tasks/${task.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(taskForBackend),
	});
	if (!res.ok) throw new Error('Failed to update kanban data');
	return await res.json();
}

export async function addTaskAPI(task: Omit<Task, 'id'>) {
	const taskForBackend = {
		...task,
		board_column_id: columnToIdMap[task.column],
	};
	const res = await fetch('api/tasks', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(taskForBackend),
	});
	if (!res.ok) throw new Error('Failed to add a new kanban task');
	return await res.json();
}

export async function deleteTaskAPI(id: number) {
	const res = await fetch(`api/tasks/${id}`, { method: 'DELETE' });
	if (!res.ok) throw new Error('Failed to delete kanban data');
	return await res.json();
}
