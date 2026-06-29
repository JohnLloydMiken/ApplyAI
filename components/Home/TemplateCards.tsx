"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Client island: the 3 template preview cards with hover animation.
 * Only the <motion.div> wrappers need framer-motion.
 */
export default function TemplateCards() {
  return (
    <div className="w-full flex md:flex-row flex-col items-center justify-between gap-4">
      {/* Executive */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -15 }}
        className="border border-border rounded-xl overflow-hidden h-64 md:w-[30%] w-full flex flex-col hover:border-primary hover:shadow-(--shadow-card)"
      >
        <div className="w-full bg-white h-48 border-l-4 border-l-primary border-b border-border">
          <div className="flex flex-col gap-2 px-4 py-5 w-full">
            {/* Name */}
            <div className="h-3 w-[60%] rounded-full bg-foreground-subtle" />
            {/* Sub-info */}
            <div className="h-2 w-[40%] rounded-full bg-foreground-subtle/30" />
            {/* Divider */}
            <div className="my-2 h-px w-full bg-blue-600/25" />
            {/* Body lines */}
            {[90, 80, 85, 70].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-foreground-subtle/30"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
        <div className="w-full bg-white flex-1 p-3 flex items-center justify-between">
          <div className="flex flex-col justify-center items-start">
            <div className="text-black font-sans text-sm font-bold">Executive</div>
            <div className="text-foreground-subtle font-medium text-xs">
              Best for senior & leadership roles
            </div>
          </div>
          <button className="bg-primary-light text-primary rounded-full py-2 px-4 text-sm cursor-pointer">
            Use this
          </button>
        </div>
      </motion.div>

      {/* Modern Minimal */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -15 }}
        className="border border-border rounded-xl overflow-hidden h-64 md:w-[30%] w-full flex flex-col hover:border-primary hover:shadow-(--shadow-card)"
      >
        <div className="w-full bg-bg h-48 border-b border-border">
          <div className="flex flex-col gap-2.5 p-5">
            {/* Avatar + name block */}
            <div className="flex items-center gap-3 mb-1">
              <div className="size-8 shrink-0 rounded-full bg-linear-to-br from-blue-500 to-violet-500" />
              <div className="flex flex-col gap-1">
                <div className="h-2 w-20 rounded-full bg-foreground-subtle" />
                <div className="h-1.5 w-14 rounded-full bg-slate-300" />
              </div>
            </div>
            {/* Body lines */}
            {[100, 90, 95, 75, 85].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-slate-200"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
        <div className="w-full bg-white flex-1 p-3 flex items-center justify-between">
          <div className="flex flex-col justify-center items-start">
            <div className="text-black font-sans text-sm font-bold">Modern Minimal</div>
            <div className="text-foreground-subtle font-medium text-xs">
              Best for tech & creative roles
            </div>
          </div>
          <button className="bg-primary-light text-primary rounded-full py-2 px-4 text-sm cursor-pointer">
            Use this
          </button>
        </div>
      </motion.div>

      {/* Two Column */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -15 }}
        className="border border-border rounded-xl overflow-hidden h-64 md:w-[30%] w-full flex flex-col hover:border-primary hover:shadow-(--shadow-card)"
      >
        <div className="w-full bg-accent-light h-48 border-b border-border">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="flex w-24 shrink-0 flex-col items-center gap-2 bg-accent px-3 py-4">
              <div className="size-9 rounded-full bg-white/30" />
              {[50, 30, 40].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 w-full rounded-full bg-white/40"
                  style={{ opacity: 0.4 + i * 0.1 }}
                />
              ))}
            </div>

            {/* Main content */}
            <div className="flex flex-col gap-2 px-4 py-5 w-full">
              <div className="h-2.5 w-[70%] rounded-full bg-foreground-subtle mb-1" />
              {[100, 85, 90, 75].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-slate-300"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-white flex-1 p-3 flex items-center justify-between">
          <div className="flex flex-col justify-center items-start">
            <div className="text-black font-sans text-sm font-bold">Two-Column</div>
            <div className="text-foreground-subtle font-medium text-xs">
              Best for design & marketing
            </div>
          </div>
          <button className="bg-primary-light text-primary rounded-full py-2 px-4 text-sm cursor-pointer">
            Use this
          </button>
        </div>
      </motion.div>
    </div>
  );
}
