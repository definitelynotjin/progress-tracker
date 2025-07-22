import ClientKanbanBoard from "./components/kanban/ClientKanbanBoard";

import Sidebar from "./sidebar";

export default function Page() {
  return (
    <div className="bg-gray-900 bg-repeat-round min-h-screen">
      <Sidebar />
      <div className="ml-64 flex min-h-screen">
        <div className="flex-1 flex flex-col">
          <div className="h-20 flex p-8 items-center justify-left bg-gray-700 mb-6 py-8">
            <h1 className="text-3xl font-bold text-red-400 text-center">
              Project 2
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
