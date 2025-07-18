'use client';

import { useState } from 'react';
import TaskEditor from './TaskEditor';
import { Task } from './types'; // Adjust path if your Task type is elsewhere

type TaskDetailProps = {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onCancel: () => void;
};

export default function TaskDetail({ task, onSave, onCancel }: TaskDetailProps) {
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content || '');

    const handleSave = () => {
        onSave({
            ...task,
            title,
            content,
            updatedAt: new Date().toISOString(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 space-y-6">
                {/* Title input */}
                <input
                    type="text"
                    className="w-full text-2xl font-semibold border-b pb-2 outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    autoFocus
                />

                {/* Rich text editor */}
                <TaskEditor content={content} onChange={setContent} />

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
