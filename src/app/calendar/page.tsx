
import Sidebar from "@/app/sidebar";
import Header from "@/app/components/calendar/Header";
import CalendarHeaderBar from "@/app/components/calendar/CalendarHeaderBar";
import Calendar from "../components/calendar/Calendar";

export default function CalendarPage() {
    return (
        <div className="bg-repeat-round min-h-screen relative">
            <Sidebar className="sidebar" />
            <div className="content min-h-screen ml-16">
                <Header />
                <main className="p-10 bg-gray-900">
                    <CalendarHeaderBar />
                    <Calendar />
                </main>
            </div>
        </div>
    );
}
