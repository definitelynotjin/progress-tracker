import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ASSIGNEE } from "../kanban/kanbanConfig";

export default function TeamManagement() {
    return (
        <div className="flex flex-row gap-4 rounded-xl overflow-auto bg-gray-800 p-16 min-h-screen">
            <div className="w-1/4 bg-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                    Team Members
                </h2>
                {/* Team members list */}
                <ul className="space-y-2">
                    {/* Example team member */}
                    <div className="flex flex-wrap">
                        {ASSIGNEE.map(name => (
                            <Button key={name}
                                className="m-1 bg-gray-800 text-white rounded-md min-w-full min-h-20 text-left">
                                <div className="flex justify-between items-center w-full">
                                    <span className="font-bold">{name}</span>
                                    <span className="m-1 p-2 rounded-md bg-gray-600 text-red-500 hover:bg-gray-100">
                                        Remove
                                    </span>
                                </div >
                            </Button>
                        ))}
                    </div>
                </ul>
            </div>

            <div className="w-3/4 bg-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                    Manage Teams
                </h2>
                {/* Team management form or options */}
                <form className="space-y-4">
                    <Input type="text" placeholder="Add new team member" className="w-full p-3 rounded-md bg-gray-800 text-white" />
                    <Button type="submit" className="w-full h-10 bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-md"
                    >
                        Add Member
                    </Button>
                </form>
            </div>
        </div>
    );
}
