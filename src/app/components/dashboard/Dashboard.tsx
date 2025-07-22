import React from "react";
import Sidebar from "../../sidebar";

const dashboardSections = [
    { title: "Overview", color: "bg-blue-500", content: "Project summary, stats, and quick links." },
    { title: "Recent Activity", color: "bg-purple-500", content: "Latest updates and changes." },
    { title: "Team", color: "bg-teal-500", content: "Team members and roles." },
    { title: "Deadlines", color: "bg-lime-500", content: "Upcoming deadlines and milestones." },
];

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex flex-row gap-4 overflow-x-auto p-10 flex-1">
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
            </main>
        </div>
    );
}
