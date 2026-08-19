"use client";
import { useState } from "react";
import { SectionCard } from "@/components/Dashboard/build/section-card";
import { Briefcase } from "lucide-react";
import AddBtn from "@/components/Dashboard/build/add-btn";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function ExperienceSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  const handleAdd = () =>
    append({
      id: crypto.randomUUID(),
      primary: "",
      secondary: "",
      startYear: "",
      endYear: "",
      description: "",
    });

  return (
    <div className="w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <div className="flex gap-2 mb-6">
        <div className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
          <Briefcase color="#5B5FEF" />
        </div>
        <div>
          <div className="text-lg font-bold">Experience</div>
          <div className="text-xs tracking-wider font-light text-foreground-subtle">
            Show the roles, responsibilities, and impact that matter most.
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
            type="experience"
            index={index} 
            onDelete={() => remove(index)}
          />
        </div>
      ))}

      <div className="w-full flex justify-center items-center">
        <AddBtn text="Experience" onAdd={handleAdd} />
      </div>
    </div>
  );
}
