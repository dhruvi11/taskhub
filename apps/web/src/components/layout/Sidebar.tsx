"use client";

import Link from "next/link";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import PersonIcon from "@mui/icons-material/Person";

interface SidebarProps {
  open?: boolean;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderIcon,
  },
  {
    label: "Tasks",
    href: "/projects",
    icon: TaskIcon,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: PersonIcon,
  },
];

export default function Sidebar({
  open = true,
}: SidebarProps) {
  return (
    <aside
      className={`
        fixed
        left-0
        top-16
        z-40
        h-[calc(100vh-4rem)]
        w-64
        border-r
        border-gray-200
        bg-white
        transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <nav className="p-4">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-3
                  text-sm
                  font-medium
                  text-gray-600
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                <Icon fontSize="small" />

                <span>
                  {item.label}
                </span>
              </Link>
            );
          })}

        </div>

      </nav>
    </aside>
  );
}