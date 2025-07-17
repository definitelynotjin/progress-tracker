import KanbanBoard from './components/KanbanBoard';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center py-6">📋 Progress Tracker</h1>
      <KanbanBoard />
    </div>
  );
}
