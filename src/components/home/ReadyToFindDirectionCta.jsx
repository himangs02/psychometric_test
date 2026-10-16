"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, Target, Rocket } from "lucide-react";

export function ReadyToFindDirectionCta() {
  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
      <div className="relative rounded-[36px] overflow-hidden p-8 sm:p-14 lg:p-16 text-center bg-gradient-to-br from-[#E0F2FE]/70 via-[#F0FDF4]/60 to-[#EFF6FF]/70 dark:from-[#0C4A6E]/30 dark:via-[#064E3B]/20 dark:to-[#1E1B4B]/30 border border-blue-200/70 dark:border-white/10 shadow-sm">
        
        {/* Balanced Floating Doodle Stickers */}

        {/* 1. Left Side Badges */}
        <div className="absolute top-8 left-8 sm:left-14 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border border-blue-200 dark:border-blue-800/60 text-[#2563EB] dark:text-[#38BDF8] text-xs font-bold shadow-xs -rotate-6">
          <Compass className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
          <span>Discover Interests</span>
        </div>

        <div className="absolute bottom-8 left-10 sm:left-16 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-xs rotate-3">
          <Target className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Clear Direction</span>
        </div>

        {/* 2. Right Side Badges */}
        <div className="absolute top-8 right-8 sm:right-14 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs rotate-6">
          <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Expert Guidance</span>
        </div>

        <div className="absolute bottom-8 right-10 sm:right-16 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs -rotate-3">
          <Rocket className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Future Ready</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0F172A] dark:text-white leading-tight">
            Ready to Find Your Direction?
          </h2>

          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed">
            Take the first step towards a future that fits you with our scientifically designed career assessment.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/career-guidance-test"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white hover:text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Start Your Free Career Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
