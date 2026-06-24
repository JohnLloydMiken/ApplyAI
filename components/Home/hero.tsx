"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function HeroPage() {
  return (
    <div className="w-11/12 lg:w-9/12 my-0 mx-auto min-h-screen flex items-center justify-center py-20 lg:py-0">
      {/* ─── Main flex container: stacked on mobile/tablet → side-by-side on desktop ─── */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 w-full">
        {/* ══════════════════════════════════
            LEFT  –  copy + CTA
        ══════════════════════════════════ */}
        <div className="flex flex-col space-y-10 w-full lg:w-1/2 items-center lg:items-start text-center lg:text-left h-120 relative bottom-16 ">
          {/* Badge pill */}
          <div className="max-w-max mt-2 border border-[rgba(91,95,239,.2)] bg-primary-light rounded-full px-4 py-2 flex justify-start items-center gap-2 text-xs uppercase font-sans text-primary font-semibold">
            <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
            AI-Powered · Trusted by 200k+ users
          </div>

          {/* Headline – fluid type scale */}
          <h1 className="font-display text-[32px] sm:text-[42px] lg:text-[54px] leading-normal  text-foreground md:w-10/12 w-full lg:w-10/12 max-w-10/12   ">
            Land your dream job with a <br />
            <span className="text-primary relative">
              <span className="absolute bottom-1 right-0 w-[95%] h-1 bg-linear-to-r from-primary-light to-accent-hover" />
              perfect resume
            </span>{" "}
            in minutes
          </h1>

          {/* Sub-copy */}
          <p className="text-secondary-foreground text-sm font-normal max-w-md mx-auto lg:mx-0">
            Our AI writes tailored resumes and cover letters that match job
            descriptions — helping you stand out and get more interviews.
          </p>

          {/* CTA – full-width on mobile, auto on sm+ */}
          <Button variant="default" className="w-full sm:w-auto">
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Build my resume
          </Button>
        </div>

        {/* ══════════════════════════════════
            RIGHT  –  visual showcase
        ══════════════════════════════════ */}

        {/* ── Mobile only: two feature pills instead of the card ── */}
        <div className="flex md:hidden flex-col gap-3 w-full ">
          {/* Feature pill 1 */}
          <div className="flex items-center gap-3 bg-white border border-border rounded-2xl px-4 py-3">
            <div className="p-2 bg-primary-light rounded-xl shrink-0">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                AI-tailored to job description
              </p>
              <p className="text-xs text-secondary-foreground mt-0.5">
                Matches your resume to each role automatically
              </p>
            </div>
          </div>

          {/* Feature pill 2 */}
          <div className="flex items-center gap-3 bg-white border border-border rounded-2xl px-4 py-3">
            <div className="p-2 bg-accent-light rounded-xl shrink-0">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-accent"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-wide">
                ATS-friendly & recruiter-ready
              </p>
              <p className="text-xs text-secondary-foreground mt-0.5">
                Passes applicant tracking systems every time
              </p>
            </div>
          </div>
        </div>

        {/* ── Tablet (md) + Desktop (lg): card area ── */}
        <div className="hidden md:flex w-full lg:w-1/2 h-96 lg:h-140 relative flex-col items-center justify-center">
          {/* Floating badge TOP-RIGHT — desktop only */}
          <div className="hidden lg:flex bg-white shadow-(--shadow-card) max-w-max items-center justify-center p-3 rounded-lg text-primary uppercase text-xs font-semibold gap-2 border border-border absolute right-0 top-0 z-10">
            <div className="p-2 bg-primary-light rounded-xl">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            AI-tailored to job description
          </div>

          {/* Resume card – animated on desktop, static on tablet */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -8 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror", // cleaner than "reverse" — no easing break at the loop point
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
                <div className="text-xs lg:text-base font-bold">
                  Alex Johnson
                </div>
                <div className="text-foreground-muted text-[10px] lg:text-xs font-medium">
                  Senior Product Manager · San Francisco
                </div>
              </div>
            </div>

            {/* Skill chips – wrap on tablet */}
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

          {/* Floating badge BOTTOM-LEFT — desktop only */}
          <div className="hidden lg:flex bg-white shadow-(--shadow-card) max-w-max items-center justify-center p-3 rounded-lg text-accent uppercase text-xs font-semibold gap-2 border border-border absolute bottom-0 left-0 z-10">
            <div className="p-2 bg-accent-light rounded-xl">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            ATS-friendly & recruiter-ready
          </div>
        </div>
      </div>
    </div>
  );
}
