"use client";

import React, { useRef, useEffect } from "react";
import { Brain, FileSpreadsheet, BarChart3, Compass } from "lucide-react";
import { animateSection } from "@/lib/animations";

const STEPS = [
  {
    number: "01",
    title: "Choose a Test",
    description:
      "Select an assessment tailored to your career goals, cognitive strengths, or behavioral dynamics.",
    icon: Brain,
    badge: "Browse",
  },
  {
    number: "02",
    title: "Answer Honestly",
    description:
      "Respond to scientifically calibrated Likert-scale items that reflect your natural habits and preferences.",
    icon: FileSpreadsheet,
    badge: "5-10 Mins",
  },
  {
    number: "03",
    title: "Understand Results",
    description:
      "Get instant score breakdowns and multi-dimensional analysis computed via standardized psychological models.",
    icon: BarChart3,
    badge: "Instant Analysis",
  },
  {
    number: "04",
    title: "Discover Next Step",
    description:
      "Unlock tailored career suggestions, higher education pathways, and actionable personal growth insights.",
    icon: Compass,
    badge: "Action Plan",
  },
];

export function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = animateSection(sectionRef, ".how-it-works-item");
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 md:py-24 border-t border-[#801A45]/10 dark:border-white/10 bg-[#FAF9FC]/60 dark:bg-[#12121E]/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="how-it-works-item text-center max-w-xl mx-auto space-y-2.5 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] text-[11px] font-bold uppercase tracking-wider border border-[#801A45]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#801A45]" />
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#181829] dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
            Gain evidence-based psychological insights in four seamless, scientifically validated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="how-it-works-item relative rounded-[26px] p-6 bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(128,26,69,0.08)] hover:border-[#D8B4FE] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                {/* Top Corner Glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#801A45]/10 to-transparent rounded-tr-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] flex items-center justify-center border border-[#801A45]/15 group-hover:scale-105 group-hover:bg-[#801A45] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4EFF7] dark:bg-white/5 text-[#667085] dark:text-slate-400 border border-slate-200/60 dark:border-white/10">
                        {step.badge}
                      </span>
                      <span className="text-sm font-black text-[#801A45]/40 dark:text-slate-600 font-mono">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#181829] dark:text-white group-hover:text-[#801A45] dark:group-hover:text-[#F472B6] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#667085] dark:text-[#A0A0B5] leading-relaxed mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step indicator bar at bottom of card */}
                <div className="mt-5 pt-3 border-t border-[#F1F5F9] dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-[#98A2B3]">
                  <span>Step {idx + 1} of 4</span>
                  <div className="w-8 h-1 rounded-full bg-[#E5E7EB] dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#801A45] rounded-full transition-all duration-300 group-hover:w-full"
                      style={{ width: `${(idx + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
