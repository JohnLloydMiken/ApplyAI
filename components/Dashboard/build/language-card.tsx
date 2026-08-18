"use client";

import { useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/config/languages";

export interface LanguageItem {
  id: string;
  code: string;        // ISO 639-1, e.g. "en"
  proficiency: string; // "basic" | "conversational" | "fluent" | "native"
}

const PROFICIENCY_LEVELS = [
  { value: "basic", label: "Basic" },
  { value: "conversational", label: "Conversational" },
  { value: "fluent", label: "Fluent" },
  { value: "native", label: "Native" },
] as const;

interface LanguageCardProps {
  item: LanguageItem;
  onChange: (id: string, field: keyof LanguageItem, value: string) => void;
  onDelete: () => void;
}

export function LanguageCard({ item, onChange, onDelete }: LanguageCardProps) {
  const [open, setOpen] = useState(false);
  const selected = LANGUAGES.find((l) => l.code === item.code);

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
            <FieldLabel htmlFor={`language-${item.id}`}>Language</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={`language-${item.id}`}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                >
                  {selected ? selected.name : "Select language..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {LANGUAGES.map((lang) => (
                        <CommandItem
                          key={lang.code}
                          value={lang.name}
                          onSelect={() => {
                            onChange(item.id, "code", lang.code);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item.code === lang.code ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {lang.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <FieldLabel htmlFor={`proficiency-${item.id}`}>Proficiency</FieldLabel>
            <Select
              value={item.proficiency}
              onValueChange={(value) => onChange(item.id, "proficiency", value)}
            >
              <SelectTrigger id={`proficiency-${item.id}`} className="w-full">
                <SelectValue placeholder="Select proficiency..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {PROFICIENCY_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  );
}