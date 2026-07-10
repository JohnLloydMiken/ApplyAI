// account-layout.tsx
import React from "react";
import Footer from "@/components/layout/Home/footer";
import AuthHeader from "@/components/layout/auth/header";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AuthHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}