"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { TestGrid } from "@/components/tests/TestGrid";
import { HowItWorks } from "@/components/features/HowItWorks";
import { UniversityHighlights } from "@/components/features/UniversityHighlights";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 1. Hero Section with 3D Sanctuary Visual & Stats */}
      <Hero />

      {/* 2. Featured Assessments Section (Matching Mockup 6-Card Grid) */}
      <TestGrid />

      {/* 3. Four-step Interactive Workflow */}
      <HowItWorks />

      {/* 4. University Highlights Bento Grid */}
      <UniversityHighlights />

      {/* 5. Bottom CTA Banner */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative">
        <div className="relative rounded-[32px] overflow-hidden p-8 sm:p-14 text-center bg-[#801A45] text-white shadow-[0_20px_50px_-15px_rgba(128,26,69,0.3)] border border-white/20">
          {/* Ambient Background Radial Glows */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#F472B6]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider border border-white/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <span>Self-Discovery & Career Pathway</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Ready to Discover Your True Personality & Potential?
            </h2>

            <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Take our calibrated psychological assessments today. Instant scoring, multi-dimensional breakdowns, and evidence-based career roadmap.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/test"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#801A45] bg-white hover:bg-[#FAF5F8] shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Take a Test Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/career-guidance-test"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <span>Career Guidance Test</span>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-[11px] font-medium text-white/80">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Instant Score Computing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A7F3D0]" />
                <span>5–10 Mins Average</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>100% Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
