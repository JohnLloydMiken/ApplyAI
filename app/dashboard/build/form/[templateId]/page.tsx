import React from "react";
import { TEMPLATES } from "@/lib/resume-templates/general-template";
import SummarySections from "@/lib/templates/form-sections/SummarySection ";
import SkillsSection from "@/lib/templates/form-sections/SkillsSection";
import EducationSection from "@/lib/templates/form-sections/EducationSection";
import ExperienceSection from "@/lib/templates/form-sections/ExperienceSection";
import LanguageSection from "@/lib/templates/form-sections/LanguageSection";
import HubbiesSection from "@/lib/templates/form-sections/HobbiesSection";
import { notFound } from "next/navigation";
export default async function FormPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    notFound();
  }
  return (
    <div className="p-3 flex justify-center items-center flex-col  gap-4">
      <div className="w-9/12 flex flex-col gap-2">
        <p className="text-primary font-bold font-sans uppercase tracking-wider text-base">Resume details</p>
        <h1 className="text-black text-2xl font-bold ">Tell us about yourself</h1>
        <p className="text-sm font-light text-foreground-subtle">
          Fill in what you know. ResumeAI will turn your details into polished,
          job-ready resume content.
        </p>
      </div>
      <SummarySections />
      <SkillsSection/>
      <EducationSection/>
      <ExperienceSection/>
      <LanguageSection/>
      <HubbiesSection/>
    </div>
  );
}
