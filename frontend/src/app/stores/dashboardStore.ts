import { create } from "zustand";
import { fetchKanbanData } from "../api/kanbanApi";
import type { ColumnType, Task } from "../types/types";
import toast from "react-hot-toast";

type TaskByColumn = {
  [key in ColumnType]: Task[];
};

interface DashboardStore {
  tasks: TaskByColumn;
  loadTasks: () => Promise<TaskByColumn | void>;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  tasks: {
    Backlog: [],
    "To Do": [],
    "In Progress": [],
    Done: [],
  },

  loadTasks: async () => {
    try {
      const data = await fetchKanbanData();
      // console.log('if you can see this , the dashboardstore is working', data);

      const normalizedData: TaskByColumn = {
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
          const ColumnName = idToColumnMap[task.board_column_id];
          const dueDate = task.due_date;

          let dueDateString;
          if (dueDate) {
            dueDateString = dueDate.from + "-" + dueDate.to;
          } else {
            dueDateString = "";
          }
          const smallTask = {
            id: task.id,
            title: task.title,
            column: ColumnName,
            priority: task.priority,
            assignee: task.assignee,
            dueDate: dueDateString,
          };

          normalizedData[ColumnName].push(smallTask);
        });
      });
      set({ tasks: normalizedData });
      return normalizedData;
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
}));

export default useDashboardStore;
