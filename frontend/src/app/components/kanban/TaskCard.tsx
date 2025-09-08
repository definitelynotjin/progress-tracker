'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, CalendarClock } from 'lucide-react';
import React from 'react';
import PriorityBadge from './PriorityBadge';
import { Task } from '../../types/types';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

type TaskCardProps = {
  task: Task;
  onClick?: () => void;
  onChecklistChange?: (taskId: string, checklist: Task['checklist']) => void;
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  console.log('Taskcard / task: ', task);
  console.log('taskcard / checklist: ', task.checklist);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: String(task.id),
      data: {
        column: task.column,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 250ms ease',
  };
  const htmlContent = remark()
    .use(gfm)
    .use(html)
    .processSync(task.content)
    .toString();
  console.log(htmlContent);

  const daysUntilDeadline = task.dueDate?.from
    ? Math.ceil(
      (new Date(task.dueDate.from) - new Date()) / (1000 * 60 * 60 * 24),
    )
    : null;

  const getDeadlineColor = (days: number) => {
    if (days > 7) return 'text-green-400';
    if (days > 3) return 'text-orange-400';
    if (days >= 0) return 'text-red-400';
    else {
      return 'text-black ';
    }
  };

  const deadlineColorClass =
    daysUntilDeadline !== null
      ? getDeadlineColor(daysUntilDeadline)
      : 'text-red-100';
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="py-3 px-3 bg-gray-600 rounded shadow-md text-white hover:bg-gray-500 transition relative min-w-[275px] max-w-[350px] w-full animate-fade-in"
    >
      {/* Edit icon top right */}
      <button
        className="absolute top-2 right-2 z-20 p-2 rounded hover:bg-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
        aria-label="Edit task"
      >
        <Pencil size={14} className="text-gray-300 hover:text-white" />
      </button>
      <div className="flex flex-col justify-center w-full h-full">
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-left w-full">
            {task.priority && <PriorityBadge priority={task.priority} />}
          </div>
          <span className="text-sm font-semibold pb-2">{task.title}</span>
        </div>

        {task.content && (
          <div
            className="text-xs text-left text-white max-w-none prose [&_ol]:list-decimal [&_ul]:list-disc [&_li]"
            style={{ wordBreak: 'break-word', whiteSpace: 'none' }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
      {/* Due Date */}
      {task.dueDate &&
        typeof task.dueDate === 'object' &&
        'from' in task.dueDate &&
        'to' in task.dueDate &&
        task.dueDate.from &&
        task.dueDate.to && (
          <div className="w-full mt-2 gap-2 text-xs text-muted-foreground flex items-center justify-between">
            <span className="flex items-center pt-3 gap-1 text-gray-300">
              <CalendarClock
                className={`ml-1 ${deadlineColorClass} mr-0.5`}
                size={14}
              />
              <span>
                {new Date(task.dueDate.from).toLocaleDateString('default', {
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                -{' '}
                {new Date(task.dueDate.to).toLocaleDateString('default', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </span>
          </div>
        )}
      {/* Progress bar & assignee */}
      {/* Assignee if no checklist */}
      <div className="flex items-center justify-end w-full mt-2">
        <span
          className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-gray-100 font-bold text-xs border-2 border-gray-600 shadow"
          title={task.assignee}
        >
          {task.assignee.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Drag handle */}
      <div
        data-handle="dot"
        {...attributes}
        {...listeners}
        className="mt-4 flex items-center justify-center cursor-grab"
        style={{ background: 'transparent' }}
      >
        <GripVertical
          size={24}
          className="text-gray-400 hover:text-gray-900 rotate-90"
        />
      </div>
    </div>
  );
}
