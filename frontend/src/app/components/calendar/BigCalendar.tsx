import Tippy from '@tippyjs/react';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'tippy.js/dist/tippy.css';
import { KanbanTasks } from '../kanban/KanbanContext';
import styles from './calendar.module.css';
import CustomWeekView from './CustomWeekView';

const localizer = momentLocalizer(moment);

const columnColors = {
  Backlog: '#BFDBFE',
  'To Do': '#E9D5FF',
  'In Progress': '#99F6E4',
  Done: '#D9F99D',
};

interface Task {
  id: string | number;
  title: string;
  dueDate: { from: string; to: string };
  assignee: string;
  column: keyof typeof columnColors;
  priority: 'High' | 'Medium' | 'Low';
  content: string;
}

interface CalendarProps {
  tasks?: KanbanTasks;
}

interface EventBarProps {
  event: Task & {
    start: Date;
    end: Date;
  };
}

export default function BigCalendar({ tasks }: CalendarProps) {
  if (!tasks) return null;
  const allTasks = Object.values(tasks).flat();
  const events = allTasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.dueDate?.from),
    end: new Date(task.dueDate?.to),
    assignee: task.assignee,
    column: task.column,
    priority: task.priority,
    content: task.content,
    dueDate: task.dueDate,
  }));

  function EventBar({ event }: EventBarProps) {
    return (
      <Tippy
        content={
          <div className="p-2 text-left max-w-xs bg-gray-800 text-white rounded">
            <div>
              <strong>Assignee:</strong> {event.assignee}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <strong>Column:</strong>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background: columnColors[event.column] || '#888',
                  color: '#1e293b',
                }}
              >
                {event.column}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <strong>Priority:</strong>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background:
                    event.priority === 'High'
                      ? '#f87171'
                      : event.priority === 'Medium'
                        ? '#fbbf24'
                        : '#6ee7b7',
                  color: '#1e293b',
                }}
              >
                {event.priority}
              </span>
            </div>
            <div>
              <strong>Due:</strong> {moment(event.start).format('DD MMM')} -{' '}
              {moment(event.end).format('DD MMM')}
            </div>
            <div>
              <strong>Tasks:</strong>{' '}
              <span dangerouslySetInnerHTML={{ __html: event.content }} />
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
          className="px-1 py-0.5 text-xs truncate font-bold"
          style={{
            background: `${columnColors[event.column]}`,
            color: '#1e293b',
            borderRadius: '5px',
            display: 'block',
            width: '100%',
            minHeight: 32,
            margin: '4px auto',
            padding: '0.5rem 1.2rem',
            fontWeight: 700,
            fontSize: '1',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
            overflow: 'visible',
            pointerEvents: 'auto',
            transition: 'box-shadow 0.2s, background 0.2s',
          }}
        >
          {event.title}
        </span>
      </Tippy>
    );
  }

  return (
    <div className="flex flex-row gap-4 rounded-xl overflow-auto bg-gray-800 p-8 min-h-screen">
      <div
        className={`flex flex-row gap-4 rounded-xl overflow-auto bg-gray-900 p-8 w-full h-full ${
          styles.calendarWrapper || ''
        }`}
        style={{ flex: 1, minWidth: 0, minHeight: 0 }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', minHeight: 600, width: '100%' }}
          views={{ month: true, week: CustomWeekView, day: true }}
          components={{
            event: EventBar,
          }}
          popup
        />
      </div>
    </div>
  );
}
