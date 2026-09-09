// lib/resume/types.ts
import { GeneratedResume } from "@/lib/ai/resume-output-schema";
import { PersonalInfo } from "./personal-info-schema";

// what the renderers actually consume
export interface RenderableResume {
  photo: string | null | undefined;
  personal: PersonalInfo;
  generated: GeneratedResume;
}