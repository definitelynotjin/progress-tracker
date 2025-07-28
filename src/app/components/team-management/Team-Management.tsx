"use client";

import React, { useState } from 'react';

// Sample data for demonstration
const initialMembers = [
    { id: 1, name: 'Alice', role: 'Admin', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'Bob', role: 'Member', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: 3, name: 'Charlie', role: 'Viewer', avatar: 'https://i.pravatar.cc/100?img=3' },
];

const roles = ['Admin', 'Member', 'Viewer'];

export default function TeamManagement() {
    const [members, setMembers] = useState(initialMembers);
    const [inviteEmail, setInviteEmail] = useState("");

    const handleInvite = (email: string) => {
        // For demo, just add a fake member
        setMembers([
            ...members,
            {
                id: Date.now(),
                name: email.split('@')[0],
                role: 'Member',
                avatar: `https://i.pravatar.cc/100?u=${email}`,
            },
        ]);
    };

    const handleRoleChange = (id: number, newRole: string) => {
        setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
    };

    const handleRemove = (id: number) => {
        setMembers(members.filter(m => m.id !== id));
    };

    return (
        <div className="flex flex-row  gap-4 rounded-xl overflow-auto bg-gray-800 p-16 min-h-screen">
            <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg mt-8">
                <h1 className="text-3xl font-bold text-white mb-6">Team Management</h1>

                {/* Invite Form */}
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        if (inviteEmail) {
                            handleInvite(inviteEmail);
                            setInviteEmail("");
                        }
                    }}
                    className="flex gap-2 mb-8"
                >
                    <input
                        type="email"
                        placeholder="Invite by email"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-700 text-white flex-1"
                    />
                    <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
                        Invite
                    </button>
                </form>

                {/* Team Member List */}
                <div className="grid grid-cols-1 gap-4">
                    {members.map(member => (
                        <div key={member.id} className="flex items-center bg-gray-700 rounded-lg p-4">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full mr-4" />
                            <div className="flex-1">
                                <div className="text-white font-semibold">{member.name}</div>
                                <select
                                    value={member.role}
                                    onChange={e => handleRoleChange(member.id, e.target.value)}
                                    className="bg-gray-800 text-white rounded px-2 py-1 mt-1"
                                >
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => handleRemove(member.id)}
                                className="ml-4 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
