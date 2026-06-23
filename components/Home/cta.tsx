import React from "react";
import { Button } from "../ui/button";


export default function CTA() {
  return (
    <div className="w-full py-4">
      <div className="md:w-9/12 w-11/12 mx-auto bg-linear-to-br from-primary to-primary/80 rounded-xl p-16 flex flex-col items-center justify-center gap-4">
        <h2 className="text-card md:text-[38px] text-2xl font-display font-bold">Ready to land your dream job?</h2>
        <p className="md:text-base text-xs text-secondary/80 font-semibold">
          Join 200,000+ job seekers who&apos;ve already leveled up their applications
          with ResumeAI.
        </p>
        <Button variant={"default"} className="md:p-8 p-6 bg-white text-primary hover:bg-white font-bold md:text-base text-sm cursor-pointer">
          Create my free resume →
        </Button>
      </div>
    </div>
  );
}
