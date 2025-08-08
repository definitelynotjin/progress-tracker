'use client';

import KanbanBoard from './KanbanBoard';
import { KanbanProvider, KanbanTasks } from './KanbanContext';

export default function ClientKanbanBoard({
    initialTasks,
}: {
    initialTasks: KanbanTasks;
}) {
    return (
        <KanbanProvider initialTasks={initialTasks}>
            <KanbanBoard />
        </KanbanProvider>
    );
}
