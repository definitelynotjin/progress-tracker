"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import TiptapEditor from "./TiptapEditor";
import { Task } from "../../types/types";

type TaskDetailProps = {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
};

export default function TaskDetail({
  task,
  onSave,
  onCancel,
}: TaskDetailProps) {
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content || "");
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [assignee, setAssignee] = useState(task.assignee || "");
  const [checklist, setChecklist] = useState(task.checklist ?? []);
  // Support range selection for due date
  const [dueDateRange, setDueDateRange] = useState<DateRange | undefined>(
    task.dueDate &&
      typeof task.dueDate === "object" &&
      task.dueDate.from &&
      task.dueDate.to
      ? { from: new Date(task.dueDate.from), to: new Date(task.dueDate.to) }
      : undefined,
  );

  const handleSave = () => {
    onSave({
      ...task,
      title,
      content,
      priority,
      assignee,
      checklist,
      dueDate: dueDateRange
        ? {
            from: dueDateRange.from
              ? dueDateRange.from.toISOString()
              : undefined,
            to: dueDateRange.to ? dueDateRange.to.toISOString() : undefined,
          }
        : undefined,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
      <div className="bg-gray-700 rounded-lg shadow-lg max-w-2xl w-full p-6 space-y-6">
        {/* Title input */}
        <input
          type="text"
          className="text-white w-full bg-gray-700 text-1xl font-semibold border-b border-gray-500 pb-2 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          autoFocus
        />

        {/* Priority selector - interactive buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300">Priority:</span>
          {[
            { label: "Low", color: "bg-green-400" },
            { label: "Medium", color: "bg-yellow-500" },
            { label: "High", color: "bg-red-400" },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold text-white border transition focus:outline-none ${
                opt.color
              } ${
                priority === opt.label
                  ? "ring-2 ring-white"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() =>
                setPriority(opt.label as "Low" | "Medium" | "High")
              }
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Due date range picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300">Date Range:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-gray-600 rounded-md bg-gray-100 px-2 py-1"
              >
                {dueDateRange?.from && dueDateRange?.to
                  ? `${format(dueDateRange.from, "MMM dd, yyyy")} - ${format(
                      dueDateRange.to,
                      "MMM dd, yyyy",
                    )}`
                  : dueDateRange?.from
                    ? format(dueDateRange.from, "MMM dd, yyyy")
                    : "Pick range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto">
              <Calendar
                mode="range"
                selected={dueDateRange}
                onSelect={setDueDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Rich text editor */}
        <TiptapEditor
          value={content}
          onChange={setContent}
          onChecklistChange={setChecklist}
        />

        {/* Assignee input */}
        <input
          type="text"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-2"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assigned to..."
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs rounded bg-gray-600 text-white hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
