import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CircleQuestionMark } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

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
              <CircleQuestionMark size={22} className="text-gray-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-80 bg-gray-700 rounded-lg shadow-2xl z-20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-20 h-20 rounded-full bg-red-200">
              </div>
              <div className="text-gray-200 relative bg-red-500 px-2 py-1 rounded mx-6 bottom-6">Budiaman Anjay</div>
            </div>
            <div className="bg-gray-500  relative p-4 mb-2">                what the fuck</div>
            <div className="flex flex-col gap-y-2 border-t">
              <Button className="p-5 mt-5  w-full rounded-md  bg-gray-800 text-gray-200">
                View Profile
              </Button>
              <Button className="p-5 w-full rounded-md  bg-red-900 text-gray-200 ">
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider >
  );
}
