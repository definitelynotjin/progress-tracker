import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { CircleQuestionMark } from 'lucide-react';
import { Button } from '@/components/ui/button';


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
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
                    <div className="absolute right-0 top-12  w-80  bg-gray-700 rounded-lg shadow-2xl border-gray-200 z-20 p-6">
                        <div className="bg-red-200 p-2"></div>
                        <div className="pb-4 text-center font-bold text-gray-100 text-sm border-b">?</div>
                        <div className="flex flex-col gap-y-2 text-center">
                            <Button className=
                                "p-5 mt-5  w-full rounded-md  bg-gray-800 text-gray-200">
                                View Profile
                            </Button>
                            <Button className=
                                "p-5 w-full rounded-md  bg-gray-800 text-gray-200">
                                Logout
                            </Button>
                            <div className="bg-red-500">
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </TooltipProvider>
    );
}
