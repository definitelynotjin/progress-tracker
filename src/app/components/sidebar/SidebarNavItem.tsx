import Link from "next/link";
import React from "react";

interface SidebarNavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export default function SidebarNavItem({ href, icon, label }: SidebarNavItemProps) {
    return (
        <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition">
            {icon}
            <span className="text-sm">{label}</span>
        </Link>
    );
}
