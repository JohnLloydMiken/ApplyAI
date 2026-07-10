import React from "react";
import Footer from "@/components/layout/Home/footer";
import AuthHeader from "@/components/layout/auth/header";
export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-full overflow-hidden w-full">
      <AuthHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
