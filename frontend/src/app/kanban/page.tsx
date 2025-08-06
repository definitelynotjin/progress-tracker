import KanbanBoard from '@/app/components/kanban/KanbanBoard';
import KanbanBoardWrapper from '../components/kanban/KanbanBoardWrapper';
import Sidebar from '@/app/sidebar';
import Header from '@/app/components/kanban/Header';
import KanbanHeaderBar from '@/app/components/kanban/KanbanHeaderBar';

export default function KanbanPage() {
  return (
    <div className="bg-repeat-round min-h-screen relative">
      <Sidebar className="sidebar" />
      <div className="content min-h-screen">
        <Header />
        <main className="p-10 bg-gray-900">
          <KanbanHeaderBar />
          <KanbanBoardWrapper />
        </main>
      </div>
    </div>
  );
}
