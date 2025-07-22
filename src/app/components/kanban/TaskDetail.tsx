"use client";

import { useState } from 'react';
import TiptapEditor from './TiptapEditor';
import { Task } from './types'; // Adjust path if your Task type is elsewhere

type TaskDetailProps = {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onCancel: () => void;
};

export default function TaskDetail({ task, onSave, onCancel }: TaskDetailProps) {
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content || '');
    const [priority, setPriority] = useState(task.priority || 'Medium');
    const [assignee, setAssignee] = useState(task.assignee || "");

    const handleSave = () => {
        onSave({
            ...task,
            title,
            content,
            priority,
            assignee,
            updatedAt: new Date().toISOString(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
            <div className="bg-gray-700 rounded-lg shadow-lg max-w-2xl w-full p-6 space-y-6">
                {/* Title input */}
                <input
                    type="text"
                    className="text-white w-full bg-gray-700 text-1xl font-semibold border-b pb-2 outline-none"
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
                    ].map(opt => (
                        <button
                            key={opt.label}
                            type="button"
                            className={`px-3 py-1 rounded text-xs font-semibold text-white border transition focus:outline-none ${opt.color} ${priority === opt.label ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"}`}
                            onClick={() => setPriority(opt.label as "Low" | "Medium" | "High")}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>


                {/* Rich text editor */}
                <TiptapEditor
                    value={content}
                    onChange={setContent}
                />

                {/* Assignee input */}
                <input
                    type="text"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-2"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
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
