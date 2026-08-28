// lib/templates/form-sections/PhotoUploadSection.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { resumeFormSchema } from '@/lib/templates/schema'

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
    <div className="space-y-2">
      <label htmlFor="image" className="block text-sm font-medium mb-1">
        Photo
      </label>
      <input
        id="image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm"
      />

      {(previewUrl || photo) && (
        <div className="relative w-40 h-40 border rounded overflow-hidden">
          <Image
            src={previewUrl ?? photo!}
            alt="Preview"
            fill
            className="object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs">
              Uploading...
            </div>
          )}
        </div>
      )}

      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
      {errors.photo && (
        <p className="text-sm text-red-600">{errors.photo.message as string}</p>
      )}
    </div>
  )
}