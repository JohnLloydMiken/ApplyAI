// lib/ai/resume-generation-tool.ts

export const generateResumeContentTool = {
  name: "generate_resume_content",
  description: "Generate polished, ATS-friendly resume content based on the user's raw input and target job.",
  input_schema: {
    type: "object" as const,
    properties: {
      summary: {
        type: "string",
        description: "2-4 sentence professional summary, tailored to the target role. No fabricated claims.",
      },
      skills: {
        type: "object",
        properties: {
          technical: { type: "array", items: { type: "string" } },
          tools: { type: "array", items: { type: "string" } },
          soft: { type: "array", items: { type: "string" } },
        },
        required: ["technical", "tools", "soft"],
      },
      experience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            role: { type: "string" },
            company: { type: "string" },
            startYear: { type: "string" },
            endYear: { type: "string" },
            bullets: {
              type: "array",
              items: { type: "string" },
              description: "3-5 achievement-oriented bullet points. Quantify only if the user provided numbers; otherwise describe scope/impact qualitatively without inventing metrics.",
            },
          },
          required: ["id", "role", "company", "startYear", "endYear", "bullets"],
        },
      },
      education: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            school: { type: "string" },
            degree: { type: "string" },
            startYear: { type: "string" },
            endYear: { type: "string" },
            highlight: {
              type: "string",
              description: "Optional one-line highlight (honors, relevant coursework). Empty string if nothing notable was provided.",
            },
          },
          required: ["id", "school", "degree", "startYear", "endYear", "highlight"],
        },
      },
      keywordsMatched: {
        type: "array",
        items: { type: "string" },
        description: "Keywords/skills from the job description that were found in or reasonably inferred from the user's actual background. Do not include keywords with no basis in the input.",
      },
      flaggedGaps: {
        type: "array",
        items: { type: "string" },
        description: "Short notes on entries where input was too thin to generate strong content (e.g. 'Experience at ABC Corp had no description — bullets are generic; consider adding specifics').",
      },
    },
    required: ["summary", "skills", "experience", "education", "keywordsMatched", "flaggedGaps"],
  },
};