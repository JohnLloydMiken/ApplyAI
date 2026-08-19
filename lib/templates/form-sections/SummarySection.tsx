"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { NotepadText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

export default function SummarySections() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <FieldSet>
        <FieldGroup>
          <Field>
            <div className="flex gap-2 mb-6">
              <FieldLabel className="size-12 rounded-lg flex justify-center items-center bg-primary-light">
                <NotepadText color="#5B5FEF" />
              </FieldLabel>
              <div>
                <FieldLabel className="text-lg font-bold">Professional summary</FieldLabel>
                <FieldLabel className="text-xs tracking-wider font-light text-foreground-subtle">
                  A concise introduction to your professional profile.
                </FieldLabel>
              </div>
            </div>

            <FieldLabel className="text-base font-bold">Summary</FieldLabel>

            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Add any additional comments"
                  className="resize-none min-h-40"
                />
              )}
            />

            {errors.summary && (
              <p className="text-xs text-red-500 mt-1">
                {errors.summary.message as string}
              </p>
            )}

            <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">
              Don't worry about perfect wording. AI can improve it later.
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}