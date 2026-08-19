"use client";

import { SectionCard } from "@/components/Dashboard/build/section-card";
import { GraduationCap } from "lucide-react";
import AddBtn from "@/components/Dashboard/build/add-btn";
import { useFormContext, useFieldArray } from "react-hook-form";

export interface SectionItem {
  id: string;
  primary: string; // School or Job Role
  secondary: string; // Degree or Company
  startYear: string;
  endYear: string;
  description?: string; // Achievements or Job description
}

export default function EducationSection() {
  const handleAdd = () =>
    append({
      id: crypto.randomUUID(),
      primary: "",
      secondary: "",
      startYear: "",
      endYear: "",
      description: "",
    });
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  return (
    <div className="w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <div className="flex gap-2 mb-6">
        <div className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
          <GraduationCap color="#5B5FEF" />
        </div>
        <div>
          <div className="text-lg font-bold">Education</div>
          <div className="text-xs tracking-wider font-light text-foreground-subtle">
            Degrees, diplomas, certifications, or relevant academic training.
          </div>
        </div>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className=" p-3 rounded-2xl mb-4"
        >
          <SectionCard
            key={field.id} // useFieldArray gives each row a stable id
            type="education"
            index={index} // ← the important part: pass the array index down
            onDelete={() => remove(index)}
          />
        </div>
      ))}

      <div className="w-full flex justify-center items-center">
        <AddBtn text="Education" onAdd={handleAdd} />
      </div>
    </div>
  );
}
