"use client"

import { useState } from "react";
import AddBtn from "@/components/Dashboard/build/add-btn";
import { Languages } from "lucide-react";
import { LanguageCard, type LanguageItem } from "@/components/Dashboard/build/language-card";

export default function LanguageSection() {
  const [items, setItems] = useState<LanguageItem[]>([]);

  function handleAdd() {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), code: "", proficiency: "" },
    ]);
  }

  function handleChange(id: string, field: keyof LanguageItem, value: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
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

      {items.length > 0 && (
        <div className="flex flex-col gap-6 mb-6">
          {items.map((item) => (
            <LanguageCard
              key={item.id}
              item={item}
              onChange={handleChange}
              onDelete={() => handleDelete(item.id)}
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