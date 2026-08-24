"use client";

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar
        onMenuClick={() =>
          setSidebarOpen((value) => !value)
        }
      />

      <Sidebar open={sidebarOpen} />

      <main
        className="
          min-h-screen
          pt-16
          lg:ml-64
        "
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}