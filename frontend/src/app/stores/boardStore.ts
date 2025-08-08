import { create } from 'zustand';


type Task = {
    id: number;
    board_column_id: number;
    title: string;
    content: string;
    priority: string;
    assignee: string;
    due_date: {
        from: string;
        to: string;
    }
    order: number;
};

const useBoardStore = create((set) => ({

    tasks: [],




    newTask: (task) => {

    },

    updateTask: {

    },


}));

export default useBoardStore;
