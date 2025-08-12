// components/KanbanBoardWrapper.tsx
// this is where the kanban board gets its data
import ClientKanbanBoard from './ClientKanbanBoard';
import KanbanBoard from './KanbanBoard';
// import { KanbanTasks } from './KanbanContext';

export default async function KanbanBoardWrapper() {
  return <KanbanBoard />;
}
