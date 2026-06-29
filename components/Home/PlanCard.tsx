"use client";

import React from "react";
import { motion } from "framer-motion";

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

const CheckIcon = () => (
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-light shrink-0">
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      className="text-green"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

/**
 * Client island: a single pricing plan card with hover animation.
 * Only this motion.div needs framer-motion.
 */
export default function PlanCard({
  name,
  description,
  price,
  period = "/month",
  features,
  buttonLabel,
  buttonVariant,
  featured = false,
}: PlanCardProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
      className={`
        relative flex flex-col rounded-2xl p-8 bg-white hover:shadow-(--shadow-card)
        ${featured ? "ring-2 ring-primary" : "ring-1 ring-border"}
      `}
    >
      {/* Most Popular Badge */}
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-black">{name}</p>
        <p className="mt-1 text-sm text-foreground-subtle">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <span className="text-5xl font-extrabold tracking-tight text-black">
          {price}
        </span>
        <span className="ml-1 text-sm text-foreground-subtle">{period}</span>
      </div>

      {/* Feature list */}
      <ul className="mb-8 space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-secondary-foreground">
            <CheckIcon />
            {feature.text}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      {buttonVariant === "primary" ? (
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98] cursor-pointer">
          {buttonLabel}
        </button>
      ) : (
        <button className="w-full rounded-xl border border-border bg-white py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2 active:scale-[0.98] cursor-pointer">
          {buttonLabel}
        </button>
      )}
    </motion.div>
  );
}
