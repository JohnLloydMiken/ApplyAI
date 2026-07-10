// carousel.tsx
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Sparkles, Target, FileCheck2, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Slide {
  icon: React.ElementType;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    icon: Sparkles,
    title: "AI writes it for you",
    description:
      "Answer a few questions and get a polished, professional resume in under two minutes — no blank page, no guesswork.",
  },
  {
    icon: Target,
    title: "Tailored to every job",
    description:
      "Paste in a job description and your resume is automatically rewritten to match it — keywords included.",
  },
  {
    icon: FileCheck2,
    title: "Built to beat the bots",
    description:
      "Every resume is ATS-optimized, so it reaches a real recruiter instead of getting filtered out.",
  },
];

export default function FeatureCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-logo px-10 py-12 text-primary-foreground h-150">
      {/* Decorative floating resume mockup */}
      <div
        aria-hidden
        // inside carousel.tsx, just the positioning class
        className="pointer-events-none absolute right-4 top-16 hidden w-56 rotate-3 rounded-2xl bg-white p-4 text-foreground shadow-float animate-float-card xl:block"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-logo" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-20 rounded-full bg-foreground/70" />
            <div className="h-2 w-14 rounded-full bg-muted" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-1.5 w-3/4 rounded-full bg-muted" />
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-green">
          <FileCheck2 className="h-3 w-3" />
          ATS score 96%
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80">
        <Star className="h-4 w-4 fill-current" />
        4.9 / 5 · 50,000+ resumes generated
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
        className="w-full max-w-md"
      >
        <CarouselContent>
          {slides.map(({ icon: Icon, title, description }, i) => (
            <CarouselItem key={i}>
              <div className="flex flex-col gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h2 className="font-display text-2xl font-semibold leading-snug">
                  {title}
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/85">
                  {description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="Feature slides"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={current === i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === i
                ? "w-6 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
