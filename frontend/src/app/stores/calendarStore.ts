import { create } from 'zustand';
import type { ColumnType } from '../types/types';
import toast from 'react-hot-toast';
import { fetchKanbanData } from '../api/kanbanApi';

export type CalendarEvent = {
  id: number;
  title: string;
  content: string;
  column: ColumnType;
  updatedAt?: string;
  priority?: string;
  assignee?: string;
  dueDate?: string | { from: string; to: string };
  start?: Date;
  end?: Date;
};

export type TaskByColumn = {
  [key in ColumnType]: CalendarEvent[];
};

type CalendarStoreType = {
  event: TaskByColumn;
  loadtasks: () => Promise<void>;
};

const useCalendarStore = create<CalendarStoreType>((set) => ({
  event: {
    Backlog: [],
    'To Do': [],
    'In Progress': [],
    Done: [],
  },

  loadtasks: async () => {
    try {
      const data = await fetchKanbanData();
      console.log('does the calendarstore actually working', data);
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

      set({ event: normalizedData });
      console.log(
        'if you can see this, the normalizeddata from calendarstore is working!',
        normalizedData,
      );

      return normalizedData;
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
}));

export default useCalendarStore;
