import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, } from "@/components/ui/breadcrumb";
import { ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export default function TeamHeaderBar() {
    return (
        <TooltipProvider>
            <div className="flex items-center justify-between mb-4 -mt-6 w-full">
                {/* Shadcn Breadcrumbs */}
                <Breadcrumb className="flex flex-row items-center">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard" className="font-bold text-sm text-gray-500 hover:text-gray-300 transition">
                            Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <ChevronRight size={14} className="mx-1 text-gray-400" />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/team-management" className="font-bold text-sm text-gray-400 hover:text-gray-300 transition">
                            Team Management</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="flex items-center gap-3">
                    <div className="relative group/avatar-roster">
                        {/* Expanded view: show all avatars on hover, to the left */}
                        <div className="absolute right-full top-0 flex items-center gap-3 transition-all duration-300 ease-in-out opacity-0 pointer-events-none group-hover/avatar-roster:opacity-100 group-hover/avatar-roster:pointer-events-auto">
                        </div>
                        {/* Compact view: show up to 3 avatars and +x indicator */}

                        <Button
                            className="w-20 h-8 rounded-md bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition p-0 border-0"
                        >
                            <Tooltip>
                                <TooltipTrigger>
                                    <Send size={18} className="m-4" />
                                    <TooltipContent>
                                        Invite Member
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
