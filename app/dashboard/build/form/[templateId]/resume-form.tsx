"use client";

import { useResumeStore } from "@/lib/store/resume-store";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resumeFormSchema } from "@/lib/templates/schema";
import { useRouter } from "next/navigation";
export function ResumeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<z.infer<typeof resumeFormSchema>>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      summary: "",
      skills: [],
      education: [],
      experience: [],
      hobbies: [],
      certificates: [],
      languages: [],
    },
  });

  const router = useRouter();
  const setData = useResumeStore((state) => state.setData);
  const onSubmit = methods.handleSubmit(
    (data) => {
      setData(data);
      router.push("/dashboard/build/output"); // note: fixed "ouput" typo
    },
    (errors) => {
      console.log("❌ Validation errors:", errors);
    },
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="space-y-8">
          {children}
          <button
            type="submit"
            className="cursor-pointer bg-accent text-white rounded-2xl p-3"
          >
            Generate Resume
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
