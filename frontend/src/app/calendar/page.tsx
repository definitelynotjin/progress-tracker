"use client";

import Sidebar from "@/app/sidebar";
import Header from "@/app/components/calendar/Header";
import CalendarHeaderBar from "@/app/components/calendar/CalendarHeaderBar";
import BigCalendar from "../components/calendar/BigCalendar";
import { useTasks } from "@/app/components/kanban/TaskContext";

export default function CalendarPage() {
    const { tasks } = useTasks();

    return (
        <div className="bg-repeat-round min-h-screen relative">
            <Sidebar className="sidebar" />
            <div className="content min-h-screen ml-16">
                <Header />
                <main className="p-10 bg-gray-900">
                    <CalendarHeaderBar />
                    <BigCalendar tasks={tasks} />
                </main>
            </div>
        </div>
    );
}
