import React from "react";
import HeroPage from "@/components/Home/hero";
import Stats from "@/components/Home/stats";
import HowItWorks from "@/components/Home/how-it-works";
export default function Home() {
  return (
    <div className="max-w-full flex flex-col">
      <HeroPage />
      <Stats />
      <HowItWorks/>
    </div>
  );
}
