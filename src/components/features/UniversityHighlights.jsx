"use client";

import React, { useRef, useEffect } from "react";
import {
  Building2,
  Briefcase,
  GraduationCap,
  Globe2,
  ArrowUpRight,
  Award,
} from "lucide-react";
import { animateSection } from "@/lib/animations";

export function UniversityHighlights() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = animateSection(sectionRef, ".highlight-card-reveal");
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative"
    >
      {/* Section Header */}
      <div className="highlight-card-reveal text-center max-w-xl mx-auto space-y-2.5 mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] text-[11px] font-bold uppercase tracking-wider border border-[#801A45]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#801A45]" />
          <span>Institutional Excellence</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#181829] dark:text-white tracking-tight">
          About Geeta University
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
          A leading higher-education institution in Delhi-NCR pioneering outcome-based learning, research, and holistic career enablement.
        </p>
      </div>

      {/* Clean Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Campus Size */}
        <div className="highlight-card-reveal md:col-span-4 rounded-[26px] p-6 bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(128,26,69,0.08)] hover:border-[#D8B4FE] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] flex items-center justify-center border border-[#801A45]/15 group-hover:scale-105 group-hover:bg-[#801A45] group-hover:text-white transition-all duration-300">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F4EFF7] dark:bg-white/5 text-[#667085] dark:text-slate-400 border border-slate-200/60 dark:border-white/10">
                Delhi-NCR
              </span>
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
                Smart Campus
              </span>
              <h3 className="text-2xl font-black text-[#181829] dark:text-white tracking-tight mt-0.5">
                40 Acres
              </h3>
            </div>
            <p className="text-xs text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
              Lush green, industry-connected smart campus located in Panipat, Delhi-NCR with high-tech simulation labs and digital libraries.
            </p>
          </div>
        </div>

        {/* Card 2: Placements */}
        <div className="highlight-card-reveal md:col-span-4 rounded-[26px] p-6 bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(128,26,69,0.08)] hover:border-[#D8B4FE] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] flex items-center justify-center border border-[#801A45]/15 group-hover:scale-105 group-hover:bg-[#801A45] group-hover:text-white transition-all duration-300">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF5F8] dark:bg-[#801A45]/10 text-[#801A45] dark:text-[#F472B6] border border-[#801A45]/20">
                445+ Recruiters
              </span>
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
                Placement Records
              </span>
              <h3 className="text-2xl font-black text-[#801A45] dark:text-[#F472B6] tracking-tight mt-0.5">
                ₹40 LPA Highest
              </h3>
            </div>
            <p className="text-xs text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
              3,000+ career offers across high-demand domains like AI, Cybersecurity, Management, and Corporate Law.
            </p>
          </div>
        </div>

        {/* Card 3: Programs */}
        <div className="highlight-card-reveal md:col-span-4 rounded-[26px] p-6 bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(128,26,69,0.08)] hover:border-[#D8B4FE] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] flex items-center justify-center border border-[#801A45]/15 group-hover:scale-105 group-hover:bg-[#801A45] group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F4EFF7] dark:bg-white/5 text-[#667085] dark:text-slate-400 border border-slate-200/60 dark:border-white/10">
                UG / PG / Ph.D.
              </span>
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
                Academic Offerings
              </span>
              <h3 className="text-2xl font-black text-[#181829] dark:text-white tracking-tight mt-0.5">
                70+ Programs
              </h3>
            </div>
            <p className="text-xs text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
              Industry-aligned degrees with flexible choice-based credit systems, experiential workshops, and global certifications.
            </p>
          </div>
        </div>

        {/* Card 4: Institutional Vision (Span 7) */}
        <div className="highlight-card-reveal md:col-span-7 rounded-[26px] p-6 sm:p-8 bg-gradient-to-br from-[#FAF5F8]/80 via-white to-[#FAF5F8]/40 dark:from-[#181829] dark:via-[#201525]/30 dark:to-[#181829] border border-[#801A45]/20 shadow-[0_4px_20px_rgba(128,26,69,0.04)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/10 text-[#801A45] dark:text-[#F472B6] text-[10px] font-extrabold border border-[#801A45]/15 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
              <span>Core Mission & Philosophy</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#181829] dark:text-white tracking-tight">
              Empowering Students for Tomorrow's Challenges
            </h3>
            <blockquote className="text-xs sm:text-sm text-[#181829]/80 dark:text-slate-300 italic border-l-3 border-[#801A45] pl-4 leading-relaxed my-2">
              “To reach the pinnacle of academic excellence and nurture future-ready leaders through innovative learning, critical inquiry, and global exposure.”
            </blockquote>
          </div>
        </div>

        {/* Card 5: Research & Global Focus (Span 5) */}
        <div className="highlight-card-reveal md:col-span-5 rounded-[26px] p-6 sm:p-8 bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(128,26,69,0.08)] hover:border-[#D8B4FE] transition-all duration-300 flex flex-col justify-between space-y-4 group">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] flex items-center justify-center border border-[#801A45]/15">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#181829] dark:text-white">
              Global & Research Focus
            </h3>
            <p className="text-xs text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
              Welcoming scholars across countries with interdisciplinary Ph.D. fellowships, startup incubation, and international exchange programs.
            </p>
          </div>
          <div className="pt-2 border-t border-[#F1F5F9] dark:border-white/5">
            <a
              href="https://geetauniversity.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#801A45] dark:text-[#F472B6] hover:gap-2 transition-all duration-200"
            >
              <span>Visit Official University Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UniversityHighlights;
