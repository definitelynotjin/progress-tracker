"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

export default function InviteModal({
  open,
  onClose,
  onInvite,
}: InviteModalProps) {
  const [email, setEmail] = useState("");
  function handleChange(e) {
    setEmail(e.target.value);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">
          Invite Team Member
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) {
              onInvite(email);
              toast.success(`${email} has been invited`);
              setEmail("");
              onClose();
            }
          }}
          className="flex gap-2"
        >
          <input
            type="email"
            placeholder="Invite by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white flex-1"
            autoFocus
          />
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded"
          >
            Invite{" "}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-300 hover:text-white text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
