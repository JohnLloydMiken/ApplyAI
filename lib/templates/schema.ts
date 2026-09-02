import { z } from "zod";
import { personalInfoSchema } from "./personal-info-schema";
// ---- Renderable resume content (existing fields + photo) ----
const resumeContentSchema = z.object({
 
  summary: z
    .string()
    .min(10, "Summary should have at least 10 characters")
    .optional(),
  skills: z.array(z.string()).optional(),
  education: z
    .array(
      z.object({
        id: z.string(),
        primary: z.string().min(1, "School/University is required"),
        secondary: z.string().min(1, "Degree is required"),
        startYear: z.string().min(4, "Start year is required"),
        endYear: z.string().min(4, "End year is required"),
        description: z.string().optional(),
      }),
    )
    .optional(),
  experience: z
    .array(
      z.object({
        id: z.string(),
        primary: z.string().min(1, "Job Role is required"),
        secondary: z.string().min(1, "Company is required"),
        startYear: z.string().min(4, "Start year is required"),
        endYear: z.string().min(4, "End year is required"),
        description: z.string().optional(),
      }),
    )
    .optional(),
  languages: z.array(z.object({ id: z.string(), code: z.string(), proficiency: z.string() })).optional(),
  hobbies: z.array(z.string()).optional(),
  certificates: z
    .array(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .optional(),
});

// ---- AI generation hints (not rendered directly) ----
const resumeContextSchema = z.object({
  targetRole: z.string().min(1, "Target role is required").optional(),
  jobDescription: z.string().max(5000, "Job description is too long — try pasting just the responsibilities/requirements section").optional(),
});

// ---- Combined form schema ----
export const resumeFormSchema = resumeContentSchema
  .merge(resumeContextSchema)
  .merge(personalInfoSchema);

// Export sub-schemas too, useful later when building the AI request payload
export { resumeContentSchema, resumeContextSchema };