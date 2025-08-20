"use client";

import CalendarHeaderBar from "@/app/components/calendar/CalendarHeaderBar";
import Header from "@/app/components/calendar/Header";
import Sidebar from "@/app/sidebar";
import BigCalendar from "../components/calendar/BigCalendar";

export default function CalendarPage() {
  return (
    <div className="bg-repeat-round min-h-screen relative">
      <Sidebar className="sidebar" />
      <div className="content min-h-screen ml-16">
        <Header />
        <main className="p-10 bg-gray-900">
          <CalendarHeaderBar />
          <BigCalendar />
        </main>
      </div>
    </div>
  );
}
