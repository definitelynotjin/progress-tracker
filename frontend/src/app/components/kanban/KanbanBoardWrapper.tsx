// components/KanbanBoardWrapper.tsx
// this is where the kanban board gets its data
import ClientKanbanBoard from './ClientKanbanBoard';
// import { KanbanTasks } from './KanbanContext';

export default async function KanbanBoardWrapper() {
  return <ClientKanbanBoard initialTasks />;
}
