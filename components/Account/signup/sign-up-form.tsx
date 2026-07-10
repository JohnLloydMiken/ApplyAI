// signup-form.tsx
"use client";

import React from "react";
import SignUpCard from "./signup-card";
import FeatureCarousel from "./carousel";

export default function SignUpForm() {
  return (
    <div className="w-full bg-background h-screen flex items-center justify-center lg:min-h-full ">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24  w-2/5">
        <div className="mx-auto w-full max-w-lg lg:mx-0">
          <h1 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Your next job starts here.
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Sign up to instantly generate a professional, ATS-ready resume with AI.
          </p>

          <SignUpCard />
        </div>
      </div>

      {/* Right: feature carousel — hidden below lg */}
      <div className="w-full relative hidden p-3 lg:flex  justify-center items-center ">
        <FeatureCarousel />
      </div>
    </div>
  );
}