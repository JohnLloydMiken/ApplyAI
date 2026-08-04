import React from "react";
import DashboardSideBar from "@/components/layout/dashboard/sidebar";
import Footer from "@/components/layout/Home/footer";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <DashboardSideBar />
      <main className="flex-1 md:pl-64 lg:pl-72 w-full relative">
        {children}
      </main>
    </div>
  );
}
