import { UserRound } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
// Dummy data for avatars (replace with your board members)
const boardMembers = [
    { name: "Ali", avatar: "A" },
    { name: "Burhan", avatar: "B" },
    { name: "Coki", avatar: "C" },
    { name: "Dennis", avatar: "D" },
    { name: "Erfan", avatar: "E" },
    { name: "Frank", avatar: "F" },
];

export default function KanbanHeaderBar() {
    return (
        <div className="flex items-center justify-between mb-4 -mt-6 w-full">
            {/* Shadcn Breadcrumbs */}
            <Breadcrumb className="flex flex-row items-center">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" className="font-bold text-sm text-gray-500 hover:text-gray-300 transition">
                        Home</BreadcrumbLink>
                </BreadcrumbItem>
                <ChevronRight size={14} className="mx-1 text-gray-400" />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/kanban" className="font-bold text-sm text-gray-400 hover:text-gray-300 transition">Kanban Board</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            {/* Avatars */}
            <div className="flex items-center gap-3">
                <div className="relative group/avatar-roster">
                    {/* Expanded view: show all avatars on hover, to the left */}
                    <div className="absolute right-full top-0 flex items-center gap-3 transition-all duration-300 ease-in-out opacity-0 pointer-events-none group-hover/avatar-roster:opacity-100 group-hover/avatar-roster:pointer-events-auto">
                        {boardMembers.map((member, idx) => (
                            <div
                                key={member.name}
                                title={member.name}
                                className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-700 shadow"
                                style={{ zIndex: 10 - idx, marginLeft: idx === 0 ? 0 : '-0.75rem' }}
                            >
                                {member.avatar && typeof member.avatar === "string" ? member.avatar : null}
                            </div>
                        ))}
                    </div>
                    {/* Compact view: show up to 3 avatars and +x indicator */}
                    <div className="flex items-center gap-3 group-hover/avatar-roster:opacity-0 group-hover/avatar-roster:pointer-events-none transition-all duration-300 ease-in-out">
                        {boardMembers.slice(0, 3).map((member, idx) => (
                            <div
                                key={member.name}
                                title={member.name}
                                className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-700 shadow"
                                style={{ zIndex: 10 - idx, marginLeft: idx === 0 ? 0 : '-0.75rem' }}
                            >
                                {member.avatar && typeof member.avatar === "string" ? member.avatar : null}
                            </div>
                        ))}
                        {boardMembers.length > 3 && (
                            <div
                                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-bold text-xs border-2 border-gray-700 shadow -ml-3"
                                style={{ zIndex: 6 }}
                            >
                                +{boardMembers.length - 3}
                            </div>
                        )}
                    </div>
                </div>
                <button className="ml-2 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition" title="Add member">
                    <UserRound size={18} />
                </button>
            </div>
        </div>
    );
}
