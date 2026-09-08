// lib/resume/build-renderable.ts
import type { ResumeFormData } from "../store/resume-store";
import type { GeneratedResume } from "@/lib/ai/resume-output-schema";
import type { RenderableResume } from "./types";

export function buildRenderableResume(
  formData: ResumeFormData,
  generated: GeneratedResume,
): RenderableResume {
  return {
    photo: formData.photo,
    personal: {
      fullName: formData.fullName,
      age: formData.age,
      dateOfBirth: formData.dateOfBirth,
      nationality: formData.nationality,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      links: formData.links,
    },
    generated,
  };
}