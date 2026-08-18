"use client";

import * as React from "react";
import { TagsInput } from "@/components/ui/tags-input";
import { Tag } from "@/lib/config/tags-config";
import { skills } from "@/lib/config/tags-config";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Toolbox } from "lucide-react";
export default function SkillsSection() {
  const [selectedSkills, setSelectedSkills] = React.useState<Tag[]>([
    skills[0],
    skills[1],
    skills[2],
  ]);

  return (
    <div className="w-9/12 border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <form>
        <FieldSet>
          <FieldGroup>
            <Field>
              <div className="flex gap-2 mb-6">
                <FieldLabel className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
                  <Toolbox color="#5B5FEF" />
                </FieldLabel>
                <div>
                  <FieldLabel className="text-lg font-bold">
                    Skills
                  </FieldLabel>
                  <FieldLabel className="text-xs tracking-wider font-light text-foreground-subtle">
                    Add the tools, technologies, and strengths you want highlighted.
                  </FieldLabel>
                </div>
              </div>

              <FieldLabel className="text-base font-bold">Your Skills</FieldLabel>
              <TagsInput
                value={selectedSkills}
                onChange={setSelectedSkills}
                suggestions={skills}
                placeholder="Type a skill and press Enter..."
              />
              <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
                Tip: add skills individually so AI can prioritize the most relevant ones.
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
