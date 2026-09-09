import { TEMPLATES } from "@/lib/resume-templates/general-template";
import { notFound } from "next/navigation";
import { ResumeFormProvider } from "./resume-form";
import { SECTION_REGISTRY } from "@/lib/templates/registry";
import TargetRoleSection from "@/lib/templates/form-sections/TargetRoleSection";
import ImageUploadForm from "@/lib/templates/form-sections/PhotoUploadSection";
import PersonalInfoSection from "@/lib/templates/form-sections/PersonalInfoSection";
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
    <div className="p-3 flex justify-center items-center flex-col gap-4">
      <div className="w-9/12 flex flex-col gap-2">
        <p className="text-primary font-bold font-sans uppercase tracking-wider text-base">
          Resume details
        </p>
        <h1 className="text-black text-2xl font-bold">
          Tell us about yourself
        </h1>
        <p className="text-sm font-light text-foreground-subtle">
          Fill in what you know. ResumeAI will turn your details into polished,
          job-ready resume content.
        </p>
      </div>
      <div className="w-9/12">
        <ResumeFormProvider templateId={template.id}>
          {template.photoSupport === "required" || template.photoSupport === "optional" ? <ImageUploadForm/> : null}
          <PersonalInfoSection/>
          <TargetRoleSection/>
          
          {template.supportedSections.map((section) => {
            const Section = SECTION_REGISTRY[section];
            return <Section key={section} />;
          })}
        </ResumeFormProvider>
      </div>
    </div>
  );
}
