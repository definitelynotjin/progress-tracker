import KanbanBoard from "@/app/components/kanban/KanbanBoard";
import Sidebar from "@/app/sidebar";
import Header from "@/app/components/kanban/Header";

export default function KanbanPage() {
    return (
        <div className="bg-cyan-900 bg-repeat-round min-h-screen">
            <Sidebar />
            <div className="ml-64 flex min-h-screen">
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-10 bg-transparent">
                        {/* <span className="text-1xl font-bold text-blue-400">Kanban Board</span> */}
                        <KanbanBoard />
                    </main>
                </div>
            </div>
        </div>
    );
}
