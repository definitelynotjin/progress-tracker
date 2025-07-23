import Link from "next/link";
import React from "react";

interface SidebarNavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export default function SidebarNavItem({ href, icon, label }: SidebarNavItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-6 py-2 rounded transition group hover:bg-gray-800 hover:shadow-inner hover:shadow-black/100"
        >
            <span className="group-hover:shadow-inner group-hover:shadow-black/60 group-hover:bg-gray-800 rounded-full transition duration-150 ease-in-out">{icon}</span>
            <span className="text-sm">{label}</span>
        </Link>
    );
}
