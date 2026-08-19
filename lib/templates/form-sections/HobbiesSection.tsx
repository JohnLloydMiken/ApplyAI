"use client";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
export default function HubbiesSection() {
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
                  <FieldLabel className="text-lg font-bold">
                    Hobbies & interests
                  </FieldLabel>
                  <FieldLabel className="text-xs tracking-wider font-light text-foreground-subtle">
                    Optional — include interests that add personality or support
                    your story.
                  </FieldLabel>
                </div>
              </div>

              <FieldLabel className="text-base font-bold">
                Hobbies & interests
              </FieldLabel>
              <Input
                type="text"
                placeholder="e.g. Photography , Hiking, Vibe Coding"
              />
              <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
                Don’t worry about perfect wording. AI can improve it later.
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
  
    </div>
  );
}
