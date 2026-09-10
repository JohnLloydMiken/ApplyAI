// lib/resume/renderers/registry.ts
import { RenderableResume } from "@/lib/templates/types";
import { MinimalGridPdf } from "@/lib/templates/Minimal/pdf";
import { BoldHeaderPdf } from "../templates/Bold/pdf";
import { ClassicPdf } from "../templates/Classic/pdf";
import { CompactAtsSafePdf } from "../templates/Compact/pdf";
import { CreativePortfolioPdf } from "../templates/Creative/pdf";
import { ExecutivePdf } from "../templates/Executive/pdf";
import { ModernSidebarPdf } from "../templates/Modern/pdf";
import { TechDevPdf } from "../templates/Tech/pdf";
import { TimelinePdf } from "../templates/Timeline/pdf";
import { TwoColBalancedPdf } from "../templates/TwoCol/pdf";
export interface ResumeRenderer {
  Pdf: React.ComponentType<{ data: RenderableResume }>;

}

export const RESUME_RENDERERS: Record<string, ResumeRenderer> = {
  'classic-01': {Pdf: ClassicPdf},
  'modern-02': {Pdf: ModernSidebarPdf},
  "minimal-03": { Pdf: MinimalGridPdf },
  "executive-04": {Pdf: ExecutivePdf},
  "tech-05": {Pdf: TechDevPdf},
  "compact-06": {Pdf: CompactAtsSafePdf},
  "bold-07": {Pdf: BoldHeaderPdf},
  "timeline-08": {Pdf: TimelinePdf},
  "two-col-09": {Pdf: TwoColBalancedPdf},
  "creative-10": {Pdf: CreativePortfolioPdf}

};