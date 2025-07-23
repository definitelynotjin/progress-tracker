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
            <div className="flex items-center gap-2">
                {boardMembers.map((member) => (
                    <div
                        key={member.name}
                        title={member.name}
                        className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-700 shadow"
                    >
                        {member.avatar && typeof member.avatar === "string" ? member.avatar : null}
                    </div>
                ))}
                <button className="ml-2 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition" title="Add member">
                    <UserRound size={18} />
                </button>
            </div>
        </div>
    );
}
