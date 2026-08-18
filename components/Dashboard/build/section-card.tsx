import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface SectionItem {
  id: string;
  primary: string;   // School or Job Role
  secondary: string; // Degree or Company
  startYear: string;
  endYear: string;
  description?: string; // Achievements or Job description
}

interface SectionCardProps {
  type: "education" | "experience";
  item: SectionItem;
  onChange: (id: string, field: keyof SectionItem, value: string) => void;
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

export function SectionCard({ type, item, onChange, onDelete }: SectionCardProps) {
  const t = copy[type];

  return (
    <FieldSet className="w-full relative">
      <div className="flex justify-end">
        <Button onClick={onDelete} className="max-w-sm cursor-pointer">
          <Trash2 />
          Delete
        </Button>
      </div>

      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor={`primary-${item.id}`}>{t.primaryLabel}</FieldLabel>
            <Input
              id={`primary-${item.id}`}
              type="text"
              placeholder={t.primaryPlaceholder}
              value={item.primary}
              onChange={(e) => onChange(item.id, "primary", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`secondary-${item.id}`}>{t.secondaryLabel}</FieldLabel>
            <Input
              id={`secondary-${item.id}`}
              type="text"
              placeholder={t.secondaryPlaceholder}
              value={item.secondary}
              onChange={(e) => onChange(item.id, "secondary", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`start-year-${item.id}`}>Start year</FieldLabel>
            <Input
              id={`start-year-${item.id}`}
              type="text"
              placeholder="2022"
              value={item.startYear}
              onChange={(e) => onChange(item.id, "startYear", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`end-year-${item.id}`}>End year</FieldLabel>
            <Input
              id={`end-year-${item.id}`}
              type="text"
              placeholder="2026"
              value={item.endYear}
              onChange={(e) => onChange(item.id, "endYear", e.target.value)}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor={`description-${item.id}`}>
            {t.descriptionLabel}{" "}
            <span className="text-foreground-subtle">{"(Optional)"}</span>
          </FieldLabel>
          <Input
            id={`description-${item.id}`}
            type="text"
            placeholder={t.descriptionPlaceholder}
            value={item.description ?? ""}
            onChange={(e) => onChange(item.id, "description", e.target.value)}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}