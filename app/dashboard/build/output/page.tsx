"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useResumeStore } from "@/lib/store/resume-store";

export default function OutputPage() {
  const router = useRouter();
  const data = useResumeStore((state) => state.data);

  useEffect(() => {
    if (!data) {
      // no data in store — user landed here directly, bounce back
      router.replace("/dashboard/build");
    }
  }, [data, router]);

  if (!data) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Output Preview</h1>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}