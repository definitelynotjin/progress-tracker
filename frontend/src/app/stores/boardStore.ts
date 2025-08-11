import { create } from 'zustand';
import { boardType, Task } from '../types/types';
import { fetchKanbanData } from '../api/kanbanApi';

const useBoardStore = create<boardType>((set) => ({
  tasks: [],

  loadTasks: async () => {
    try {
      const data = await fetchKanbanData();
      console.log(JSON.stringify(data, null, 2));

      set({ tasks: data });
    } catch (e) {
      return (e as Error).message;
    }
  },

  newTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, id: Date.now() }],
    })),

  updateTask: (updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),

  deleteTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useBoardStore;
