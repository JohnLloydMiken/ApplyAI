import React from 'react'
import { Button } from '@/components/ui/button'

interface AddProps {
  text: string,
  onAdd: () => void
}

export default function AddBtn({ text, onAdd }: AddProps) {
  return (
    <Button
      type="button"
      onClick={onAdd}
      className='w-1/2 bg-primary-light border border-dashed border-primary p-5 group cursor-pointer'
    >
      <span className='text-primary text-base font-bold font-sans group-hover:text-primary-light'>
        Add another {text}
      </span>
    </Button>
  )
}