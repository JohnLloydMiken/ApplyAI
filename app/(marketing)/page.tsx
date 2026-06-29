import type { Metadata } from "next";
import HeroPage from "@/components/Home/hero";
import Stats from "@/components/Home/stats";
import HowItWorks from "@/components/Home/how-it-works";
import Features from "@/components/Home/features";
import Templates from "@/components/Home/templates";
import Testimonials from "@/components/Home/testimonials";
import Pricing from "@/components/Home/pricing";
import CTA from "@/components/Home/cta";
import SmoothScrollProvider from "./SmoothScrollProvider";

export const metadata: Metadata = {
  title: "ApplyAI — AI Resume & Cover Letter Builder",
  description:
    "Generate AI-powered resumes and cover letters tailored to any job description. Land more interviews with ATS-optimized applications.",
};

export default function MarketingPage() {
  return (
    <SmoothScrollProvider>
      <div className="max-w-full flex flex-col">
        <HeroPage />
        <Stats />
        <HowItWorks />
        <Features />
        <Templates />
        <Testimonials />
        <Pricing />
        <CTA />
      </div>
    </SmoothScrollProvider>
  );
}
