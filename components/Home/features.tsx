import React from "react";
import BlinkingCursor from "./BlinkingCursor";

export default function Features() {
  const item = [
    {
      id: 1,
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#5B5FEF"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "AI Writing Engine",
      desc: "Generates compelling bullet points and summaries tailored to each job posting automatically.",
      bgColor: "bg-[#eef0fd]",
    },
    {
      id: 2,
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#00C9A7"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "ATS Score & Optimization",
      desc: "Instantly see your ATS match score and get keyword suggestions to increase your chances.",
      bgColor: "bg-[#e6faf6]",
    },
    {
      id: 3,
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#7C3AED"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "AI Cover Letter Generator",
      desc: "Creates personalized, compelling cover letters that speak directly to the employer's needs.",
      bgColor: "bg-[#F3E8FF]",
    },

    {
      id: 4,
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#D97706"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Professional Templates",
      desc: "Choose from 25+ ATS-friendly, beautifully designed templates optimized for every industry and career level.",
      bgColor: "bg-[#FFF7ED]",
    },
  ];

  return (
    <div className="w-full bg-white py-10" id="features">
      <div className="mx-auto md:w-9/12 w-11/12 flex md:flex-row flex-col gap-4">
        <div className="flex flex-col md:items-start items-center justify-center space-y-4 md:w-2/5">
          <div className="uppercase font-sans tracking-wide text-lg font-semibold text-primary">
            Features
          </div>
          <div className="text-[38px] text-center md:text-left font-display text-black md:max-w-132.5 ">
            Everything you need to land the interview
          </div>
          <div className="text-[16px] text-center md:text-left text-secondary-foreground leading-8">
            ResumeAI is the only tool that combines AI writing, ATS
            optimization, and beautiful templates in one place.
          </div>
          <div className="flex flex-col gap-5">
            {item.map((c) => (
              <div key={c.id} className="flex items-start justify-center gap-5">
                <div
                  className={`size-10.5 flex items-center justify-center rounded-lg ${c.bgColor}`}
                >
                  {c.icon}
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                  <div className="text-[16px] font-semibold text-black">
                    {c.title}
                  </div>
                  <div className="text-secondary-foreground text-sm font-normal">
                    {c.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 md:flex justify-center items-center hidden">
          <div className="max-w-180 shadow-(--shadow-card) rounded-xl border border-border bg-bg overflow-hidden">
            <div className="bg-white border-b border-border px-5 py-3 flex items-center justify-start gap-2">
              <div className="size-2.5 bg-red-400 rounded-full"></div>
              <div className="size-2.5 bg-orange-400 rounded-full"></div>
              <div className="size-2.5 bg-green-400 rounded-full"></div>
              <span className="text-foreground-subtle md:text-sm text-xs font-medium">
                AI Cover Letter · Google PM Role
              </span>
            </div>
            <div className="px-5 py-3 flex flex-col items-center justify-center ">
              <div className="py-3 px-5 bg-primary-light rounded-2xl border-l-4 border-primary text-primary my-4 md:text-base text-sm">
                ✦ Generating cover letter for Senior Product Manager at Google…
              </div>
              <div className="md:text-sm text-xs font-normal text-secondary-foreground leading-7">
                Dear Hiring Manager,
                <br />
                <br />
                I&apos;m excited to apply for the{" "}
                <strong>Senior Product Manager</strong> role at Google. With 6+
                years driving product strategy at growth-stage startups, I&apos;ve
                led cross-functional teams to ship features used by millions —
                including a recommendation engine that increased DAU by{" "}
                <strong>34%</strong>.
                <br />
                <br />
                At Acme Corp, I owned the roadmap for our core B2C product,
                collaborating closely with engineering and design to reduce
                time-to-market by 40%...
                <BlinkingCursor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
