"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./calendar.module.css";
import { text } from "stream/consumers";
import { color } from "framer-motion";


type CalendarProps = {
    tasks?: Record<string, any[]>; // Use your actual Task/ColumnType types if available
};

export default function Calendar({ tasks }: CalendarProps) {
    if (!tasks) return null; // or show a loading/error state

    const columnColors: Record<string, string> = {
        Backlog: "#BFDBFE",
        "To Do": "#E9D5FF",
        "In Progress": "#99F6E4",
        Done: "#D9F99D"
    }

    const allTasks = Object.values(tasks).flat();
    const events = allTasks.map(task => ({
        title: task.title,
        textColor: "#1e293b", // your desired text color (e.g., slate-800)
        start: task.dueDate?.from,
        end: task.dueDate?.to,
        ...task,
        color: columnColors[task.column] || "#888888", // fallback color
    }));

    return (
        <div className="flex flex-row gap-4 rounded-xl overflow-auto bg-gray-800 p-8 min-h-screen">
            <div className={`flex flex-row gap-4 rounded-xl overflow-auto bg-gray-100 p-8 min-h-screen ${styles.calendarWrapper || ''}`}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={(info) => {
                        alert(`Clicked: ${info.event.title}`);
                    }}
                    editable={true}
                    selectable={true}
                    height="auto"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth',
                    }}
                />
            </div>
        </div>
    );

}
