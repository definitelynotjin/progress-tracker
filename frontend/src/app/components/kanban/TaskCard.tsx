"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil } from "lucide-react";
import React, { useState } from "react";
import PriorityBadge from "./PriorityBadge";
import { Task } from "./types";

type TaskCardProps = {
  task: Task;
  onClick?: () => void;
  onChecklistChange?: (taskId: string, checklist: Task["checklist"]) => void;
};

export default function TaskCard({
  task,
  onClick,
  onChecklistChange,
}: TaskCardProps) {
  const [localChecklist, setLocalChecklist] = useState(task.checklist ?? []);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        column: task.column,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 250ms ease",
  };

  const handleToggle = (id: string) => {
    setLocalChecklist((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      );
      if (onChecklistChange) onChecklistChange(task.id, updated);
      return updated;
    });
  };

  const checklist = localChecklist;
  const completed = checklist.filter((item) => item.done).length;
  const progress =
    checklist.length > 0 ? Math.round((completed / checklist.length) * 100) : 0;

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

      {/* Card content and drag icon */}
      <div className="flex flex-col justify-center w-full h-full">
        {/* Priority and title */}
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-left w-full">
            {task.priority && <PriorityBadge priority={task.priority} />}
          </div>
          <span className="text-sm font-semibold pb-2">{task.title}</span>
        </div>

        {/* Checklist or content */}
        <div className="w-full overflow-y-auto max-h-24 ">
          {checklist.length > 0 ? (
            <ul className="flex flex-col gap-1 mt-1">
              {checklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-left gap-4 text-xs text-gray-200 "
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggle(item.id)}
                    className="accent-green-300 w-3.5 h-3.5 rounded border-gray-400 bg-gray-800 cursor-pointer"
                  />
                  <span
                    className={
                      item.done
                        ? "line-through gap-4 opacity-60 truncate text-left"
                        : "truncate text-left"
                    }
                    style={{
                      maxWidth: "200px",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            task.content && (
              <span
                className="tiptap-taskcard prose max-w-none text-xs text-left text-red-800 mt-1 gap-2 flex flex-col [&_ol]:list-decimal [&_ul]:list-disc [&_li]:my-2"
                style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                dangerouslySetInnerHTML={{ __html: task.content }}
              />
            )
          )}
        </div>

        {/* Due Date */}
        {task.dueDate &&
          typeof task.dueDate === "object" &&
          "from" in task.dueDate &&
          "to" in task.dueDate &&
          task.dueDate.from &&
          task.dueDate.to && (
            <div className="w-full mt-2 gap-2 text-xs text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {new Date(task.dueDate.from).toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(task.dueDate.to).toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
            </div>
          )}

        {/* Progress bar & assignee */}
        {checklist.length > 0 && (
          <div className="flex items-center justify-between rounded-xl mt-10 px-2 py-1 min-w-0 gap-2">
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden transition-all duration-500 ease-in-out">
                <div
                  className="bg-green-300 h-full transition-all duration-700 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            {task.assignee && (
              <span
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-gray-100 font-bold text-xs border-2 border-gray-600 shadow shrink-0"
                title={task.assignee}
              >
                {task.assignee.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        )}

        {/* Assignee if no checklist */}
        {checklist.length === 0 && task.assignee && (
          <div className="flex items-center justify-end w-full mt-2">
            <span
              className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-gray-100 font-bold text-xs border-2 border-gray-600 shadow"
              title={task.assignee}
            >
              {task.assignee.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Drag handle */}
        <div
          data-handle="dot"
          {...attributes}
          {...listeners}
          className="mt-4 flex items-center justify-center cursor-grab"
          style={{ background: "transparent" }}
        >
          <GripVertical
            size={24}
            className="text-gray-400 hover:text-gray-900 rotate-90"
          />
        </div>
      </div>
    </div>
  );
}

// Utility: Parse checklist from Tiptap HTML
export function extractChecklistFromHTML(html: string) {
  const doc = new window.DOMParser().parseFromString(html, "text/html");
  const items = Array.from(doc.querySelectorAll("ul li, ol li"));
  return items.map((li, i) => ({
    id: String(i + 1),
    text: li.textContent || "",
    done: false,
  }));
}
