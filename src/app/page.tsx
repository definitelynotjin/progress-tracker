import ClientKanbanBoard from "./components/kanban/ClientKanbanBoard";

import Sidebar from "./sidebar";

export default function Page() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-repeat-round">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="h-48 flex items-center justify-center bg-gray-700 mb-6 py-8">
            <h1 className="text-3xl font-bold text-red-200 text-center">
              Progress Tracker
            </h1>
          </div>
          <main className="flex-1 p-10 pt-6 bg-transparent">
            <ClientKanbanBoard />
          </main>
        </div>
      </div>
    </div>
  );
}
