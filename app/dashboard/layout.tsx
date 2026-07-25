import React from "react";
import DashboardSideBar from "@/components/layout/dashboard/sidebar";
import Footer from "@/components/layout/Home/footer";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col md:flex-row  h-full overflow-hidden w-full">
      <DashboardSideBar />
      <main className="flex-1 justify-center items-center">{children}</main>
    </div>
  );
}
