import Link from "next/link";
import React from "react";
import { LayoutDashboard, Kanban, UserRound, Settings } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="h-full w-64 bg-gray-800 text-gray-100 flex flex-col shadow-lg md:flex">
            <div className="flex items-center justify-center h-20 border-b border-gray-700 min-w-0">
                <span className="text-2xl font-bold p-4 tracking-wide justify-center truncate overflow-hidden text-ellipsis">
                    <span className="block md:inline">Progress</span>
                    <span className="block md:inline"> Tracker</span>
                </span>
            </div>
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <LayoutDashboard className="text-lg" />
                    <span>Dashboard</span>
                </Link>
                <Link href="/kanban" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <Kanban className="text-lg" />
                    <span>Kanban Board</span>
                </Link>
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <UserRound className="text-lg" />
                    <span>Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <Settings className="text-lg" />
                    <span>Settings</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Progress Tracker
            </div>
        </aside>
    );
}
