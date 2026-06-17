import React from "react";
import HomeHeader from "@/components/layout/Home/header";
export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-full overflow-hidden w-full">
      <HomeHeader/>
      <main>{children}</main>
    </div>
  );
}