import React from "react";
import HomeHeader from "@/components/layout/Home/header";
import Footer from "@/components/layout/Home/footer";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
 
  return (
    <div className="flex flex-col h-full overflow-hidden w-full">
      <HomeHeader/>
      <main>
        {/* <SideBar/> */}
        {children}</main>
      <Footer/>
    </div>
  );
}