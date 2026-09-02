"use client";
import { useState, useEffect } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

export default function HubbiesSection() {
  const { control } = useFormContext();

  return (
    <div className="w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <FieldSet>
        <FieldGroup>
          <Field>
            <div className="flex gap-2 mb-6">
              <FieldLabel className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
                <Heart color="#5B5FEF" />
              </FieldLabel>
              <div>
                <FieldLabel className="text-lg font-bold">Hobbies & interests</FieldLabel>
                <FieldLabel className="text-xs tracking-wider font-light text-foreground-subtle">
                  Optional — include interests that add personality or support your story.
                </FieldLabel>
              </div>
            </div>

            <FieldLabel className="text-base font-bold">Hobbies & interests</FieldLabel>
            <Controller
              name="hobbies"
              control={control}
              render={({ field }) => {
                // local raw text so commas/spaces aren't stripped mid-typing
                const [text, setText] = useState(field.value?.join(", ") ?? "");

                // keep local text in sync if form value changes externally
                // (e.g. reset, or store hydration)
                useEffect(() => {
                  setText(field.value?.join(", ") ?? "");
                }, [field.value]);

                return (
                  <Input
                    type="text"
                    placeholder="e.g. Photography, Hiking, Vibe Coding"
                    value={text}
                    onChange={(e) => setText(e.target.value)} // just update raw text, no parsing yet
                    onBlur={() => {
                      // parse into array only when user leaves the field
                      const parsed = text
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean);
                      field.onChange(parsed);
                      field.onBlur();
                    }}
                  />
                );
              }}
            />
            <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
              Don't worry about perfect wording. AI can improve it later.
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}