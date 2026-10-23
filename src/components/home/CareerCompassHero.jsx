"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Clock,
  Users,
  ShieldCheck,
  BarChart3,
  Compass,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function CareerCompassHero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative w-full pt-32 sm:pt-36 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white dark:from-[#0F172A] dark:via-[#121826] dark:to-[#121826]">
      {/* Subtle background ambient circles */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-100/40 via-orange-100/30 to-purple-100/30 dark:from-blue-900/10 dark:via-orange-950/10 dark:to-purple-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center lg:items-end">

          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left pb-4 lg:pb-8">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-[#E2E8F0]/80 dark:bg-white/10 text-[#334155] dark:text-slate-200 text-xs font-semibold tracking-normal shadow-2xs">
              <span>For Class 11, 12 & Beyond</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#0F172A] dark:text-white leading-[1.12]">
              Confused About <br />
              Your Career? <br />
              <span className="text-[#1D68EE] dark:text-[#38BDF8]">You&apos;re Not </span>
              <span className="text-[#1D68EE] dark:text-[#38BDF8] relative inline-block">
                Alone.
                {/* Hand-drawn style decorative warm amber/yellow brush underline matching mockup */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 pointer-events-none"
                  viewBox="0 0 100 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7C25 4 75 4 98 8"
                    stroke="#F59E0B"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 11C35 9 70 8.5 92 11"
                    stroke="#FBBF24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              Discover careers that fit your interests, strengths and personality. <br className="hidden sm:inline" />
              Get a clear direction after Class 11 or 12 with our scientifically designed career assessment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/career-guidance-test"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#F05018] hover:bg-[#D9410D] text-white hover:text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <span>Start Your Free Career Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#EFF6FF] hover:bg-[#DBEAFE] dark:bg-white/10 dark:hover:bg-white/15 text-[#0F2E5E] dark:text-white font-bold text-xs sm:text-sm border border-[#BFDBFE] dark:border-white/10 shadow-2xs hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#0F2E5E] dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>How It Works</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual with Exact Mockup Students & Doodle Clouds */}
          <div className="lg:col-span-6 flex items-end justify-center lg:justify-end relative pt-4 lg:pt-0">
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] flex items-end justify-center">
              <Image
                src="/hero-students-exact.png"
                alt="Students exploring career options - Design, Doctor, Engineer, Business, Law, More Options"
                width={858}
                height={644}
                priority
                className="w-full h-auto object-contain object-bottom select-none block"
              />
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators Row (Matching Mockup 4 Clean Icons) */}
        <div className="mt-4 sm:mt-6 pt-6 sm:pt-7 border-t border-slate-200/70 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          {/* Item 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Clock className="w-5 h-5 text-[#1D68EE] dark:text-[#38BDF8] shrink-0 stroke-[2.2]" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] dark:text-slate-200">
              Takes 10–15 minutes
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Users className="w-5 h-5 text-[#1D68EE] dark:text-[#38BDF8] shrink-0 stroke-[2.2]" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] dark:text-slate-200">
              Made for Class 11–12
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1D68EE] dark:text-[#38BDF8] shrink-0 stroke-[2.2]" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] dark:text-slate-200">
              Your answers stay private
            </span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <BarChart3 className="w-5 h-5 text-[#1D68EE] dark:text-[#38BDF8] shrink-0 stroke-[2.2]" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] dark:text-slate-200">
              Get personalized career options
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Video / "How It Works" Preview Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#181829] border border-slate-200 dark:border-white/10 text-left">
          <DialogHeader className="pb-3 border-b border-slate-100 dark:border-white/10">
            <DialogTitle className="text-xl font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#2563EB]" />
              <span>How Geeta Career Compass Works</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3 text-xs sm:text-sm text-[#475467] dark:text-slate-300">
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg mb-3">
                <Compass className="w-8 h-8 animate-spin [animation-duration:12s]" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Calibrated Psychometric & Career Intelligence
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                Our 3-step scientific assessment matches your innate RIASEC interest profile, Gardner multiple intelligences, and academic aptitude with 250+ future-proof careers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#0F172A] dark:text-white">1. Self Discovery</span>
                <p className="text-muted-foreground text-[11px]">Identify your dominant traits & learning styles without exam pressure.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#0F172A] dark:text-white">2. Career Matching</span>
                <p className="text-muted-foreground text-[11px]">Receive realistic top careers matched with courses & degrees.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#0F172A] dark:text-white">3. Expert Counsellor</span>
                <p className="text-muted-foreground text-[11px]">Discuss with our AI or in-person campus mentors anytime.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVideoModalOpen(false)}
                className="rounded-xl text-xs"
              >
                Close
              </Button>
              <Link
                href="/career-guidance-test"
                onClick={() => setVideoModalOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EA580C] text-white font-bold text-xs"
              >
                <span>Take Assessment Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
