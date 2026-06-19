import React from "react";
import HeroPage from "@/components/Home/hero";
import Stats from "@/components/Home/stats";
import HowItWorks from "@/components/Home/how-it-works";
import Features from "@/components/Home/features";
import Templates from "@/components/Home/templates";
export default function Home() {
  return (
    <div className="max-w-full flex flex-col">
      <HeroPage />
      <Stats />
      <HowItWorks/>
      <Features/>
      <Templates/>
    </div>
  );
}
