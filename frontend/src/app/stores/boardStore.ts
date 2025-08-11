import { create } from 'zustand';
import { boardType, Task } from '../types/types';

const useBoardStore = create<boardType>((set) => ({
  tasks: [],

  newTask: async (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, id: Date.now() }],
    })),

  updateTask: async (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),

  deleteTask: async (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useBoardStore;
