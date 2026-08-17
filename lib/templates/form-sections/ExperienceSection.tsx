"use client";
import { useState } from "react";
import { SectionCard, SectionItem } from "@/components/Dashboard/build/section-card";
import { Briefcase } from "lucide-react";
import AddBtn from "@/components/Dashboard/build/add-btn";

function createEmptyItem(): SectionItem {
  return {
    id: crypto.randomUUID(),
    primary: "",
    secondary: "",
    startYear: "",
    endYear: "",
    description: "",
  };
}

export default function ExperienceSection() {
  const [items, setItems] = useState<SectionItem[]>([]);

  const handleAdd = () => setItems((prev) => [...prev, createEmptyItem()]);
  const handleDelete = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));
  const handleChange = (id: string, field: keyof SectionItem, value: string) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

  return (
    <div className="w-9/12 border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
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

      {items.map((item) => (
        <div key={item.id} className="border border-border p-3 rounded-2xl mb-4">
          <SectionCard
            type="experience"
            item={item}
            onChange={handleChange}
            onDelete={() => handleDelete(item.id)}
          />
        </div>
      ))}

      <div className="w-full flex justify-center items-center">
        <AddBtn text="Experience" onAdd={handleAdd} />
      </div>
    </div>
  );
}