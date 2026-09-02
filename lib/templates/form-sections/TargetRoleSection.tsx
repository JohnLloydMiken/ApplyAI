"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { UserRoundSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

export default function TargetRoleSection() {
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
                <UserRoundSearch color="#5B5FEF" />
              </FieldLabel>
              <div>
                <FieldLabel className="text-lg font-bold">Target Role</FieldLabel>
                <FieldLabel className="text-xs tracking-wider font-light text-foreground-subtle">
                  What role are you aiming for? This helps AI tailor your resume.
                </FieldLabel>
              </div>
            </div>

            <FieldLabel className="text-base font-bold">Role / Industry</FieldLabel>

            <Controller
              name="targetRole"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="e.g. Senior Backend Engineer, Marketing Manager"
                />
              )}
            />

            {errors.targetRole && (
              <p className="text-xs text-red-500 mt-1">
                {errors.targetRole.message as string}
              </p>
            )}

            <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
              Not sure yet? Leave it general — you can refine this later.
            </FieldLabel>
          </Field>

          <Field className="mt-6">
            <FieldLabel className="text-base font-bold">
              Job description <span className="font-light text-foreground-subtle">(optional)</span>
            </FieldLabel>

            <Controller
              name="jobDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Paste the job posting here — AI will tailor your resume to match it more closely."
                  className="resize-none min-h-32"
                />
              )}
            />

            {errors.jobDescription && (
              <p className="text-xs text-red-500 mt-1">
                {errors.jobDescription.message as string}
              </p>
            )}

            <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
              Got a specific posting in mind? Pasting it in lets AI match your resume's language and skills to what they're looking for.
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}