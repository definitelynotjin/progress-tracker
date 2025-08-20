"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function NotificationButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <TooltipProvider>
      <div className="relative" ref={ref}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-500 transition-colors relative"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <span className="sr-only">Notifications</span>
              <Bell size={22} className="text-gray-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent>View Notifications</TooltipContent>
        </Tooltip>
        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-96 bg-gray-700 rounded-lg shadow-2xl border-gray-200 z-20 p-6">
            <div className="pb-4 font-bold text-gray-100 text-sm border-b">
              Notifications
            </div>
            <ul className="divide-y divide-gray-200">
              <li className="py-6 text-sm text-gray-400">
                No new notifications
              </li>
            </ul>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
