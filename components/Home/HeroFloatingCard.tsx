"use client";

import { motion } from "framer-motion";

/**
 * Client island: the animated floating resume card on the hero section.
 * Only this tiny piece needs framer-motion — everything else in HeroPage is static.
 */
export default function HeroFloatingCard() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -8 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="bg-white border border-border shadow-(--shadow-card) py-4 px-6 rounded-2xl
                  w-full md:w-10/12 lg:w-10/12
                  space-y-2
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {/* Profile row */}
      <div className="flex items-center justify-start gap-3 mb-4 lg:mb-4">
        <div className="rounded-full bg-primary text-white text-base lg:text-lg p-2 lg:p-3 flex justify-center items-center shrink-0">
          AJ
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-xs lg:text-base font-bold">Alex Johnson</div>
          <div className="text-foreground-muted text-[10px] lg:text-xs font-medium">
            Senior Product Manager · San Francisco
          </div>
        </div>
      </div>

      {/* Skill chips */}
      <div className="flex items-center justify-start gap-2 mb-3 lg:mb-4 flex-wrap">
        {["Product Strategy", "Agile", "Data-driven", "Leadership"].map(
          (c, i) => (
            <span
              key={i}
              className={`py-1.5 lg:py-2 px-3 lg:px-4 rounded-full text-xs font-semibold ${
                (i + 1) % 2 === 0
                  ? "bg-primary-light text-primary"
                  : "bg-accent-light text-accent"
              }`}
            >
              {c}
            </span>
          ),
        )}
      </div>

      {/* Match score */}
      <div className="flex flex-col gap-2 lg:gap-3">
        <div className="font-semibold text-sm text-foreground-subtle">
          Match Score
        </div>
        <div className="bg-foreground-subtle/20 w-full rounded-full">
          <div className="w-11/12 rounded-full bg-linear-to-r from-primary via-blue-400 to-accent p-1" />
        </div>
        <div className="font-normal text-xs text-foreground-subtle">
          92% match with job description
        </div>
      </div>

      {/* Experience skeleton */}
      <div className="flex flex-col justify-center items-start gap-2 lg:gap-3">
        <div className="font-semibold text-sm text-foreground-subtle">
          Experience
        </div>
        <div className="bg-foreground-subtle/20 w-10/12 rounded-full p-1" />
        <div className="bg-foreground-subtle/20 w-9/12 rounded-full p-1" />
        <div className="bg-foreground-subtle/20 w-11/12 rounded-full p-1" />
      </div>

      {/* Skills skeleton */}
      <div className="flex flex-col justify-center items-start gap-2 lg:gap-3">
        <div className="font-semibold text-sm text-foreground-subtle">
          Skills
        </div>
        <div className="bg-foreground-subtle/20 w-9/12 rounded-full p-1" />
        <div className="bg-foreground-subtle/20 w-11/12 rounded-full p-1" />
      </div>
    </motion.div>
  );
}
