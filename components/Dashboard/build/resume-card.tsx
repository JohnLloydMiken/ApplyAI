"use client";

import Image from "next/image";
import { Check, X, Sparkles, UserCheck, LayoutTemplate } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TemplateMeta } from "@/lib/resume-templates/general-template";

interface TemplateCardProps {
  template: TemplateMeta;
  onSelect?: (template: TemplateMeta) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const { name, thumbnailUrl, isAtsSafe, description, photoSupport, layout, tags } = template;

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-card hover:-translate-y-1">
      {/* ── Image & Overlay Container ── */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
        <Image
          src={thumbnailUrl}
          alt={`${name} resume template preview`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

        {/* Top Badges Layer */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          {/* ATS Status Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant={isAtsSafe ? "default" : "secondary"}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-md transition-colors ${
                    isAtsSafe
                      ? "bg-emerald-500/90 hover:bg-emerald-600 text-white border-emerald-400/30"
                      : "bg-background/80 hover:bg-background/90 text-muted-foreground border-border"
                  }`}
                >
                  {isAtsSafe ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>ATS Friendly</span>
                    </>
                  ) : (
                    <>
                      <X className="h-3.5 w-3.5 text-destructive" />
                      <span>Standard Layout</span>
                    </>
                  )}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {isAtsSafe
                  ? "Optimized for Applicant Tracking System parsers"
                  : "Designed for visual impact; best sent directly to recruiters"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Photo Support Icon Indicator */}
          {photoSupport !== "none" && (
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-md text-foreground text-xs gap-1 capitalize border-border"
            >
              <UserCheck className="h-3 w-3" />
              {photoSupport} Photo
            </Badge>
          )}
        </div>

        {/* Hover Quick Action Button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-background/20 backdrop-blur-[2px]">
          <Button
            onClick={() => onSelect?.(template)}
            className="shadow-btn bg-primary text-primary-foreground hover:bg-primary-hover font-medium gap-2 scale-95 group-hover:scale-100 transition-transform"
          >
            <Sparkles className="h-4 w-4" /> Use Template
          </Button>
        </div>
      </div>

      {/* ── Content Section ── */}
      <CardHeader className="p-4 pb-2 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground line-clamp-1">
            {name}
          </CardTitle>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground shrink-0"
          >
            <LayoutTemplate className="h-3 w-3 mr-1 inline" />
            {layout.replace("-", " ")}
          </Badge>
        </div>

        <CardDescription className="text-xs text-muted-foreground  leading-relaxed h-8">
          {description || "A clean, professionally crafted layout for modern resumes."}
        </CardDescription>
      </CardHeader>

      {/* ── Optional Filter Tags ── */}
      {tags && tags.length > 0 && (
        <CardContent className="px-4 py-0 pb-3 flex flex-wrap gap-1 bg-pr">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-primary px-2 py-0.5 text-[11px] font-medium text-white"
            >
              #{tag}
            </span>
          ))}
        </CardContent>
      )}

      {/* ── Action Footer ── */}
      <CardFooter className="p-4 pt-2 mt-auto border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-medium hover:bg-accent hover:text-accent-foreground"
          onClick={() => onSelect?.(template)}
        >
          Select Template
        </Button>
      </CardFooter>
    </Card>
  );
}