import React from "react";

export default function Testimonials() {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  const testimonials = [
    {
      starts: "★★★★★",
      statement:
        "I applied to 12 jobs, got 9 interviews. ResumeAI's cover letters felt genuinely personal — my recruiter even commented on how well-written they were.",
      name: "Jamie Kim",
      role: "Software Engineer",
      company: "Stripe",
      bg: "bg-linear-to-r from-primary to-purple-600"
    },
    {
      starts: "★★★★",
      statement:
        "As a career changer, I was terrified my resume wouldn't cut it. ResumeAI helped me reframe my experience and I landed a PM role in 3 weeks.",
      name: "Columbina Hyposelenia",
      role: "Product Manager",
      company: "Notion",
      bg: "bg-linear-to-r from-orange-500 to-orange-400"
    },
    {
      starts: "★★★★★",
      statement:
        "As a career changer, I was terrified my resume wouldn't cut it. ResumeAI helped me reframe my experience and I landed a PM role in 3 weeks.",
      name: "Maria Alves",
      role: "Product Manager",
      company: "Airbnb",
      bg: "bg-linear-to-r from-accent to-emerald-500"
    },
  ];
  return (
    <div className="w-full bg-white py-10">
      <div className="w-9/12 mx-auto flex flex-col justify-center items-center gap-5">
        <h3 className="uppercase text-lg text-primary font-bold font-sans">
          Testimonials
        </h3>
        <h1 className="text-[38px] text-black font-display">
          Loved by job seekers worldwide
        </h1>
        <div className="flex w-full items-center justify-between gap-5">
          {testimonials.map((testi, i) => {
            const initials = getInitials(testi.name ?? "Guest");
            return (
              <div
                key={i}
                className="bg-white border border-border px-6 py-4 rounded-xl shadow-(--shadow-card) flex flex-col justify-center items-start gap-4"
              >
                <p className="text-yellow">{testi.starts}</p>
                <p className="text-justify text-foreground-muted">
                  &quot;{testi.statement}&quot;
                </p>
                <div className="flex items-center justify-start gap-4">
                  <div className = {`size-11 flex items-center justify-center text-white uppercase   rounded-full ${testi.bg}`}>{initials}</div>
                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-sm text-black font-semibold">{testi.name}</h2>
                    <p className="text-xs text-foreground-subtle font-semibold">
                      {testi.role} · Hired at {testi.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
