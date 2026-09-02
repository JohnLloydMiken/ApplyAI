// lib/store/resume-store.ts
import { create } from "zustand";
import { z } from "zod";
import { resumeFormSchema } from "@/lib/templates/schema";
import type { GeneratedResume } from "../ai/resume-output-schema";

type ResumeFormData = z.infer<typeof resumeFormSchema>;

interface ResumeStore {
  data: ResumeFormData | null;
  setData: (data: ResumeFormData) => void;
  generatedResume: GeneratedResume | null;
  setGeneratedResume: (data: GeneratedResume | null) => void;
  clear: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  generatedResume: null,
  setGeneratedResume: (generatedResume) => set({ generatedResume }),
  clear: () => set({ data: null, generatedResume: null }),
}));