import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskName: string) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
    const [taskName, setTaskName] = React.useState("");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <motion.div
                        className="bg-gray-700 rounded-lg p-6 w-80 shadow-lg"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2 className="text-lgt text-sm text-white font-bold mb-4">Add New Task</h2>
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
                                className="w-full text-sm bg-gray-700 text-white border rounded px-3 py-2 mb-4"
                                placeholder="Task name"
                                value={taskName}
                                onChange={e => setTaskName(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 text-xs py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 text-xs py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    disabled={!taskName.trim()}
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
