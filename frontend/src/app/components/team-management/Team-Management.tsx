"use client";

import React from "react";
import { AssigneeType } from "../kanban/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function TeamManagement() {

    const { Assignee } = Assignee();
    const allAssignee = Object.values(Assignee).flat();
    return (
        <div className="flex flex-row gap-4 rounded-xl overflow-auto bg-gray-800 p-16 min-h-screen">
            <div className="w-1/4 bg-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                    Team Members
                </h2>
                {/* Team members list */}
                <ul className="space-y-2">
                    {/* Example team member */}
                    allAssignee
                    <li className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <span className="text-white">John Doe</span>
                        <Button className="text-red-400 hover:text-red-200">Remove</Button>
                    </li>
                </ul>
            </div>

            <div className="w-3/4 bg-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                    Manage Teams
                </h2>
                {/* Team management form or options */}
                <form className="space-y-4">
                    <Input type="text" placeholder="Add new team member" className="w-full p-3 rounded-md bg-gray-600 text-white" />
                    <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-md"
                    >
                        Add Member
                    </Button>
                </form>
            </div>
        </div>
    );
}
