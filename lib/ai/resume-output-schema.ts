// lib/ai/resume-output-schema.ts
import { z } from "zod";

export const generatedResumeSchema = z.object({
  summary: z.string().min(1),
  skills: z.object({
    technical: z.array(z.string()),
    tools: z.array(z.string()),
    soft: z.array(z.string()),
  }),
  experience: z.array(
    z.object({
      id: z.string(),
      role: z.string(),
      company: z.string(),
      startYear: z.string(),
      endYear: z.string(),
      bullets: z.array(z.string()).min(1),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      school: z.string(),
      degree: z.string(),
      startYear: z.string(),
      endYear: z.string(),
      highlight: z.string(),
    })
  ),
  keywordsMatched: z.array(z.string()),
  flaggedGaps: z.array(z.string()),
});

export type GeneratedResume = z.infer<typeof generatedResumeSchema>;