import React from "react";

export default function Header() {
    return (
        <div className="h-20 flex p-8 items-center justify-between bg-gray-700 mb-6 py-8">
            <h1 className="text-3xl font-bold text-pink-300 text-center">
                Team 44
            </h1>
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-gray-300 text-xl font-bold">
                    <span>?</span>
                </div>
            </div>
        </div>
    );
}
