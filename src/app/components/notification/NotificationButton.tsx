"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationButton() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="relative">
            <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-500 transition-colors relative"
                aria-label="Notifications"
                onClick={() => setDropdownOpen((open) => !open)}
            >
                <Bell size={22} className="text-gray-300" />
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 top-12 w-96 bg-gray-700 rounded-lg shadow-2xl border-gray-200 z-20 p-6">
                    <div className="pb-4 font-bold text-gray-100 text-sm border-b">Notifications</div>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-6 text-sm text-gray-100">No new notifications</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
