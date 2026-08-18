"use client"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { NotepadText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function SummarySections() {
  return (
    <div className="w-9/12 border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <form>
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
               <Textarea
                  id=""
                  placeholder="Add any additional comments"
                  className="resize-none min-h-40"
                />
                <FieldLabel className="text-xs font-light text-foreground-subtle mt-2">Don’t worry about perfect wording. AI can improve it later.</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
