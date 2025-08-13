import { create } from 'zustand';
import type { boardType, ColumnType, Task } from '../types/types';
import { fetchKanbanData } from '../api/kanbanApi';
import toast from 'react-hot-toast';

type TaskByColumn = {
  [key in ColumnType]: Task[];
};

const useBoardStore = create<boardType>((set) => ({
  tasks: {
    Backlog: [],
    'To Do': [],
    'In Progress': [],
    Done: [],
  },

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
          normalizedData[columnName].push(task);
        });
      });
      // console.log('boardstore wee wee', normalizedData);
      set({ tasks: normalizedData });
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
}));

export default useBoardStore;
