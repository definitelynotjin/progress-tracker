import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsedLabelClass?: string;
  labelClassName?: string;
}

export default function SidebarNavItem({
  href,
  icon,
  label,
  collapsedLabelClass,
  labelClassName,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="group flex items-center gap-2 px-4 py-4 rounded-md transition duration-150 transform hover:bg-gray-900 hover:scale-95"
    >
      <motion.span
        className={`relative flex items-center justify-center w-8 h-8 shrink-0 rounded-full transition duration-150 ease-in-out
        `}
        whileHover="hover"
        initial="initial"
        animate={isActive ? "hover" : "initial"}
      >
        {icon}

        <motion.div
          variants={{
            initial: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 -mb-2 w-6 h-[2px] bg-gray-300 rounded-full origin-center"
        />
      </motion.span>

      <span
        className={`${collapsedLabelClass || "ml-3"} ${labelClassName || "text-sm"}`}
      >
        {label}
      </span>
    </Link>
  );
}
