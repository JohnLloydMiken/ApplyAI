import React from "react";

const CheckIcon = () => (
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 shrink-0">
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#10b981"
      strokeWidth="3.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

interface PlanFeature {
  text: string;
}

interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: PlanFeature[];
  buttonLabel: string;
  buttonVariant: "outline" | "primary";
  featured?: boolean;
}

const PlanCard = ({
  name,
  description,
  price,
  period = "/month",
  features,
  buttonLabel,
  buttonVariant,
  featured = false,
}: PlanCardProps) => {
  return (
    <div
      className={`
        relative flex flex-col rounded-2xl p-8 bg-white
        ${
          featured
            ? "ring-2 ring-primary shadow-xl shadow-indigo-100"
            : "ring-1 ring-slate-200 shadow-sm"
        }
      `}
    >
      {/* Most Popular Badge */}
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-slate-900">{name}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <span className="text-5xl font-extrabold tracking-tight text-slate-900">
          {price}
        </span>
        <span className="ml-1 text-sm text-slate-500">{period}</span>
      </div>

      {/* Feature list */}
      <ul className="mb-8 space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
            <CheckIcon />
            {feature.text}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      {buttonVariant === "primary" ? (
        <button className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer">
          {buttonLabel}
        </button>
      ) : (
        <button className="w-full rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer">
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

const plans: PlanCardProps[] = [
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
    buttonVariant: "outline",
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
    buttonVariant: "primary",
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
    buttonVariant: "outline",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bg py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-lg font-sans font-semibold text-primary uppercase">
            Pricing
          </p>
          <h2 className="text-[38px] font-display font-bold tracking-tight text-black sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-foreground-subtle">
            Start for free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}