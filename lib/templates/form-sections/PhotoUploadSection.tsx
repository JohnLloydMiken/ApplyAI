// lib/templates/form-sections/PhotoUploadSection.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { resumeFormSchema } from '@/lib/templates/schema'
import { Upload, Image as ImageIcon, HelpCircle } from 'lucide-react'

type FormValues = z.infer<typeof resumeFormSchema>

export default function ImageUploadForm() {
  const { setValue, watch, formState: { errors } } =
    useFormContext<FormValues>()

  const photo = watch('photo')

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)

    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // write the URL into react-hook-form state, validate against the zod schema
      setValue('photo', data.url, { shouldValidate: true, shouldDirty: true })
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Something went wrong')
      setPreviewUrl(null)
      setValue('photo', '', { shouldValidate: true })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3 w-full border border-border p-6 shadow-(--shadow-card) bg-white rounded-4xl">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Upload className="h-4 w-4 text-primary" />
        </div>
        <label htmlFor="image" className="block text-sm font-medium text-foreground">
          Upload Your Image
        </label>
        <div className="ml-auto">
          <HelpCircle className="h-3.5 w-3.5 text-foreground-subtle cursor-help" />
        </div>
      </div>

      <div className="text-xs text-foreground-muted -mt-1 mb-2 ml-10">
        Upload a professional headshot or profile image (JPEG, PNG, WebP). Recommended size: 400x400px.
      </div>

      <div className="relative group">
        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface-2 text-foreground transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-light file:text-primary hover:file:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 cursor-pointer"
        />
        <div className="absolute inset-0 pointer-events-none rounded-lg bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {(previewUrl || photo) && (
        <div className="relative w-40 h-40 mt-4 border border-border rounded-xl overflow-hidden shadow-card hover:shadow-float transition-all duration-200">
          <Image
            src={previewUrl ?? photo!}
            alt="Preview"
            fill
            className="object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xs font-medium">
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Uploading...
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1 mt-2">
        {uploadError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{uploadError}</span>
          </div>
        )}
        {errors.photo && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{errors.photo.message as string}</span>
          </div>
        )}
      </div>
    </div>
  )
}