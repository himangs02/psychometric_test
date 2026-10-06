"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, Users, BarChart3, Star } from "lucide-react";
import { HeroGlobe } from "./HeroGlobe";

export function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-gradient-to-b from-[#FAF9FC] via-[#FFFFFF] to-[#FAF9FC] dark:from-[#0C0C14] dark:via-[#10101C] dark:to-[#0C0C14]">
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#F3E8FF]/60 dark:bg-[#801A45]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FDF2F8]/50 dark:bg-[#4F46E5]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left z-10">

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#181829] dark:text-white tracking-tight leading-[1.1]">
                Geeta Personality
                <span className="flex items-center gap-3 text-[#801A45] dark:text-[#F472B6]">
                  Portal
                  {/* Decorative Hand-drawn Accent */}
                  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                    <path d="M2 5C14 2 34 2 46 6" stroke="#801A45" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
                    <path d="M8 12C18 9 32 9 42 13" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#667085] dark:text-[#A0A0B5] max-w-lg leading-relaxed font-normal">
              Powered by Geeta University – where <span className="font-semibold text-[#181829] dark:text-white">“Empowering education empowers minds”</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/test"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#801A45] hover:bg-[#6A1439] shadow-[0_10px_25px_-5px_rgba(128,26,69,0.35)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Tests</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-[#181829] dark:text-white bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-[#801A45]/30 hover:bg-[#FAF5F8] dark:hover:bg-white/10 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>How It Works</span>
              </a>
            </div>

            {/* Bottom 3-Metric Floating Stats Card */}
            <div className="pt-4">
              <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 bg-white/90 dark:bg-[#181829]/90 backdrop-blur-xl rounded-[22px] p-3.5 sm:px-5 sm:py-3 border border-[#801A45]/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                {/* Metric 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF2F8] dark:bg-white/5 text-[#DB2777] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-extrabold text-[#181829] dark:text-white leading-tight">
                      10K+
                    </div>
                    <div className="text-[11px] text-[#667085] dark:text-[#98A2B3] font-medium leading-tight">
                      Students Empowered
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-8 bg-slate-200 dark:bg-white/10" />

                {/* Metric 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] dark:bg-white/5 text-[#059669] flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-extrabold text-[#181829] dark:text-white leading-tight">
                      6+
                    </div>
                    <div className="text-[11px] text-[#667085] dark:text-[#98A2B3] font-medium leading-tight">
                      Personality Tests
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-8 bg-slate-200 dark:bg-white/10" />

                {/* Metric 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] dark:bg-white/5 text-[#D97706] flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-extrabold text-[#181829] dark:text-white leading-tight">
                      95%
                    </div>
                    <div className="text-[11px] text-[#667085] dark:text-[#98A2B3] font-medium leading-tight">
                      Positive Feedback
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Globe Visual Column */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <HeroGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
