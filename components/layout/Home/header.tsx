import React from "react";
import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  const navItems = [
    { pointer: "how", value: "How It Works" },
    { pointer: "features", value: "Features" },
    { pointer: "templates", value: "Templates" },
    { pointer: "pricing", value: "Pricing" },
  ];

  return (
    <nav className="w-full border-b border-border bg-background/85 backdrop-blur-md sticky top-0 z-50">
      {/* Inner container — fixed max-width instead of w-9/12 */}
      <div className="max-w-content mx-auto px-6 h-16 flex flex-row justify-between items-center">

        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-sans font-bold text-foreground text-[1.15rem] no-underline"
        >
          {/* Fixed gradient: was from-primary-50/0 (transparent) → now from-primary to-purple */}
          <div className="flex items-center justify-center w-8.5 h-8.5 rounded-[10px] bg-linear-to-br from-primary to-purple">
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
        </a>

        {/* Nav links — fixed gap-2 (8px) → gap-8 (32px), removed Button wrapper */}
        <ul className="flex items-center gap-8 list-none">
          {navItems.map((c, i) => (
            <li key={i}>
              <a
                href={`#${c.pointer}`}
                className="font-sans font-medium text-[0.9rem] text-foreground-muted no-underline transition-colors duration-150 hover:text-primary"
              >
                {c.value}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-[0.9rem] font-medium text-muted-foreground px-4 py-2 cursor-pointer"
          >
            Sign in
          </Button>

          <Button
            variant="default"
            asChild
            className="bg-primary text-[0.9rem] font-semibold font-sans px-5 py-2.5 cursor-pointer transition-all duration-150 hover:bg-primary-hover hover:shadow-btn hover:-translate-y-px"
          >
            <a href="#" className="flex items-center gap-1.5">
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
              Get started
            </a>
          </Button>
        </div>

      </div>
    </nav>
  );
}