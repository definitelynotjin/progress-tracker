import ClientKanbanBoard from "./components/kanban/ClientKanbanBoard";

import Sidebar from "./sidebar";

export default function Page() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-repeat-round p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-white ">
        Progress Tracker
      </h1>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 p-6 bg-transparent">
          <ClientKanbanBoard />
        </main>
      </div>
    </div>
  );
}
