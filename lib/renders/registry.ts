// lib/resume/renderers/registry.ts
import { RenderableResume } from "@/lib/templates/types";
import { MinimalGridPdf } from "@/lib/templates/Minimal/pdf";


export interface ResumeRenderer {
  Pdf: React.ComponentType<{ data: RenderableResume }>;

}

export const RESUME_RENDERERS: Record<string, ResumeRenderer> = {
  "minimal-03": { Pdf: MinimalGridPdf },
};