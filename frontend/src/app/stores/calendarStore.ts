import { create } from "zustand";
import type { ColumnType } from "../types/types";
import toast from "react-hot-toast";
import { fetchKanbanData } from "../api/kanbanApi";

export type CalendarEvent = {
  id: number;
  title: string;
  content: string;
  column: ColumnType;
  updatedAt?: string;
  priority?: string;
  assignee?: string;
  dueDate?: { from: string; to: string };
  start?: Date;
  end?: Date;
};

export type EventByColumn = {
  [key in ColumnType]: CalendarEvent[];
};

type CalendarStoreType = {
  event: EventByColumn;
  loadEvents: () => Promise<EventByColumn | void>;
};

const useCalendarStore = create<CalendarStoreType>((set) => ({
  event: {
    Backlog: [],
    "To Do": [],
    "In Progress": [],
    Done: [],
  },

  loadEvents: async () => {
    try {
      const data = await fetchKanbanData();
      const normalizedData: EventByColumn = {
        Backlog: [],
        "To Do": [],
        "In Progress": [],
        Done: [],
      };
      const idToColumnMap: Record<number, ColumnType> = {
        1: "Backlog",
        2: "To Do",
        3: "In Progress",
        4: "Done",
      };

      data.forEach((column) => {
        column.tasks.forEach((task) => {
          const dueDate = task.due_date;
          const ColumnName = idToColumnMap[task.board_column_id];
          let start;
          let end;
          if (dueDate) {
            start = new Date(dueDate.from);
            end = new Date(dueDate.to);
          }
          const calendarEvent = {
            title: task.title,
            assignee: task.assignee,
            start,
            end,
            content: task.content,
            column: ColumnName,
            priority: task.priority,
          };
          normalizedData[ColumnName].push(calendarEvent);
        });
      });
      set({ event: normalizedData });
      return normalizedData;
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
}));

export default useCalendarStore;
