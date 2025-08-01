"use client";

import React from "react";


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
                    <li className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <span className="text-white">John Doe</span>
                        <button className="text-red-400 hover:text-red-200">Remove</button>
                    </li>
                    <li className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <span className="text-white">Jane Doe</span>
                        <button className="text-red-400 hover:text-red-200">Remove</button>
                    </li>

                        <li className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <span className="text-white">Jane Doe</span>
                        <button className="text-red-400 hover:text-red-200">Remove</button>
                    </li>
                </ul>
            </div>

            <div className="w-3/4 bg-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                    Manage Teams
                </h2>
                {/* Team management form or options */}
                <form className="space-y-4">
                    <input type="text" placeholder="Add new team member" className="w-full p-3 rounded-md bg-gray-600 text-white" />
                    <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-md">Add Member</button>
                </form>
            </div>
        </div>
    );
}
