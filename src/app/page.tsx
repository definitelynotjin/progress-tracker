"use client";



import KanbanBoard from "./components/kanban/KanbanBoard";

export default function Page() {
  return (
    <div className="bg-red-100 bg-repeat-round min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Progress Tracker</h1>
      <KanbanBoard />
    </div>
  );
}
