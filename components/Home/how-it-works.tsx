"use client";
import { div } from "framer-motion/client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const cardItems = [
    {
      id: 1,
      svg: 1,
      imgUrl: "/images/Paste-the-job-description.png",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#5B5FEF"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      title: "Paste the job description",
      desc: "Drop in the job URL or description. Our AI instantly analyzes keywords, required skills, and what recruiters are looking for.",
    },
    {
      id: 2,
      svg: 2,
      imgUrl: "/images/Tell-us-about-yourself.png",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#00C9A7"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),

      title: "Tell us about yourself",
      desc: "Share your experience, skills, and achievements in plain language. No need to format anything — just talk naturally.",
    },
    {
      id: 3,
      svg: 3,
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#5B5FEF"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
      imgUrl: "/images/Download-apply.png",
      title: "Download & apply",
      desc: "Get a polished, ATS-optimized resume and a personalized cover letter ready to send — in PDF or Word format.",
    },
  ];
  return (
    <div className="w-full items-center justify-center py-16  ">
      <div className="w-9/12 mx-auto my-0 flex flex-col gap-16">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="uppercase text-lg text-primary font-sans font-bold">
            how it works
          </div>
          <div className="font-display text-4xl font-black">
            From blank page to hired — in 3 steps
          </div>
          <div className="text-foreground/70 font-normal font-sans max-w-140 text-center">
            No design skills needed. Just paste a job link and let our AI craft
            the perfect application for you.
          </div>
        </div>
        <div className="flex items-center justify-center gap-16 ">
          {cardItems.map((c) => (
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              key={c.id}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-(--shadow-card)"
            >
              {/* ✅ relative + defined size on the wrapper */}
              <div className="relative w-full h-56">
                <Image
                  src={c.imgUrl}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-5">
                <div className="flex items-center justify-between">
                  <p
                    className={`size-8 flex items-center justify-center rounded-full  ${c.id % 2 === 0 ? "bg-accent-light text-accent" : "bg-primary-light text-primary"}`}
                  >
                    {c.id}
                  </p>
                  <p className="text-black text-xl font-semibold">{c.title}</p>
                  <div
                    className={`${c.id % 2 === 0 ? "bg-accent-light" : "bg-primary-light"} flex items-center justify-center size-10 rounded-lg`}
                  >
                    {c.icon}
                  </div>
                </div>
                <div className="text-foreground/70 font-normal text-justify">
                  {c.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
