import { Certificate } from "node:crypto"
import {z} from "zod"

export const resumeFormSchema = z.object({
    summary : z.string().min(10, "Summary Should Have Atleast 10 Characters").optional(),
    skills: z.array(z.string()).optional(),
    education: z.array(
        z.object({
            school: z.string().min(3),
            year: z.string().min(4)
        })
    ).optional(),
    experience: z.array(
        z.object({
            company: z.string().min(1),
            role: z.string().min(1),
            description: z.string().optional()
        })
    ).optional(),
    languages: z.array(z.string()).optional(),
    hobbies: z.array(z.string()).optional(),
    certificates: z.array(
        z.object({
            title: z.string().min(1),
            description: z.string().optional()
        })
    )
})