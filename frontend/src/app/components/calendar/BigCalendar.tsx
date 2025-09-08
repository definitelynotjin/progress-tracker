'use client';

import Tippy from '@tippyjs/react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'tippy.js/dist/tippy.css';
import styles from './calendar.module.css';
import useCalendarStore from '../../stores/calendarStore';
import 'moment/locale/en-gb';
import { remark } from 'remark';
import html from 'remark-html';

const localizer = momentLocalizer(moment);

const columnColors = {
  Backlog: '#BFDBFE',
  'To Do': '#E9D5FF',
  'In Progress': '#99F6E4',
  Done: '#D9F99D',
};

export default function BigCalendar() {
  const { loadEvents, event } = useCalendarStore();
  const allEvents = Object.values(event).flat();
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);
  console.log('here are the events', allEvents);
  function EventBar({ event }) {
    const htmlContent = remark()
      .use(html)
      .processSync(event.content)
      .toString();
    return (
      <Tippy
        content={
          <div className="p-2 text-left max-w-screen bg-gray-800 text-white rounded">
            <div className="mb-1">
              <strong>Assignee :</strong> {event.assignee}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <strong>Column :</strong>
              <span
                className="px-2 py-1/12 rounded text-xs font-semibold"
                style={{
                  background: columnColors[event.column] || '#888',
                  color: '#1e293b',
                }}
              >
                {event.column}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <strong>Priority :</strong>
              <span
                className="px-1 py-1/12 rounded text-xs font-semibold"
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
            <div className="my-1">
              <strong>Due :</strong> {moment(event.start).format('DD MMM')} -{' '}
              {moment(event.end).format('DD MMM')}
            </div>
            <div>
              <strong>Tasks :</strong>{' '}
              <span
                className="text-xs bg-gray text-white max-w-none prose [&_ol]:list-decimal [&_ul]:list-disc [&_li]"
                style={{ wordBreak: 'break-word', whiteSpace: 'none' }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        }
        interactive={true}
        placement="top"
        arrow={true}
        appendTo={typeof window !== 'undefined' ? document.body : undefined}

        zIndex={99999}
      >
        <div
          className="px-1 py-2 text-lg text-left "
          style={{
            background: `${columnColors[event.column]}`,
            color: '#1e293b',
            borderRadius: '5px',
            display: 'block',
            width: '100%',
            minHeight: 35,
            margin: '0px auto',
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
        </div>
      </Tippy>
    );
  }

  return (
    <div className="flex flex-row gap-4 rounded-xl overflow-auto bg-gray-800 p-8 min-h-screen">
      <div
        className={`flex flex-row gap-4 rounded-xl overflow-auto bg-gray-900 p-8 w-full h-full ${styles.calendarWrapper || ''
          }`}
        style={{ flex: 1, minWidth: 0, minHeight: 0 }}
      >
        <Calendar
          localizer={localizer}
          culture="en-GB"
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', minHeight: 600, width: '100%' }}
          views={{
            month: true,
            week: {
              dow: 1,
            },
            day: true,
          }}
          components={{
            event: EventBar,
          }}
          popup={true}
          dayLayoutAlgorithm="no-overlap"
        />
      </div>
    </div>
  );
}
