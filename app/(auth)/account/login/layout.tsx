import React from "react";
import Footer from "@/components/layout/Home/footer";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-full overflow-hidden w-full">
     
      <main>{children}</main>
      <Footer />
    </div>
  );
}
