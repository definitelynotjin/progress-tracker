import React from "react";
import { LayoutDashboard, Kanban, Settings, Users } from "lucide-react";
import Image from "next/image";

import SidebarNavItem from "./components/sidebar/SidebarNavItem";

export default function Sidebar({ className = "" }: { className?: string } = {}) {
    const navItems = [
        { href: "/dashboard", icon: <LayoutDashboard className="text-2xl" />, label: "Dashboard" },
        { href: "/kanban", icon: <Kanban className="text-2xl" />, label: "Kanban Board" },
        { href: "/users", icon: <Users className="text-2xl" />, label: "Team" },
        { href: "/settings", icon: <Settings className="text-4xl" />, label: "Settings" },
    ];

    return (
        <aside
            className={`sidebar group fixed top-0 left-0 z-50 h-screen w-16 hover:w-48 bg-gray-800 text-gray-100 flex flex-col shadow-lg md:flex overflow-hidden transition-all duration-200 ${className}`}
        >
            <SidebarHeader />
            <nav className="py-8 px-2 md:px-2 space-y-6 flex-1">
                {navItems.map((item) => (
                    <SidebarNavItem
                        key={item.href}
                        {...item}
                        collapsedLabelClass="group-hover:opacity-100 opacity-0 group-hover:ml-3 ml-0 transition-all duration-200 whitespace-nowrap"
                        labelClassName="text-sm"
                    />
                ))}
            </nav>
            <SidebarFooter />
        </aside>
    );
    function SidebarHeader() {
        return (
            <div className="p-4 flex items-center justify-center max-h-max border-b border-gray-700 min-w-0">
                <Image src="/logo.png" alt="Logo" width={48} height={48} />
                <span className="group-hover:opacity-0 opacity-100 transition-all duration-200 text-xl font-bold"></span>
            </div>
        );
    }

    function SidebarFooter() {
        return (
            <div className="p-4 text-center border-t border-gray-700 text-xs text-gray-400 group-hover:opacity-100 opacity-0 transition-all duration-200">
                &copy; {new Date().getFullYear()} Progress Tracker
            </div>
        );
    }
}
