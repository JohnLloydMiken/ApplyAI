import React from "react";
import HowItWorksCards from "./HowItWorksCards";

export default function HowItWorks() {
  return (
    <div className="w-full items-center justify-center py-16" id="how">
      <div className="md:w-9/12 w-11/12 mx-auto my-0 flex flex-col gap-16">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="uppercase text-lg text-primary font-sans font-bold">
            how it works
          </div>
          <div className="font-display text-4xl font-black text-center">
            From blank page to hired — in 3 steps
          </div>
          <div className="text-foreground/70 font-normal font-sans max-w-140 text-center">
            No design skills needed. Just paste a job link and let our AI craft
            the perfect application for you.
          </div>
        </div>

        {/* Animated cards — only this piece needs framer-motion */}
        <HowItWorksCards />
      </div>
    </div>
  );
}
