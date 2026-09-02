// lib/ai/generate-resume.ts
import Anthropic from "@anthropic-ai/sdk";
import { generateResumeContentTool } from "./resume-generation-tool";
import { computeYearsOfExperience, seniorityLabel } from "./derive-signals";
import type { z } from "zod";
import type { resumeFormSchema } from "@/lib/templates/schema";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

type ResumeFormData = z.infer<typeof resumeFormSchema>;

export async function generateResumeContent(formData: ResumeFormData & { jobDescription?: string }) {
  const years = computeYearsOfExperience(formData.experience ?? []);
  const seniority = seniorityLabel(years);

  const systemPrompt = `You are a professional resume writer. You produce ATS-friendly, honest resume content based strictly on the information the user provides.

Rules:
- NEVER invent specific metrics, numbers, or achievements the user didn't mention. If they gave no numbers, write qualitatively (scope, responsibility, outcome) without fabricating figures.
- If an experience or education entry has no description, generate conservative, role-appropriate bullets based only on the job title/company/dates — and add a note to flaggedGaps explaining the bullets are generic due to missing input.
- Write in a tone appropriate for a ${seniority} candidate (~${years} years of experience).
- If a job description is provided, prioritize and rephrase relevant experience/skills toward it, and list matched keywords in keywordsMatched. Do not claim skills the user never listed.
- Use standard resume section conventions. Avoid tables, special characters, or formatting that breaks ATS parsers.
- Always respond by calling the generate_resume_content tool. Do not respond in plain text.`;

  const userPrompt = `Target role: ${formData.targetRole ?? "Not specified"}

${formData.jobDescription ? `Job description to tailor against:\n${formData.jobDescription}\n` : "No specific job description provided — write a general strong resume for the target role.\n"}

Candidate's raw input:

Summary (user's own words, may be rough): ${formData.summary || "(none provided)"}

Skills: ${(formData.skills ?? []).join(", ") || "(none provided)"}

Experience:
${(formData.experience ?? [])
  .map(
    (exp) =>
      `- ${exp.primary} at ${exp.secondary} (${exp.startYear}–${exp.endYear}): ${
        exp.description || "(no description provided)"
      }`
  )
  .join("\n") || "(none provided)"}

Education:
${(formData.education ?? [])
  .map(
    (edu) =>
      `- ${edu.secondary} from ${edu.primary} (${edu.startYear}–${edu.endYear}): ${
        edu.description || "(no additional detail provided)"
      }`
  )
  .join("\n") || "(none provided)"}

Languages: ${(formData.languages ?? []).map((l) => `${l.code} (${l.proficiency})`).join(", ") || "(none)"}
Hobbies: ${(formData.hobbies ?? []).join(", ") || "(none)"}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: systemPrompt,
    tools: [generateResumeContentTool],
    tool_choice: { type: "tool", name: "generate_resume_content" },
    messages: [{ role: "user", content: userPrompt }],
  });

  const toolUse = response.content.find((block) => block.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Claude did not return structured resume content");
  }

  return toolUse.input; // matches generateResumeContentTool's input_schema shape
}