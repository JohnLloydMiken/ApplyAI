"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
// ✅ FIX 1: Sidebar is now OUTSIDE HomeHeader.
// Defined here so React doesn't recreate it on every re-render.
// It receives navItems and onClose as props instead of closing over state.

export default function AuthHeader() {
 

  return (
    // ✅ FIX 7: `<nav>` wraps both the top bar AND the Sidebar.
    // Sidebar is now a SIBLING of the inner flex div, not a child inside it.
    <nav className="w-full border-b border-border bg-background/85 backdrop-blur-md fixed top-0 z-50">
      {/* Inner flex row — logo, links, CTA, hamburger */}
      <div className="md:w-9/12 w-11/12 mx-auto md:h-16 py-2 flex flex-row justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-sans font-bold text-foreground md:text-[1.15rem] text-sm no-underline"
        >
          <div className="flex items-center justify-center md:w-8.5 md:h-8.5 size-8 rounded-[10px] bg-linear-to-br from-primary to-purple">
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          ResumeAI
        </Link>
        </div>
      
    </nav>
  );
}