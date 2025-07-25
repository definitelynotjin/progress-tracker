"use client";

import React from "react";
import NotificationButton from "./notification/NotificationButton";

export default function Header() {
    return (
        <div className="h-20 flex px-8 items-center justify-between bg-gray-800">
            <h1 className="text-3xl pl-1 font-bold text-pink-300">
                Dashboard
            </h1>
            <div className="flex items-center gap-4 relative">
                <NotificationButton />
                <div className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-500 transition-colors relative flex items-center justify-center text-gray-300 text-xl font-bold">
                    <span>?</span>
                </div>
            </div>
        </div>
    );
}
