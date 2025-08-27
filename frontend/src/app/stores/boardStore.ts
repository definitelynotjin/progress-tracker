import { create } from 'zustand';
import type { boardType, ColumnType, DueDateRange, Task } from '../types/types';
import {
	addTaskAPI,
	deleteTaskAPI,
	fetchKanbanData,
	updateTaskAPI,
} from '../api/kanbanApi';
import { v4 as uuidv4 } from 'uuid';
import { immer } from 'zustand/middleware/immer';

type TaskByColumn = {
	[key in ColumnType]: Task[];
};

const initialTasks: Record<ColumnType, Task[]> = {
	Backlog: [],
	'To Do': [],
	'In Progress': [],
	Done: [],
};

const useBoardStore = create<boardType>()(
	immer((set, get) => ({
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
				data.forEach((column: object) => {
					column.tasks.forEach((task) => {
						const columnName = idToColumnMap[task.board_column_id];
						const dueDate: DueDateRange | undefined = task.due_date
							? {
									from: new Date(task.due_date.from),
									to: new Date(task.due_date.to),
								}
							: undefined;
						normalizedData[columnName].push({
							...task,
							column: columnName,
							dueDate,
						});
					});
				});
				set({ tasks: normalizedData });
			} catch (e) {
				console.error((e as Error).message);
			}
		},
		newTask: async (task: Omit<Task, 'id'>) => {
			// const prevTasks = get().tasks;
			const tempId = uuidv4();
			const optimisticTask = {
				...task,
				id: tempId,
				column: task.column,
			};
			set((state) => {
				state.tasks[task.column].push(optimisticTask);
			});

			// set({ tasks: prevTasks });

			try {
				const savedTask = await addTaskAPI(task);

				set((state) => {
					const index = state.tasks[task.column].findIndex(
						(t) => t.id === tempId,
					);
					if (index !== -1) state.tasks[task.column][index] = savedTask;
				});
			} catch (e) {
				console.error('sorry big bro, it failed');
				set((state) => {
					state.tasks[task.column] = state.tasks[task.column].filter(
						(t) => t.id !== tempId,
					);
				});
			}
		},

		updateTask: async (task: Task) => {
			const prevTasks = get().tasks;
			console.log('boardstore previous task :', prevTasks);
			if (!prevTasks[task.column]) {
				return;
			}
			set((state) => {
				const col = state.tasks[task.column];
				const index = col.findIndex((t) => t.id === task.id);
				if (index !== -1) col[index] = task;
			});
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
					due_date: task.dueDate,
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
				await deleteTaskAPI(Number(id));
			} catch (e) {
				set({ tasks: prevTasks });
			}
		},

		setTasks: (updater: (prev: TaskByColumn) => TaskByColumn) => {
			set((state) => {
				state.tasks = updater(state.tasks);
			});
		},
	})),
);
export default useBoardStore;
