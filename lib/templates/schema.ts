import { Certificate } from "node:crypto";
import { z } from "zod";

export const resumeFormSchema = z.object({
  summary: z
    .string()
    .min(10, "Summary Should Have Atleast 10 Characters")
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
  languages: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  certificates: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .optional(),
});
