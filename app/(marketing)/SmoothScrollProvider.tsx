"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Tiny client wrapper that activates smooth scrolling.
 * Keeps all children as Server Components — this is the only
 * client boundary needed for the scroll feature.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();
  return <>{children}</>;
}
