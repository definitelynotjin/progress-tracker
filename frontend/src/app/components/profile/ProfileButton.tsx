import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { CircleQuestionMark } from 'lucide-react';



export default function ProfileButton() {
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
                            <span className="sr-only">Profile</span>
                            <CircleQuestionMark size={22} className="text-gray-300" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        View Profile
                    </TooltipContent>
                </Tooltip>
                {dropdownOpen && (
                    <div className="absolute right-0 top-12  w-96 bg-gray-700 rounded-lg shadow-2xl border-gray-200 z-20 p-6">
                        <div className="pb-4 font-bold text-gray-100 text-sm border-b">Profile</div>
                    </div>
                )}
            </div>
        </TooltipProvider>
    );
}
