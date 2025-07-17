"use client";

import KanbanBoard from "./components/KanbanBoard";

export default function Page() {
  return (
    <div className="bg-red-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Progress Tracker</h1>
      <KanbanBoard />
    </div>
  );
}
