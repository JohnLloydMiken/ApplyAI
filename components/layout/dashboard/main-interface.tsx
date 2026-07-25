import React from "react";
import UserProfile from "@/components/Dashboard/user-profile";
import ResumeGenerationSteps from "@/components/Dashboard/resume-generation-steps";
export default function MainInterface() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <UserProfile name="Miks" />
      <ResumeGenerationSteps />
    </div>
  );
}
