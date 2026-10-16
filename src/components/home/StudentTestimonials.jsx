"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Aanya",
    role: "Class 12 Student",
    avatar: "/student-aanya.jpg",
    quote: "I was confused between engineering and design. The assessment helped me understand my interests and now I feel much more confident!",
  },
  {
    name: "Rohan",
    role: "Class 11 Student",
    avatar: "/student-rohan.jpg",
    quote: "The report gave me clear career options with reasons. I also liked the course and entrance exam information. Super helpful!",
  },
  {
    name: "Meera",
    role: "Class 12 Student",
    avatar: "/student-meera.jpg",
    quote: "I wasn't sure what careers are available in commerce. This platform opened my eyes to so many possibilities!",
  },
];

export function StudentTestimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#0F172A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
            Hear From Students Like You
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-lg mx-auto">
            Real experiences from Class 11–12 students who found clarity with Geeta Career Compass.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-[30px] bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left space-y-6"
            >
              {/* Quote Mark & Text */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] flex items-center justify-center">
                  <Quote className="w-5 h-5 fill-current" />
                </div>

                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-200 leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Student Profile Row */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#2563EB]/20 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
