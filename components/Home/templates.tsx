import React from "react";
import { Button } from "../ui/button";
export default function Templates() {
  return (
    <div className="w-full py-10">
      <div className="w-9/12 flex flex-col mx-auto items-center justify-center gap-5">
        <div className="uppercase text-primary font-semibold text-lg">Templates</div>
        <div className="font-display text-[38px] text-black">Pick a style. Make it yours.</div>
        <div className="text-center text-secondary-foreground text-[16px] font-normal max-w-150">
          All templates are fully customizable and export in PDF or DOCX, ready
          to send to any recruiter or ATS system.
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
            <Button variant={"default"}>Browse all 25+ templates →</Button>
        </div>
      </div>
    </div>
  );
}
