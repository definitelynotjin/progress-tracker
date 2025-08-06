'use client';

import { KanbanProvider } from './KanbanContext';
import KanbanBoard from './KanbanBoard';
import { KanbanTasks } from './KanbanContext';

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
