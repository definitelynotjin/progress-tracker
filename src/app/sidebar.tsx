import Link from "next/link";
import React from "react";
import { LayoutDashboard, Kanban, UserRound, Settings } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 text-gray-100 flex flex-col shadow-lg md:flex overflow-hidden">
            <div className="p-2 flex items-center justify-center max-h-max border-b border-gray-700 min-w-0">
                <span className="text-2xl font-bold p-4 tracking-wide justify-center truncate overflow-hidden text-ellipsis">
                    <span className="block md:inline">Progress</span>
                    <span className="block md:inline"> Tracker</span>
                </span>
            </div>
            <nav className="py-6 px-4 space-y-2">
                <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <LayoutDashboard className="text-lg" />
                    <span className="text-sm">Dashboard</span>
                </Link>
                <Link href="/kanban" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <Kanban className="text-lg" />
                    <span className="text-sm">Kanban Board</span>
                </Link>
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <UserRound className="text-lg" />
                    <span className="text-sm">Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
                    <Settings className="text-lg" />
                    <span className="text-sm">Settings</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Progress Tracker
            </div>
        </aside>
    );
}
