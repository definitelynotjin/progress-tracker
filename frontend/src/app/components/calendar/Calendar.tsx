'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import styles from './calendar.module.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useStyleTodayCell } from './useStyleTodayCell';

type CalendarProps = {
  tasks?: Record<string, any[]>;
};

export default function Calendar({ tasks }: CalendarProps) {
  useStyleTodayCell();

  const columnColors: Record<string, string> = {
    Backlog: '#BFDBFE',
    'To Do': '#E9D5FF',
    'In Progress': '#99F6E4',
    Done: '#D9F99D',
  };

  const allTasks = Object.values(tasks).flat();
  const events = allTasks.map((task) => ({
    outerHeight: 15,
    title: task.title,
    textColor: '#1e293b',
    start: task.dueDate?.from,
    end: task.dueDate?.to,
    ...task,
    color: columnColors[task.column] || '#888888',
  }));

  function formatDate(dateStr?: string) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
  }

  // Custom event content: render the bar with Tippy, color, etc.
  function renderEventContent(arg: any) {
    const task = arg.event.extendedProps;
    const columnColors: Record<string, string> = {
      Backlog: '#BFDBFE',
      'To Do': '#E9D5FF',
      'In Progress': '#99F6E4',
      Done: '#D9F99D',
    };
    return (
      <Tippy
        content={
          <div className="p-2 text-left max-w-xs bg-gray-100 text-white rounded">
            <div>
              <strong>Assignee:</strong> {task.assignee}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <strong>Column:</strong>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background: columnColors[task.column] || '#888',
                  color: '#1e293b',
                }}
              >
                {task.column}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <strong>Priority:</strong>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background:
                    task.priority === 'High'
                      ? '#f87171'
                      : task.priority === 'Medium'
                      ? '#fbbf24'
                      : '#6ee7b7',
                  color: '#1e293b',
                }}
              >
                {task.priority}
              </span>
            </div>
            <div>
              <strong>Due:</strong> {formatDate(task.dueDate?.from)} -{' '}
              {formatDate(task.dueDate?.to)}
            </div>
            <div>
              <strong>Tasks:</strong>{' '}
              <span dangerouslySetInnerHTML={{ __html: task.content }} />
            </div>
          </div>
        }
        interactive={true}
        placement="top"
        arrow={true}
        appendTo={document.body}
        zIndex={99999}
      >
        <span
          className={`px-1 py-0.5 text-xs truncate font-semibold min-h-[200px] fc-custom-bar`}
          style={{
            background: columnColors[task.column] || '#888',
            color: '#1e293b',
            borderRadius: '1rem',
            border: '10px solid #fff',
            boxSizing: 'border-box',
            display: 'block',
            position: 'relative',
            left: '-8px',
            right: '-8px',
            width: 'auto',
            minWidth: 'calc(20% + 16px)',
            overflow: 'visible',
            pointerEvents: 'auto',
          }}
        >
          {arg.event.title}
        </span>
      </Tippy>
    );
  }

  return (
    <div className="flex flex-row gap-4 rounded-xl overflow-auto bg-gray-100 p-8 min-h-screen">
      <div
        className={`flex flex-row gap-4 rounded-xl overflow-auto bg-gray-300 p-8 ${
          styles.calendarWrapper || ''
        }`}
        style={{ height: '800px', minHeight: '900px' }} // Set a tall container for squarer cells
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          selectable={true}
          height={800} // Set calendar height for squarer cells
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
        />
      </div>
    </div>
  );
}
