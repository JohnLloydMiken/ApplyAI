// lib/resume/personal-info-schema.ts
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  age: z.string().optional(),              // "18" — kept as string to match your other year fields
  dateOfBirth: z.string().optional(),      // "May 15, 2008"
  nationality: z.string().optional(),      // "Filipino"
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),

  links: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().min(1, "Label is required"), // "LinkedIn", "Portfolio", "GitHub"
        url: z.string().url("Must be a valid URL"),
      }),
    )
    .optional(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;