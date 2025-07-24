import KanbanBoard from "@/app/components/kanban/KanbanBoard";
import Sidebar from "@/app/sidebar";
import Header from "@/app/components/kanban/Header";
import KanbanHeaderBar from "@/app/components/kanban/KanbanHeaderBar";

export default function KanbanPage() {
    return (
        <div className="bg-cyan-900 bg-repeat-round min-h-screen flex relative">
            <Sidebar className="sidebar" />
            <div className="content flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-10 bg-gray-900">
                    <KanbanHeaderBar />
                    <KanbanBoard />
                </main>
            </div>
        </div>
    );
}
