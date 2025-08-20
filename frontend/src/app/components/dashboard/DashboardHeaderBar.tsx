import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function DashboardHeaderBar() {
  return (
    <div className="flex items-center justify-between mb-4 -mt-6 w-full">
      {/* Shadcn Breadcrumbs */}
      <Breadcrumb className="flex flex-row items-center">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/dashboard"
            className="font-bold text-sm text-gray-500 hover:text-gray-300 transition"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <ChevronRight size={14} className="mx-1 text-gray-400" />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/dashboard"
            className="font-bold text-sm text-gray-400 hover:text-gray-300 transition"
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* Avatars */}
    </div>
  );
}
