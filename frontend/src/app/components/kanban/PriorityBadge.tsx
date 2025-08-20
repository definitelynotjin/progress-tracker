import React from "react";
import { PriorityType } from ".../dashboard";

const priorityColors: Record<PriorityType, string> = {
  High: "bg-red-400",
  Medium: "bg-yellow-500",
  Low: "bg-green-400",
};

export default function PriorityBadge({
  priority,
}: {
  priority: PriorityType;
}) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold text-white mb-1 ${priorityColors[priority]}`}
    >
      {priority}
    </span>
  );
}
