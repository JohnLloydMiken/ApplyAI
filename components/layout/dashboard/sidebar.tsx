"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FileUser,
  ClipboardList,
  SaveCheck,
  Menu,
  X,
} from "lucide-react";
import { SidebarContent } from "@/lib/config/sidebar-content";
import { IconKey } from "@/lib/types/dashboard-props";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const ICON_MAP: Record<IconKey, React.ElementType> = {
  "file-user": FileUser,
  "save-check": SaveCheck,
  form: ClipboardList,
};

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full gap-6 p-4">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-1">
        <div className="flex items-center justify-center size-9 shrink-0 rounded-[10px] bg-linear-to-br from-primary to-purple shadow-btn">
          <FileText className="size-4.5" color="white" />
        </div>
        <h1 className="text-xl font-semibold text-foreground font-sans tracking-tight">
          ApplyAi
        </h1>
      </div>

      {/* Nav groups */}
      <nav className="flex flex-col gap-6 overflow-y-auto">
        {SidebarContent.map((group) => (
          <div key={group.title} className="w-full">
            <p className="px-3 mb-2 text-xs font-medium tracking-wide uppercase text-foreground-subtle">
              {group.title}
            </p>
            <ul className="flex flex-col gap-1">
              {group.content.map((item) => {
                const Icon = ICON_MAP[item.icon];
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 min-h-11 text-base tracking-tight transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-btn"
                          : "text-foreground-muted hover:bg-primary-light hover:text-primary",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5 shrink-0",
                          isActive
                            ? "text-primary-foreground"
                            : "text-foreground-subtle group-hover:text-primary",
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default function DashboardSideBar() {
  const [open, setOpen] = useState(false);

  // Close on Escape + lock body scroll while drawer is open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 h-dvh sticky top-0 shrink-0 flex-col bg-sidebar border-r border-sidebar-border shadow-sm z-30">
        <SidebarNav />
      </aside>

      {/* Mobile top bar */}
      <header className="flex md:hidden items-center justify-between p-3 border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-[10px] bg-linear-to-br from-primary to-purple">
            <FileText className="size-4" color="white" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            ApplyAi
          </span>
        </div>

        <Button
          variant={"ghost"}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex items-center justify-center size-11 rounded-lg text-foreground-muted hover:bg-secondary active:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="size-6" />
        </Button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <Button
            variant={"ghost"}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 animate-fade-in"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-sidebar shadow-float flex flex-col">
            <div className="flex items-center justify-end p-2">
              <Button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center size-11 rounded-lg text-foreground-muted hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-6" />
              </Button>
            </div>
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
