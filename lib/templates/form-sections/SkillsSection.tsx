"use client";
import { Controller, useFormContext } from "react-hook-form";
import { TagsInput } from "@/components/ui/tags-input";
import { Tag } from "@/lib/config/tags-config";
import { skills } from "@/lib/config/tags-config";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Wrench } from "lucide-react"; // verify correct icon name

export default function SkillsSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <FieldSet>
        <FieldGroup>
          <Field>
            <div className="flex gap-2 mb-6">
              <FieldLabel className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
                <Wrench color="#5B5FEF" />
              </FieldLabel>
              <div>
                <FieldLabel className="text-lg font-bold">Skills</FieldLabel>
                <FieldLabel className="text-xs tracking-wider font-light text-foreground-subtle">
                  Add the tools, technologies, and strengths you want highlighted.
                </FieldLabel>
              </div>
            </div>

            <FieldLabel className="text-base font-bold">Your Skills</FieldLabel>

            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <TagsInput
                  value={skills.filter((tag) => field.value?.includes(tag.label))}
                  onChange={(tags: Tag[]) => field.onChange(tags.map((tag) => tag.label))}
                  suggestions={skills}
                  placeholder="Type a skill and press Enter..."
                />
              )}
            />

            {errors.skills && (
              <p className="text-xs text-red-500 mt-1">
                {errors.skills.message as string}
              </p>
            )}

            <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
              Tip: add skills individually so AI can prioritize the most relevant ones.
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}