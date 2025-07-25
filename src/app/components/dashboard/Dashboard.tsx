"use client";
import React from "react";
import { KanbanProvider, useKanban } from "../kanban/KanbanContext";

const dashboardSections = [
    { title: "Overview", color: "bg-blue-500", content: "Project summary, stats, and quick links." },
    { title: "Recent Activity", color: "bg-purple-500", content: "Latest updates and changes." },
    { title: "Team", color: "bg-teal-500", content: "Team members and roles." },
    { title: "Deadlines", color: "bg-lime-500", content: "Upcoming deadlines and milestones." },
];

export default function Dashboard() {
    return (
        <KanbanProvider>
            <DashboardContent />
        </KanbanProvider>
    );
}

function DashboardContent() {
    const { tasks } = useKanban();
    // Flatten all tasks
    const allTasks = Object.values(tasks).flat();
    return (
        <div className="bg-gray-800 bg-repeat-round min-h-screen rounded-xl shadow-lg p-8">
            {/* Kanban Data Table */}
            <section className="mb-8">
                <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide drop-shadow">Kanban Board Data</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-900/80">
                                <th className="px-4 py-3 text-left text-lg font-semibold text-blue-300 tracking-wide">Title</th>
                                <th className="px-4 py-3 text-left text-lg font-semibold text-purple-300 tracking-wide">Column</th>
                                <th className="px-4 py-3 text-left text-lg font-semibold text-pink-300 tracking-wide">Priority</th>
                                <th className="px-4 py-3 text-left text-lg font-semibold text-teal-300 tracking-wide">Assignee</th>
                                <th className="px-4 py-3 text-left text-lg font-semibold text-lime-300 tracking-wide">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTasks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400 italic text-lg">No tasks available.</td>
                                </tr>
                            ) : (
                                allTasks.map(task => (
                                    <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-700/40 transition">
                                        <td className="px-4 py-3 text-gray-100 font-medium text-base">{task.title}</td>
                                        <td className="px-4 py-3 text-purple-200 font-semibold text-base">{task.column}</td>
                                        <td className="px-4 py-3 text-pink-200 font-semibold text-base">{task.priority}</td>
                                        <td className="px-4 py-3 text-teal-200 font-semibold text-base">{task.assignee || <span className="italic text-gray-400">Unassigned</span>}</td>
                                        <td className="px-4 py-3 text-lime-200 font-semibold text-base">{task.updatedAt ? new Date(task.updatedAt).toLocaleString() : '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* Existing dashboard sections */}
            <div className="flex flex-row gap-4 overflow-x-auto">
                {dashboardSections.map((section) => (
                    <div key={section.title} className="min-w-80 relative rounded-t-lg flex flex-col">
                        {/* Colored bar at the very top of the section */}
                        <div className={`h-1 rounded-t-lg ${section.color}`} />
                        {/* Main section background container */}
                        <div className="bg-gray-700 rounded-b flex flex-col">
                            {/* Title fixed at the top */}
                            <div className="py-4 px-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-left text-white text-lg tracking-wide drop-shadow mb-2">{section.title}</h2>
                                </div>
                            </div>
                            {/* Section content area */}
                            <div className="px-4 flex flex-col gap-y-2 flex-1 min-h-0">
                                <div className="space-y-2 text-left text-gray-300 text-base leading-relaxed">
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
