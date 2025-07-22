"use client";
import React from "react";
import Sidebar from "../../sidebar";
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
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex flex-col gap-8 p-10 flex-1">
                {/* Kanban Data Table */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Kanban Board Data</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 rounded shadow">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-300">Title</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Column</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Priority</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Assignee</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTasks.map(task => (
                                    <tr key={task.id} className="border-b border-gray-700">
                                        <td className="px-4 py-2 text-gray-100">{task.title}</td>
                                        <td className="px-4 py-2 text-gray-100">{task.column}</td>
                                        <td className="px-4 py-2 text-gray-100">{task.priority}</td>
                                        <td className="px-4 py-2 text-gray-100">{task.assignee || '-'}</td>
                                        <td className="px-4 py-2 text-gray-100">{task.updatedAt ? new Date(task.updatedAt).toLocaleString() : '-'}</td>
                                    </tr>
                                ))}
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
                                        <h2 className="font-semibold text-left text-white">{section.title}</h2>
                                    </div>
                                </div>
                                {/* Section content area */}
                                <div className="px-4 flex flex-col gap-y-2 flex-1 min-h-0">
                                    <div className="space-y-2 text-left text-gray-200">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
