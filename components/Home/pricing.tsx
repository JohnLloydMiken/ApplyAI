import React from "react";
import PlanCard from "./PlanCard";

const plans = [
  {
    name: "Free",
    description: "Great for getting started",
    price: "$0",
    features: [
      { text: "3 AI resumes / month" },
      { text: "1 cover letter / month" },
      { text: "5 templates" },
      { text: "PDF export" },
    ],
    buttonLabel: "Get started free",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "Everything you need to get hired",
    price: "$12",
    features: [
      { text: "Unlimited AI resumes" },
      { text: "Unlimited cover letters" },
      { text: "25+ premium templates" },
      { text: "ATS score & optimizer" },
      { text: "PDF + Word export" },
      { text: "Priority AI generation" },
    ],
    buttonLabel: "Start Pro — $12/mo",
    buttonVariant: "primary" as const,
    featured: true,
  },
  {
    name: "Teams",
    description: "For career coaches & agencies",
    price: "$49",
    features: [
      { text: "Everything in Pro" },
      { text: "Up to 10 team seats" },
      { text: "Shared template library" },
      { text: "Analytics dashboard" },
      { text: "Dedicated support" },
    ],
    buttonLabel: "Contact sales",
    buttonVariant: "outline" as const,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-bg py-24">
      <div className="mx-auto md:w-9/12 w-11/12">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-lg font-sans font-semibold text-primary uppercase">
            Pricing
          </p>
          <h2 className="text-[38px] font-display font-bold tracking-tight text-black sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-[16px] text-center text-secondary-foreground leading-8">
            Start for free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        {/* Plan cards — only the cards themselves need framer-motion */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
