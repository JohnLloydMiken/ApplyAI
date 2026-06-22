import React from "react";
import { Button } from "../ui/button";


export default function CTA() {
  return (
    <div className="w-full py-4">
      <div className="w-9/12 mx-auto bg-linear-to-br from-primary to-primary/80 rounded-xl p-16 flex flex-col items-center justify-center gap-4">
        <h2 className="text-card text-[38px] font-display font-bold">Ready to land your dream job?</h2>
        <p className="text-base text-secondary/80 font-semibold">
          Join 200,000+ job seekers who've already leveled up their applications
          with ResumeAI.
        </p>
        <Button variant={"default"} className="p-8 bg-white text-primary hover:bg-white font-bold text-base cursor-pointer">
          Create my free resume →
        </Button>
      </div>
    </div>
  );
}
