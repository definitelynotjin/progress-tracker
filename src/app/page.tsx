import ClientKanbanBoard from "./components/kanban/ClientKanbanBoard";

export default function Page() {
  return (
    <div className="bg-gray-500 bg-repeat-round min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white ">Progress Tracker</h1>
      <ClientKanbanBoard />
    </div>
  );
}
