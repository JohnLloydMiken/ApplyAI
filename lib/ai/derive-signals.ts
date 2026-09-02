// lib/ai/derive-signals.ts

export function computeYearsOfExperience(experience: { startYear: string; endYear: string }[]): number {
  if (experience.length === 0) return 0;

  const currentYear = new Date().getFullYear();
  const years = experience.map((exp) => {
    const start = parseInt(exp.startYear, 10);
    const end = exp.endYear.toLowerCase() === "present" ? currentYear : parseInt(exp.endYear, 10);
    return isNaN(start) || isNaN(end) ? 0 : Math.max(0, end - start);
  });

  // naive sum; fine for now, could dedupe overlapping ranges later
  return years.reduce((a, b) => a + b, 0);
}

export function seniorityLabel(years: number): "entry-level" | "mid-level" | "senior" {
  if (years < 2) return "entry-level";
  if (years < 6) return "mid-level";
  return "senior";
}