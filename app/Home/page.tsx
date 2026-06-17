import React from "react";
import HeroPage from "@/components/Home/hero";
import Stats from "@/components/Home/stats";
export default function Home() {
  return (
    <div className="max-w-full flex flex-col">
      <HeroPage />
      <Stats />
    </div>
  );
}
