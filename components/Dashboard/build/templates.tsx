"use client"
import React from 'react'
import { TEMPLATES, TemplateMeta } from '@/lib/resume-templates/general-template'
import { TemplateCard } from './resume-card'
import { useRouter } from 'next/navigation'
export default function TemplatePreview() {

  const router = useRouter()
  const handleResumeTemplate = (template: TemplateMeta)=>{
    router.push(`/dashboard/build/form/${template.id}`)
  }
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10">
      <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Resume Templates
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose from ATS-optimized single-column formats or modern creative layouts designed for impact.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleResumeTemplate}
          />
        ))}
      </div>
    </section>
  )
}
