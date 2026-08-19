
import SummarySections from "@/lib/templates/form-sections/SummarySection";
import SkillsSection from "@/lib/templates/form-sections/SkillsSection";
import EducationSection from "@/lib/templates/form-sections/EducationSection";
import ExperienceSection from "@/lib/templates/form-sections/ExperienceSection";
import LanguageSection from "@/lib/templates/form-sections/LanguageSection";
import HubbiesSection from "@/lib/templates/form-sections/HobbiesSection";
import { TemplateMeta } from "../resume-templates/general-template";

export const SECTION_REGISTRY: Record<
  TemplateMeta["supportedSections"][number],
  React.ComponentType
> = {
  summary: SummarySections,
  skills: SkillsSection,
  education: EducationSection,
  experience: ExperienceSection,
  languages: LanguageSection,
  hobbies: HubbiesSection,
};