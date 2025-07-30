"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./calendar.module.css";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


type CalendarProps = {
    tasks?: Record<string, any[]>;
};

export default function Calendar({ tasks }: CalendarProps) {
    if (!tasks) return null;

    const columnColors: Record<string, string> = {
        Backlog: "#BFDBFE",
        "To Do": "#E9D5FF",
        "In Progress": "#99F6E4",
        Done: "#D9F99D"
    }

    const allTasks = Object.values(tasks).flat();
    const events = allTasks.map(task => ({
        title: task.title,
        textColor: "#1e293b",
        start: task.dueDate?.from,
        end: task.dueDate?.to,
        ...task,
        color: columnColors[task.column] || "#888888",
    }));
    function renderEventContent(arg: any) {
        const task = arg.event.extendedProps;
        return (
            <Tippy
                key={arg.event.id || arg.event._def?.publicId || arg.event.title}
                content={
                    <div className="p-4 text-left max-w-xs">
                        <div><strong>Assignee:</strong> {task.assignee}</div>
                        <div className="flex items-center gap-2 mb-1">
                            <strong>Column:</strong>
                            <span
                                className={`px-2 py-0.5 rounded text-xs font-semibold`}
                                style={{
                                    background: columnColors[task.column] || "#888",
                                    color: "#1e293b"
                                }}
                            >
                                {task.column}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <strong>Priority:</strong>
                            <span
                                className={`px-2 py-0.5 rounded text-xs font-semibold`}
                                style={{
                                    background:
                                        task.priority === "High"
                                            ? "#f87171"
                                            : task.priority === "Medium"
                                                ? "#fbbf24"
                                                : "#6ee7b7",
                                    color: "#1e293b"
                                }}
                            >
                                {task.priority}
                            </span>
                        </div>
                        <div><strong>Due:</strong> {task.dueDate?.from} - {task.dueDate?.to}</div>
                        <div><strong>Tasks:</strong> <span dangerouslySetInnerHTML={{ __html: task.content }} /></div>
                    </div>
                }
                interactive={true}
                placement="top"
                arrow={true}
                theme="light"
                zIndex={99999}
            >
                <span
                    className="fc-custom-event"
                    style={{
                        '--fc-custom-bg': arg.event.backgroundColor || arg.event.color || arg.event.extendedProps.color,
                        '--fc-custom-color': arg.event.textColor,
                    } as React.CSSProperties}
                >
                    <span className="font-bold">{arg.event.title}</span>
                </span>
            </Tippy>
        );
    }

    // Highlight today's date
    React.useEffect(() => {
        function styleTodayCell() {
            const todayCell = document.querySelector('td.fc-day.fc-day-today');
            if (todayCell) {
                todayCell.style.background = '#1e293b';
                const dayNumber = todayCell.querySelector('.fc-daygrid-day-number');
                if (dayNumber) {
                    dayNumber.style.color = '#f3f4f6';
                    dayNumber.style.fontWeight = '700';
                    dayNumber.style.textShadow = '0 1px 2px rgba(0,0,0,0.15)';
                }
            }
        }
        styleTodayCell();
        const calendarRoot = document.querySelector('.fc');
        if (!calendarRoot) return;
        const observer = new MutationObserver(styleTodayCell);
        observer.observe(calendarRoot, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

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
                    eventContent={renderEventContent}
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
