import Dashboard from "@/app/components/dashboard/Dashboard";
import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/sidebar";

export default function DashboardPage() {
    return (
        <div className="relative group min-h-screen bg-red-900 bg-repeat-round">
            <Sidebar className="sidebar" />
            <div className="content ml-16 group-hover:ml-48 transition-all duration-200 flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-10 pt-6 bg-transparent">
                    <Dashboard />
                </main>
            </div>
        </div>
    );
}
