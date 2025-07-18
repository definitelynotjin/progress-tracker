import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskName: string) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
    const [taskName, setTaskName] = React.useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Add New Task</h2>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        if (taskName.trim()) {
                            onSubmit(taskName);
                            setTaskName("");
                        }
                    }}
                >
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2 mb-4"
                        placeholder="Task name"
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            disabled={!taskName.trim()}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
