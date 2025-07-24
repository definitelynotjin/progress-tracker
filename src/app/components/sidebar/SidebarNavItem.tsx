import Link from "next/link";
import React from "react";

interface SidebarNavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    collapsedLabelClass?: string;
    labelClassName?: string;
}

export default function SidebarNavItem({ href, icon, label, collapsedLabelClass, labelClassName }: SidebarNavItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 px-4 py-4 rounded-md hover:bg-gray-700 transition-colors duration-150"
        >
            <span className="group-hover:shadow-inner group-hover:shadow-black/60 group-hover:bg-gray-800 rounded-full transition duration-150 ease-in-out">{icon}</span>
            <span className={`${collapsedLabelClass || "ml-3"} ${labelClassName || "text-sm"}`}>{label}</span>
        </Link>
    );
}
