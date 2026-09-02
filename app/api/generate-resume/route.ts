import { NextRequest, NextResponse } from "next/server";
import { resumeFormSchema } from "@/lib/templates/schema";
import { generateResumeContent } from "@/lib/ai/generate-resume";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = resumeFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid resume data", details: parsed.error.format() },
      { status: 400 },
    );
  }

  try {
    const result = await generateResumeContent(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Resume generation failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 500 },
    );
  }
}
