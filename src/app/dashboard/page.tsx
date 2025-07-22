import Dashboard from "@/app/components/dashboard/Dashboard";
import Header from "@/app/components/dashboard/Header";

export default function DashboardPage() {
    return (
        <div className="bg-gray-900 bg-repeat-round min-h-screen">
            <div className="ml-64 flex min-h-screen">
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-10 pt-6 bg-transparent">
                        <Dashboard />
                    </main>
                </div>
            </div>
        </div>
    );
}
