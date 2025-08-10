// components/KanbanBoardWrapper.tsx
// this is where the kanban board gets its data

import ClientKanbanBoard from './ClientKanbanBoard';
import { KanbanTasks } from './KanbanContext';

export default async function KanbanBoardWrapper() {
    const res = await fetch('http://127.0.0.1:8000/api/kanban', {
        cache: 'no-store', // so it fetches fresh data every time
    });
    const data = await res.json();

    const grouped: KanbanTasks = {
        Backlog: [],
        'To Do': [],
        'In Progress': [],
        Done: [],
    };

    data.forEach((col: { name: keyof KanbanTasks; tasks: any[] }) => {
        grouped[col.name] = col.tasks;
    });

    return <ClientKanbanBoard initialTasks={grouped} />;
}
