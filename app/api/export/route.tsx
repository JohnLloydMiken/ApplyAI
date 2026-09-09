import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { RESUME_RENDERERS } from "@/lib/renders/registry";
import { RenderableResume } from "@/lib/templates/types";

export const runtime = "nodejs"; // required — react-pdf/docx don't run on edge
export const maxDuration = 30; // bump on Vercel Pro if renders are slow; Hobby caps at 10s

export async function POST(req: NextRequest) {
  const { templateId, format, data } = (await req.json()) as {
    templateId: string;
    format: "pdf" | "docx";
    data: RenderableResume;
  };

  const renderer = RESUME_RENDERERS[templateId];

  if (!renderer) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }

  if (format === "pdf") {
    const buffer = await renderToBuffer(<renderer.Pdf data={data} />);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"`,
      },
    });
  }

  return NextResponse.json({ error: "Invalid format" }, { status: 400 });
}
