import React from "react";

export default function MarketingLoading() {
  return (
    <div className="max-w-full flex flex-col animate-pulse">
      {/* ── Hero skeleton ── */}
      <section className="w-11/12 lg:w-9/12 mx-auto min-h-screen flex items-center justify-center py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 w-full">
          {/* Left copy skeleton */}
          <div className="flex flex-col space-y-10 w-full lg:w-1/2 items-center lg:items-start">
            <div className="h-6 w-48 rounded-full bg-foreground-subtle/20" />
            <div className="h-16 w-full max-w-lg rounded-lg bg-foreground-subtle/10" />
            <div className="h-4 w-full max-w-md rounded bg-foreground-subtle/10" />
            <div className="h-12 w-40 rounded-xl bg-foreground-subtle/20" />
          </div>

          {/* Right card skeleton */}
          <div className="hidden md:flex w-full lg:w-1/2 h-96 lg:h-140 relative flex-col items-center justify-center">
            <div className="bg-white border border-border shadow-(--shadow-card) py-4 px-6 rounded-2xl w-10/12 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-foreground-subtle/20" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-32 rounded bg-foreground-subtle/20" />
                  <div className="h-2 w-48 rounded bg-foreground-subtle/10" />
                </div>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-20 rounded-full bg-foreground-subtle/10" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-foreground-subtle/20" />
                <div className="h-3 w-full rounded-full bg-foreground-subtle/10" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-foreground-subtle/20" />
                <div className="h-3 w-10/12 rounded bg-foreground-subtle/10" />
                <div className="h-3 w-9/12 rounded bg-foreground-subtle/10" />
                <div className="h-3 w-11/12 rounded bg-foreground-subtle/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats skeleton ── */}
      <div className="max-w-full bg-white border border-border">
        <div className="flex items-center justify-between md:w-9/12 w-11/12 mx-auto py-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col md:items-center items-start justify-center gap-2">
              <div className="h-8 w-16 rounded bg-foreground-subtle/20" />
              <div className="h-3 w-20 rounded bg-foreground-subtle/10" />
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works skeleton ── */}
      <section className="w-full py-16">
        <div className="md:w-9/12 w-11/12 mx-auto flex flex-col gap-16">
          <div className="flex flex-col items-center gap-6">
            <div className="h-5 w-32 rounded bg-foreground-subtle/20" />
            <div className="h-10 w-96 rounded bg-foreground-subtle/10" />
            <div className="h-4 w-140 rounded bg-foreground-subtle/10" />
          </div>
          <div className="flex md:flex-row flex-col gap-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-border shadow-(--shadow-card) flex-1">
                <div className="h-56 w-full bg-foreground-subtle/10" />
                <div className="p-4 space-y-4">
                  <div className="h-4 w-3/4 rounded bg-foreground-subtle/20" />
                  <div className="h-3 w-full rounded bg-foreground-subtle/10" />
                  <div className="h-3 w-5/6 rounded bg-foreground-subtle/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features skeleton ── */}
      <section className="w-full bg-white py-10">
        <div className="mx-auto md:w-9/12 w-11/12 flex md:flex-row flex-col gap-4">
          <div className="flex flex-col gap-6 md:w-2/5">
            <div className="h-5 w-24 rounded bg-foreground-subtle/20" />
            <div className="h-10 w-full rounded bg-foreground-subtle/10" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-foreground-subtle/20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded bg-foreground-subtle/20" />
                    <div className="h-3 w-full rounded bg-foreground-subtle/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
