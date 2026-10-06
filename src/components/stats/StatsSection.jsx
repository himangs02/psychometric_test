"use client";

import React, { useRef, useEffect } from "react";
import { Users, FileCheck2, Sparkles, TrendingUp } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations";

const STATS = [
  {
    target: 10000,
    prefix: "",
    suffix: "+",
    display: "10K+",
    label: "Students Empowered",
    description: "Evaluated across regional & national higher-education programs",
    icon: Users,
    accent: "text-[#4F46E5] dark:text-[#A5B4FC]",
    bg: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10",
  },
  {
    target: 15,
    prefix: "",
    suffix: "+",
    display: "15+",
    label: "Psychometric Tests",
    description: "Covering RIASEC, MBTI, Belbin, Gardner & cognitive models",
    icon: FileCheck2,
    accent: "text-[#4F46E5] dark:text-[#A5B4FC]",
    bg: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10",
  },
  {
    target: 98,
    prefix: "",
    suffix: "%",
    display: "98%",
    label: "Positive Feedback",
    description: "Self-awareness & career clarity reported by candidates",
    icon: Sparkles,
    accent: "text-[#06B6D4] dark:text-[#22D3EE]",
    bg: "bg-[#ECFEFF] dark:bg-[#06B6D4]/10",
  },
  {
    target: 40,
    prefix: "₹",
    suffix: " LPA",
    display: "₹40 LPA",
    label: "Highest Placement",
    description: "Industry-aligned talent development and campus placement",
    icon: TrendingUp,
    accent: "text-[#4F46E5] dark:text-[#A5B4FC]",
    bg: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10",
  },
];

export function StatsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal stat cards
      gsap.fromTo(
        ".stat-card-item",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "opacity,transform",
        }
      );

      // Animate numbers
      STATS.forEach((stat, index) => {
        const numElem = document.getElementById(`stat-counter-${index}`);
        if (!numElem) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
          },
          val: stat.target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            if (stat.target >= 1000) {
              const thousands = (obj.val / 1000).toFixed(0);
              numElem.innerText = `${thousands}K+`;
            } else {
              numElem.innerText = `${stat.prefix}${Math.floor(obj.val)}${stat.suffix}`;
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 border-y border-[#E5E7EB] dark:border-white/10 bg-white/50 dark:bg-[#111827]/40 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.label}
                className="stat-card-item rounded-[22px] p-6 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#111827] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(79,70,229,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C7D2FE] dark:hover:border-[#4F46E5]/40 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.accent} group-hover:scale-105 transition-transform duration-200 border border-current/10`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F8F9FC] dark:bg-white/5 text-[#667085] dark:text-slate-400 border border-[#E5E7EB] dark:border-white/10">
                    Verified Metric
                  </span>
                </div>
                <div
                  id={`stat-counter-${idx}`}
                  className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-white tracking-tight"
                >
                  {item.display}
                </div>
                <div className="text-sm font-bold text-[#111827] dark:text-white mt-1.5">
                  {item.label}
                </div>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


