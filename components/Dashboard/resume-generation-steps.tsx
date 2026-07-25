import React from "react";
import {
  FileText,
  Upload,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Zap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
interface StepItem {
  id: string;
  isStep?: boolean;
  colSpanClass?: string;
  render: () => React.ReactNode;
}

const steps: StepItem[] = [
  // ── Step 1: Interactive Start (Choose Template) ──────────────────
  {
    id: "Step 1",
    isStep: true,
    render: () => (
      <div className="relative flex flex-col sm:flex-row min-h-52.5 h-full items-stretch sm:items-center justify-between overflow-hidden p-5 gap-4 sm:gap-0">
        <div className="flex w-full sm:max-w-[55%] flex-col justify-between z-10 gap-3">
          <div className="space-y-1.5">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Step 01
            </span>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Choose a Template
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pick ATS-vetted layouts optimized for your target industry.
            </p>
          </div>
          <div>
            <Button size="sm">
              
              <Link href={"/build/template"} className="flex items-center justify-center cursor-pointer font-medium gap-1.5">Choose Now <ArrowRight className="w-3.5 h-3.5" /></Link>
            </Button>
          </div>
        </div>

        {/* Image Panel — full-width rounded block on mobile, slanted split from sm+ */}
        <div
          className="relative sm:absolute sm:right-0 sm:top-0 sm:bottom-0 w-full sm:w-1/2 h-36 sm:h-auto rounded-xl sm:rounded-none overflow-hidden bg-primary-light [clip-path:none] sm:[clip-path:polygon(25%_0%,100%_0%,100%_100%,0%_100%)]"
        >
          <Image
            src="/images/bg-resume-template.png"
            alt="Resume template preview"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top-left transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    ),
  },

  // ── Step 2: Information Input ──────────────────────────────────
  {
    id: "Step 2",
    isStep: true,
    render: () => (
      <div className="flex flex-col justify-between min-h-52.5 h-full p-5 bg-linear-to-br from-white to-slate-50/50">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
              Step 02
            </span>
            <span className="text-[10px] font-medium text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full">
              Automated Intake
            </span>
          </div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Provide Your Details
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Upload an existing PDF resume or fill in our guided form to feed the AI generator.
          </p>
        </div>

        {/* Informational Visual Chips */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-2 p-2 rounded-xl border border-border/60 bg-white/80 shadow-2xs">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Upload className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-foreground">PDF Import</span>
              <span className="text-[9px] text-muted-foreground">Auto-parse data</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl border border-border/60 bg-white/80 shadow-2xs">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-foreground">Guided Form</span>
              <span className="text-[9px] text-muted-foreground">Step-by-step</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── Step 3: AI & ATS Check ─────────────────────────────────────
  {
    id: "Step 3",
    isStep: true,
    render: () => (
      <div className="relative flex flex-col justify-between min-h-52.5 h-full p-5 overflow-hidden bg-linear-to-br from-white to-amber-50/20">
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              <Sparkles className="w-3 h-3" /> Step 03
            </span>
            <span className="text-[10px] font-medium text-amber-800/80 bg-amber-100/60 px-2 py-0.5 rounded-full">
              AI Engine
            </span>
          </div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            AI Optimization & ATS Check
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Generates high-impact bullet points and analyzes ATS keyword compatibility in real-time.
          </p>
        </div>

        <div className="mt-3 p-2.5 rounded-xl border border-amber-200/60 bg-linear-to-r from-amber-50/80 to-orange-50/40 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-amber-900/70">
                Target ATS Match
              </p>
              <p className="text-xs font-bold text-amber-950">90%+ Score Target</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-amber-200 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-bold text-amber-700">Smart Scan</span>
          </div>
        </div>
      </div>
    ),
  },

  // ── Step 4: Export ─────────────────────────────────────────────
  {
    id: "Step 4",
    isStep: true,
    colSpanClass: "sm:col-span-2 md:col-span-2",
    render: () => (
      <div className="group relative overflow-hidden h-full bg-linear-to-br from-white via-emerald-50/20 to-emerald-100/30 p-5">
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-400/20" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 h-full">
          <div className="max-w-md space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-500/20">
                Step 04
              </span>
              <span className="text-xs text-muted-foreground font-medium">Final Step</span>
            </div>

            <div>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                Export & Apply
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Download polished, print-ready documents formatted for modern applicant tracking systems (ATS) and recruiters.
              </p>
            </div>

            <div className="pt-1">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
               <Link href={"/build/template"} className=" text-white font-medium shadow-xs gap-1.5 transition-all cursor-pointer flex items-center justify-center">
                Create Now
                <ArrowRight className="w-3.5 h-3.5" />
               </Link>
              </Button>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2 rounded-xl border border-emerald-100/80 bg-white/90 p-3 shadow-xs backdrop-blur-xs w-full sm:w-auto sm:min-w-42">
            <div className="flex items-center gap-2 pb-1.5 border-b border-emerald-100/60">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FileCheck className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                Supported Formats
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-1.5 text-center transition-colors hover:bg-emerald-50">
                <Download className="h-3.5 text-emerald-600 mb-0.5" />
                <span className="text-[10px] font-bold text-emerald-800 tracking-wider">
                  PDF
                </span>
                <span className="text-[8px] text-emerald-600/80">Vector Print</span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-1.5 text-center transition-colors hover:bg-emerald-50">
                <FileText className="h-3.5 text-emerald-600 mb-0.5" />
                <span className="text-[10px] font-bold text-emerald-800 tracking-wider">
                  DOCX
                </span>
                <span className="text-[8px] text-emerald-600/80">Editable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── Item 5: Primary Gradient Info Block ─────────────────────────
  {
    id: "Info Block",
    isStep: false,
    colSpanClass: "sm:col-span-2 md:col-span-1",
    render: () => (
      <div className="relative flex flex-col justify-between min-h-52.5 h-full p-5 overflow-hidden rounded-2xl bg-linear-to-br from-[#5B5FEF] via-[#7C3AED] to-[#8B5CF6] text-white shadow-md">
        {/* Glow Effects */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-black/10 rounded-full blur-lg pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-xs font-medium text-white border border-white/20">
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" /> Fast & Secure
            </span>
            <Lock className="w-4 h-4 text-white/70" />
          </div>

          <h3 className="text-base font-semibold tracking-tight text-white pt-1">
            Why Choose Our AI Builder?
          </h3>
          <p className="text-xs text-white/80 leading-relaxed">
            Your data is encrypted end-to-end. Generate unlimited variations in real-time without losing progress.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-10 grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white">100% Privacy</span>
            <span className="text-[9px] text-white/70">Zero data selling</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white">Instant Sync</span>
            <span className="text-[9px] text-white/70">Auto-saved state</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ResumeGenerationSteps() {
  return (
    <section className="w-full max-w-full sm:max-w-10/12 mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Create Your Resume</h2>
          <p className="text-xs text-muted-foreground">
            Follow these simple steps to build an ATS-ready resume in minutes.
          </p>
        </div>
      </div>
      <div className="flex-1 h-px bg-border mb-6" aria-hidden="true" />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`bg-white border border-border/80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${s.colSpanClass || ""}`}
          >
            {s.render()}
          </div>
        ))}
      </div>
    </section>
  );
}