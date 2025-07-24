import Dashboard from "@/app/components/dashboard/Dashboard";
import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/sidebar";

export default function DashboardPage() {
    return (
        <div className="bg-red-900 bg-repeat-round min-h-screen flex relative">
            <Sidebar className="sidebar" />
            <div className="content flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-10 pt-6 bg-transparent">
                    <Dashboard />
                </main>
            </div>
        </div>
    );
}
