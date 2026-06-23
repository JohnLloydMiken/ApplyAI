"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// ✅ FIX 1: Sidebar is now OUTSIDE HomeHeader.
// Defined here so React doesn't recreate it on every re-render.
// It receives navItems and onClose as props instead of closing over state.
interface SidebarProps {
  open: boolean;
  onClose: () => void;
  navItems: { pointer: string; value: string }[];
}

function Sidebar({ open, onClose, navItems }: SidebarProps) {
  return (
    <>
      {/* ✅ FIX 2: Overlay — darkens the background when sidebar is open.
          Clicking it also closes the sidebar (good UX).
          `pointer-events-none` when hidden so it doesn't block clicks. */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ✅ FIX 3: Sidebar drawer — slides in from the RIGHT using `translate-x`.
          `translate-x-full`  = fully off-screen to the right (closed)
          `translate-x-0`     = in view (open)
          `z-50` keeps it above the overlay. */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-xl z-50
          flex flex-col px-6 py-8 gap-8
          transition-transform duration-300 ease-in-out md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ✅ FIX 4: X button to close the sidebar.
            Without this, the user has no way to dismiss it. */}
        <button
          onClick={onClose}
          className="self-end text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <ul className="flex flex-col gap-6 list-none ">
          {navItems.map((c, i) => (
            <li key={i}>
              <a
                href={`#${c.pointer}`}
                onClick={onClose} // ✅ FIX 5: Close sidebar when a nav link is clicked
                className="font-sans font-medium text-sm text-muted-foreground no-underline transition-colors duration-150 hover:text-primary"
              >
                {c.value}
              </a>
            </li>
          ))}
        </ul>

        {/* ✅ BONUS: Get Started button inside mobile menu too */}
        <Button className="w-full mt-auto">Get started</Button>
      </aside>
    </>
  );
}

export default function HomeHeader() {
  const [open, setOpen] = useState(false);

  // ✅ FIX 6: Single toggle handler — no separate handleOpen/handleClose needed
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  const navItems = [
    { pointer: "how", value: "How It Works" },
    { pointer: "features", value: "Features" },
    { pointer: "templates", value: "Templates" },
    { pointer: "pricing", value: "Pricing" },
  ];

  return (
    // ✅ FIX 7: `<nav>` wraps both the top bar AND the Sidebar.
    // Sidebar is now a SIBLING of the inner flex div, not a child inside it.
    <nav className="w-full border-b border-border bg-background/85 backdrop-blur-md fixed top-0 z-50">
      {/* Inner flex row — logo, links, CTA, hamburger */}
      <div className="md:w-9/12 w-11/12 mx-auto md:h-16 py-2 flex flex-row justify-between items-center">
        {/* Logo */}
        <a
          href="#"
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
        </a>

        {/* Desktop nav links */}
        <ul className="md:flex items-center gap-8 list-none hidden">
          {navItems.map((c, i) => (
            <li key={i}>
              <a
                href={`#${c.pointer}`}
                className="font-sans font-medium text-[0.9rem] text-muted-foreground no-underline transition-colors duration-150 hover:text-primary"
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
            className="hidden md:flex bg-primary text-[0.9rem] font-semibold font-sans px-5 py-2.5 cursor-pointer transition-all duration-150 hover:bg-primary-hover hover:shadow-btn hover:-translate-y-px"
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

          {/* ✅ FIX 8: Hamburger always visible on mobile, uses toggleMenu, no conditional hiding */}
          <Button
            variant="default"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>

      {/* ✅ FIX 9: Sidebar rendered HERE — sibling to the inner div, still inside <nav> */}
      <Sidebar open={open} onClose={closeMenu} navItems={navItems} />
    </nav>
  );
}