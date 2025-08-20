import { create } from 'zustand';
import type { boardType, ColumnType, Task } from '../types/types';
import {
	addTaskAPI,
	deleteTaskAPI,
	fetchKanbanData,
	updateTaskAPI,
} from '../api/kanbanApi';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

type TaskByColumn = {
	[key in ColumnType]: Task[];
};

const initialTasks: Record<ColumnType, Task[]> = {
	Backlog: [],
	'To Do': [],
	'In Progress': [],
	Done: [],
};

const useBoardStore = create<boardType>((set, get) => ({
	tasks: initialTasks,

	loadTasks: async () => {
		try {
			const data = await fetchKanbanData();

			const normalizedData: TaskByColumn = {
				Backlog: [],
				'To Do': [],
				'In Progress': [],
				Done: [],
			};
			const idToColumnMap: Record<number, ColumnType> = {
				1: 'Backlog',
				2: 'To Do',
				3: 'In Progress',
				4: 'Done',
			};
			data.forEach((column) => {
				column.tasks.forEach((task) => {
					const columnName = idToColumnMap[task.board_column_id];
					const dueDate = task.due_date
						? { from: task.due_date.from, to: task.due_date.to }
						: undefined;
					normalizedData[columnName].push({
						...task,
						column: columnName,
						dueDate,
					});
				});
			});
			// console.log('boardstore wee wee', normalizedData);
			set({ tasks: normalizedData });
		} catch (e) {
			toast.error((e as Error).message);
		}
	},
	newTask: async (task: Omit<Task, 'id'>) => {
		// initializing a const for the temp id
		const tempId = uuidv4();
		// a new array with all previous tasks thingy, and having the id a temporary one
		const optimisticTask = {
			...task,
			id: tempId,
			column: task.column,
		};
		// setting / merging the previous state of the tasks, with a new one that has the task.column as its way of identifiying it, and then including the optimistictask with temp id in it
		set((prev) => ({
			tasks: {
				...prev.tasks,
				[task.column]: [...prev.tasks[task.column], optimisticTask],
			},
		}));
		// rollback for the optimistic update so that if the backend fails, the ui would show the previous state of the tasks before a new one was being added
		try {
			const savedTask = await addTaskAPI(task);
			set((prev) => ({
				tasks: {
					...prev.tasks,
					[savedTask.column]: prev.tasks[savedTask.column].map((task) =>
						task.id === tempId ? { ...savedTask, column: task.column } : task,
					),
				},
			}));
		} catch (e) {
			toast.error((e as Error).message);
			set((prev) => ({
				tasks: {
					...prev.tasks,
					[task.column]: prev.tasks[task.column].filter(
						(task) => task.id !== tempId,
					),
				},
			}));
		}
	},

	updateTask: async (task: Task) => {
		const prevTasks = get().tasks;

		console.log('boardstore update task :', task);
		console.log('boardstore previous task :', prevTasks);

		if (!prevTasks[task.column]) {
			console.error(`Column "${task.column}" does not exist in tasks`);
			toast.error(`Cannot update task: invalid column "${task.column}"`);
			return;
		}

		set((prev) => ({
			tasks: {
				...prev.tasks,
				[task.column]: prev.tasks[task.column].map((t) =>
					t.id === task.id ? task : t,
				),
			},
		}));
		const columnToIdMap: Record<string, number> = {
			Backlog: 1,
			'To Do': 2,
			'In Progress': 3,
			Done: 4,
		};

		type TaskAPIUpdate = Omit<Task, 'board_column_id'> & {
			board_column_id: number;
		};
		try {
			const res = await updateTaskAPI({
				...task,
				board_column_id: columnToIdMap[task.column],
			} as TaskAPIUpdate);
			console.log('it succee', res);
		} catch (e) {
			set({ tasks: prevTasks });
		}
	},

	deleteTask: async (id: number) => {
		const prevTasks = get().tasks;

		const tasktoDelete = Object.fromEntries(
			Object.entries(prevTasks).map(([col, tasks]) => [
				col,
				tasks.filter((task) => task.id !== id),
			]),
		) as TaskByColumn;

		set({ tasks: tasktoDelete });
		try {
			await deleteTaskAPI(id);
		} catch (e) {
			toast.error('Failed to delete task');
			set({ tasks: prevTasks });
		}
	},
}));
export default useBoardStore;
