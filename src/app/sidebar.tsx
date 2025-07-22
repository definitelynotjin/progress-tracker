import React from "react";
import { LayoutDashboard, Kanban, UserRound, Settings } from "lucide-react";

import SidebarNavItem from "./components/sidebar/SidebarNavItem";

export default function Sidebar() {
    const navItems = [
        { href: "/dashboard", icon: <LayoutDashboard className="text-lg" />, label: "Dashboard" },
        { href: "/kanban", icon: <Kanban className="text-lg" />, label: "Kanban Board" },
        { href: "/profile", icon: <UserRound className="text-lg" />, label: "Profile" },
        { href: "/settings", icon: <Settings className="text-lg" />, label: "Settings" },
    ];

    return (
        <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 text-gray-100 flex flex-col shadow-lg md:flex overflow-hidden">
            <SidebarHeader />
            <nav className="py-6 px-4 space-y-2">
                {navItems.map((item) => (
                    <SidebarNavItem key={item.href} {...item} />
                ))}
            </nav>
            <SidebarFooter />
        </aside>
    );
    function SidebarHeader() {
        return (
            <div className="p-2 flex items-center justify-center max-h-max border-b border-gray-700 min-w-0">
                <span className="text-2xl font-bold p-4 tracking-wide justify-center truncate overflow-hidden text-ellipsis">
                    <span className="block md:inline">Progress</span>
                    <span className="block md:inline"> Tracker</span>
                </span>
            </div>
        );
    }

    function SidebarFooter() {
        return (
            <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Progress Tracker
            </div>
        );
    }
}
