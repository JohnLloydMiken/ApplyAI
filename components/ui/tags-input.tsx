"use client"

import * as React from "react"
import { X, Check } from "lucide-react"
import { Tag } from "@/lib/config/tags-config"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"



interface TagsInputProps {
  value?: Tag[]
  defaultValue?: Tag[]
  onChange?: (tags: Tag[]) => void

  suggestions?: Tag[]
  placeholder?: string

  maxTags?: number
  disabled?: boolean

  className?: string
}

export function TagsInput({
  value,
  defaultValue = [],
  onChange,
  suggestions = [],
  placeholder = "Type and press Enter...",
  maxTags,
  disabled = false,
  className,
}: TagsInputProps) {
  const [internalTags, setInternalTags] =
    React.useState<Tag[]>(defaultValue)

  const [inputValue, setInputValue] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)

  const tags = value ?? internalTags

  const updateTags = (nextTags: Tag[]) => {
    if (value === undefined) {
      setInternalTags(nextTags)
    }

    onChange?.(nextTags)
  }

  const filteredSuggestions = suggestions.filter((suggestion) => {
    const alreadySelected = tags.some(
      (tag) => tag.id === suggestion.id
    )

    const matchesSearch = suggestion.label
      .toLowerCase()
      .includes(inputValue.toLowerCase())

    return !alreadySelected && matchesSearch
  })

  const addTag = (tag: Tag) => {
    if (disabled) return

    if (maxTags && tags.length >= maxTags) {
      return
    }

    if (tags.some((item) => item.id === tag.id)) {
      return
    }

    updateTags([...tags, tag])
    setInputValue("")
    setIsOpen(false)
  }

  const createTag = () => {
    const trimmed = inputValue.trim()

    if (!trimmed) return

    const existing = suggestions.find(
      (suggestion) =>
        suggestion.label.toLowerCase() === trimmed.toLowerCase()
    )

    if (existing) {
      addTag(existing)
      return
    }

    const newTag: Tag = {
      id: trimmed.toLowerCase().replace(/\s+/g, "-"),
      label: trimmed,
    }

    addTag(newTag)
  }

  const removeTag = (id: string) => {
    updateTags(tags.filter((tag) => tag.id !== id))
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()

      if (filteredSuggestions.length > 0) {
        addTag(filteredSuggestions[0])
      } else {
        createTag()
      }

      return
    }

    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      tags.length > 0
    ) {
      removeTag(tags[tags.length - 1].id)
    }

    if (event.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5",
          "rounded-md border border-input bg-white px-2 py-1.5",
          "text-sm ring-offset-background",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={() => {
          if (!disabled) {
            document
              .getElementById("tags-input")
              ?.focus()
          }
        }}
      >
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="h-7 gap-1 rounded-md bg-blue-50 px-2 text-xs font-medium text-blue-700 hover:bg-blue-50"
          >
            {tag.label}

            <button
              type="button"
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation()
                removeTag(tag.id)
              }}
              className="rounded-sm outline-none hover:text-blue-950 focus:ring-1 focus:ring-ring"
              aria-label={`Remove ${tag.label}`}
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}

        <input
          id="tags-input"
          value={inputValue}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ""}
          onChange={(event) => {
            setInputValue(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (inputValue) {
              setIsOpen(true)
            }
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-w-35 flex-1 bg-transparent px-1 py-1",
            "text-sm outline-none placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed"
          )}
        />
      </div>

      {isOpen && !disabled && inputValue && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md">
          <Command>
            <CommandList>
              {filteredSuggestions.length === 0 ? (
                <CommandEmpty>
                  Press Enter to create "{inputValue}"
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.id}
                      value={suggestion.label}
                      onSelect={() => addTag(suggestion)}
                    >
                      <Check className="mr-2 size-4 opacity-0" />
                      {suggestion.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}