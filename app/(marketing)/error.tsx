"use client";

import React from "react";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md px-6">
        {/* Error icon */}
        <div className="size-16 rounded-2xl bg-red-100 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#DC2626"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-sm text-foreground-muted">
            We couldn&apos;t load this page. Please try again, and if the issue
            persists, let us know.
          </p>
          {error.digest && (
            <p className="text-xs text-foreground-subtle font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Retry button */}
        <button
          onClick={reset}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98] cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
