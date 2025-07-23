import KanbanBoard from "@/app/components/kanban/KanbanBoard";
import Sidebar from "@/app/sidebar";
import Header from "@/app/components/kanban/Header";
import KanbanHeaderBar from "@/app/components/kanban/KanbanHeaderBar";

export default function KanbanPage() {
    return (
        <div className="bg-cyan-900 bg-repeat-round min-h-screen">
            <Sidebar />
            <div className="ml-64 flex min-h-screen">
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-10 bg-gray-900">
                        <KanbanHeaderBar />
                        <KanbanBoard />
                    </main>
                </div>
            </div>
        </div>
    );
}
