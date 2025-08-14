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
  loadEvents: () => Promise<TaskByColumn | void>;
};

const useCalendarStore = create<CalendarStoreType>((set) => ({
  event: {
    Backlog: [],
    'To Do': [],
    'In Progress': [],
    Done: [],
  },

  loadEvents: async () => {
    try {
      const data = await fetchKanbanData();

      console.log('is the calendarstore actually working', data);

      data.forEach((column) => {
        column.tasks.forEach((tasks) => {
          const dueDate = tasks.due_date;
          //          if (dueDate){
          //            const start = {dueDate?.from};
          // const end = {dueDate?.to};
          //          } else{
          //            const start = '',
          //            const end = '',
          //            }
        });
      });
      return data;
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
}));

export default useCalendarStore;
