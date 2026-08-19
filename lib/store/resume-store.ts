// lib/store/resume-store.ts
import { create } from "zustand";
import { z } from "zod";
import { resumeFormSchema } from "@/lib/templates/schema";

type ResumeFormData = z.infer<typeof resumeFormSchema>;

interface ResumeStore {
  data: ResumeFormData | null;
  setData: (data: ResumeFormData) => void;
  clear: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  clear: () => set({ data: null }),
}));