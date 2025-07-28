"use client";


import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import styles from "./calendar.module.css";

const initialEvents = [
    { id: "1", title: "Event 1", date: "2023-10-01" },
    { id: "2", title: "Event 2", date: "2023-10-02" },
    { id: "3", title: "Event 3", date: "2023-10-03" },
];



export default function Calendar() {
    const [events] = useState(initialEvents);

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
