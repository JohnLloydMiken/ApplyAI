"use client";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface SectionCardProps {
  type: "education" | "experience";
  index: number;          // ← which row in the array
  onDelete: () => void;
}

const copy = {
  education: {
    primaryLabel: "School / University",
    primaryPlaceholder: "e.g. Tarlac State University",
    secondaryLabel: "Degree / Field of study",
    secondaryPlaceholder: "e.g. Bachelor of Science in Computer Science",
    descriptionLabel: "Achievements",
    descriptionPlaceholder: "e.g. Dean's List, Cum Laude",
  },
  experience: {
    primaryLabel: "Job Role",
    primaryPlaceholder: "e.g. Frontend Developer",
    secondaryLabel: "Company",
    secondaryPlaceholder: "e.g. Acme Corp",
    descriptionLabel: "Job Description",
    descriptionPlaceholder: "e.g. Led a team of 5 engineers on...",
  },
} as const;

export function SectionCard({ type, index, onDelete }: SectionCardProps) {
  const t = copy[type];
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // errors for THIS specific row, e.g. errors.education[2].primary
  const rowErrors = (errors[type] as any)?.[index];

  return (
    <FieldSet className="w-full relative border border-border p-6 rounded-3xl">
      <div className="flex justify-end">
        <Button type="button" onClick={onDelete} className="max-w-sm cursor-pointer">
          <Trash2 />
          Delete
        </Button>
      </div>

      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor={`${type}.${index}.primary`}>
              {t.primaryLabel}
            </FieldLabel>
            <Controller
              name={`${type}.${index}.primary`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder={t.primaryPlaceholder} />
              )}
            />
            {rowErrors?.primary && (
              <p className="text-xs text-red-500 mt-1">{rowErrors.primary.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor={`${type}.${index}.secondary`}>
              {t.secondaryLabel}
            </FieldLabel>
            <Controller
              name={`${type}.${index}.secondary`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder={t.secondaryPlaceholder} />
              )}
            />
            {rowErrors?.secondary && (
              <p className="text-xs text-red-500 mt-1">{rowErrors.secondary.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor={`${type}.${index}.startYear`}>Start year</FieldLabel>
            <Controller
              name={`${type}.${index}.startYear`}
              control={control}
              render={({ field }) => <Input {...field} placeholder="2022" />}
            />
            {rowErrors?.startYear && (
              <p className="text-xs text-red-500 mt-1">{rowErrors.startYear.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor={`${type}.${index}.endYear`}>End year</FieldLabel>
            <Controller
              name={`${type}.${index}.endYear`}
              control={control}
              render={({ field }) => <Input {...field} placeholder="2026" />}
            />
            {rowErrors?.endYear && (
              <p className="text-xs text-red-500 mt-1">{rowErrors.endYear.message}</p>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor={`${type}.${index}.description`}>
            {t.descriptionLabel} <span className="text-foreground-subtle">(Optional)</span>
          </FieldLabel>
          <Controller
            name={`${type}.${index}.description`}
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t.descriptionPlaceholder} />
            )}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}