// app/dashboard/build/output/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/lib/store/resume-store";
import { buildRenderableResume } from "@/lib/templates/build-renderable";
export default function OutputPage() {
  const router = useRouter();
  const formData = useResumeStore((state) => state.data);
  const result = useResumeStore((state) => state.generatedResume);
  const setGeneratedResume = useResumeStore(
    (state) => state.setGeneratedResume,
  );

  const [loading, setLoading] = useState(!result);
  const [error, setError] = useState<string | null>(null);
  const templateId = useResumeStore((state) => state.templateId);

  const renderableResume = useMemo(() => {
    if (!formData || !result) return null;
    return buildRenderableResume(formData, result);
  }, [formData, result]);

  useEffect(() => {
    if (renderableResume) {
      console.log("✅ renderableResume:", renderableResume);
      console.log("✅ templateId:", templateId);
    }
  }, [renderableResume, templateId]);
  useEffect(() => {
    if (!formData) {
      router.push("/dashboard/build");
      return;
    }

    if (result) {
      // already generated in this session — don't burn another API call
      setLoading(false);
      return;
    }

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/generate-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Generation failed");
        }

        setGeneratedResume(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [formData, result, router, setGeneratedResume]);

  async function downloadResume(format: "pdf" | "docx") {
    if (!renderableResume || !templateId) return;

    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId, format, data: renderableResume }),
    });

    if (!res.ok) {
      console.error("Export failed:", await res.text());
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-foreground-subtle">Generating your resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.push("/dashboard/build")}
          className="bg-accent text-white rounded-2xl px-4 py-2"
        >
          Go back
        </button>
      </div>
    );
  }

  if (!result) return null;
  if (!formData) return null;
  console.log(formData);
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex gap-3">
        <button
          onClick={() => downloadResume("pdf")}
          className="bg-accent text-white rounded-2xl px-4 py-2"
        >
          Download PDF
        </button>
        <button
          onClick={() => downloadResume("docx")}
          className="bg-accent text-white rounded-2xl px-4 py-2"
        >
          Download DOCX
        </button>
      </div>
      {result.flaggedGaps.length > 0 && (
        <div className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
          <p className="font-medium mb-1">
            A few sections could use more detail:
          </p>
          <ul className="list-disc list-inside">
            {result.flaggedGaps.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      )}
      <section>
        <h2 className="text-lg font-bold mb-2">Personal Info</h2>
        <p className="font-medium">{formData.fullName}</p>
        {formData.age && <p className="text-sm">{formData.age} years old</p>}
        {formData.dateOfBirth && (
          <p className="text-sm">{formData.dateOfBirth}</p>
        )}
        {formData.nationality && (
          <p className="text-sm">{formData.nationality}</p>
        )}
        {formData.address && <p className="text-sm">{formData.address}</p>}
        {formData.phone && <p className="text-sm">{formData.phone}</p>}
        {formData.email && <p className="text-sm">{formData.email}</p>}
        {formData.links && formData.links.length > 0 && (
          <ul className="text-sm mt-1">
            {formData.links.map((link) => (
              <li key={link.id}>
                {link.label}:{" "}
                <a href={link.url} className="text-accent underline">
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-lg font-bold mb-2">Summary</h2>
        <p>{result.summary}</p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">Skills</h2>
        {result.skills.technical.length > 0 && (
          <p>
            <span className="font-medium">Technical:</span>{" "}
            {result.skills.technical.join(", ")}
          </p>
        )}
        {result.skills.tools.length > 0 && (
          <p>
            <span className="font-medium">Tools:</span>{" "}
            {result.skills.tools.join(", ")}
          </p>
        )}
        {result.skills.soft.length > 0 && (
          <p>
            <span className="font-medium">Soft skills:</span>{" "}
            {result.skills.soft.join(", ")}
          </p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">Experience</h2>
        <div className="space-y-4">
          {result.experience.map((exp) => (
            <div key={exp.id}>
              <p className="font-medium">
                {exp.role} — {exp.company}
              </p>
              <p className="text-xs text-foreground-subtle">
                {exp.startYear} – {exp.endYear}
              </p>
              <ul className="list-disc list-inside mt-1">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">Education</h2>
        <div className="space-y-2">
          {result.education.map((edu) => (
            <div key={edu.id}>
              <p className="font-medium">
                {edu.degree} — {edu.school}
              </p>
              <p className="text-xs text-foreground-subtle">
                {edu.startYear} – {edu.endYear}
              </p>
              {edu.highlight && <p className="text-sm">{edu.highlight}</p>}
            </div>
          ))}
        </div>
      </section>

      {result.keywordsMatched.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2">
            Matched keywords from job posting
          </h2>
          <p className="text-sm text-foreground-subtle">
            {result.keywordsMatched.join(", ")}
          </p>
        </section>
      )}
    </div>
  );
}
