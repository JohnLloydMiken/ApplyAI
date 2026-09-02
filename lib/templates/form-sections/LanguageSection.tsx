"use client"

import AddBtn from "@/components/Dashboard/build/add-btn";
import { Languages } from "lucide-react";
import { LanguageCard } from "@/components/Dashboard/build/language-card";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function LanguageSection() {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "languages",
  });

  function handleAdd() {
    append({ id: crypto.randomUUID(), code: "", proficiency: "" });
  }

  function handleChange(id: string, field: string, value: string) {
    const index = fields.findIndex((f: any) => f.id === id);
    if (index === -1) return;
    update(index, { ...fields[index], [field]: value });
  }

  return (
    <div className="w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <div className="flex gap-2 mb-6">
        <div className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
          <Languages color="#5B5FEF" />
        </div>
        <div>
          <div className="text-lg font-bold">Languages</div>
          <div className="text-xs tracking-wider font-light text-foreground-subtle">
            List the languages you speak and how well you know them.
          </div>
        </div>
      </div>

      {fields.length > 0 && (
        <div className="flex flex-col gap-6 mb-6">
          {fields.map((item: any, index) => (
            <LanguageCard
              key={item.id}
              item={item}
              onChange={handleChange}
              onDelete={() => remove(index)}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-center items-center">
        <AddBtn text="Language" onAdd={handleAdd} />
      </div>
    </div>
  )
}