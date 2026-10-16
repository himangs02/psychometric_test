"use client";

import React from "react";
import { ClipboardList, BarChart3, Lightbulb, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    number: "1",
    badgeColor: "bg-[#2563EB] text-white",
    iconBg: "bg-blue-50 dark:bg-blue-950/40 text-[#2563EB]",
    icon: ClipboardList,
    title: "Tell Us About Yourself",
    description: "Answer a few simple questions about your interests, subjects and preferences.",
  },
  {
    number: "2",
    badgeColor: "bg-[#EA580C] text-white",
    iconBg: "bg-orange-50 dark:bg-orange-950/40 text-[#EA580C]",
    icon: BarChart3,
    title: "Take a Short Assessment",
    description: "A scientifically designed test to understand your strengths, interests and personality.",
  },
  {
    number: "3",
    badgeColor: "bg-[#059669] text-white",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#059669]",
    icon: Lightbulb,
    title: "Get Your Career Report",
    description: "Receive personalized career options, courses, entrance exams and a step-by-step roadmap.",
  },
];

export function ThreeSimpleSteps() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#0F172A]/60 border-y border-slate-200/70 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading with decorative underline */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
            Find Your Direction in{" "}
            <span className="relative inline-block text-[#2563EB] dark:text-[#38BDF8]">
              3 Simple Steps
              <span className="absolute left-0 -bottom-1.5 w-full h-1.5 bg-[#EA580C] rounded-full" />
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-lg mx-auto pt-1">
            Zero stress, scientific precision, and instant clarity for high school students.
          </p>
        </div>

        {/* 3 Steps Cards with Connecting Chevrons */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 lg:gap-6 items-center">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <React.Fragment key={index}>
                {/* Step Card (3 cols wide on md) */}
                <div className="md:col-span-3 h-full p-7 rounded-[30px] bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 text-left space-y-4 relative flex flex-col justify-between">
                  {/* Top: Step Number Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-full ${step.badgeColor} flex items-center justify-center font-black text-xs shadow-xs`}>
                      {step.number}
                    </div>

                    <div className={`w-12 h-12 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Chevron (1 col wide on md, hidden on mobile) */}
                {!isLast && (
                  <div className="hidden md:flex md:col-span-1 justify-center items-center">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 flex items-center justify-center shadow-2xs">
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom CTA to start */}
        <div className="pt-2 text-center">
          <Link
            href="/career-guidance-test"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Step 1: Self Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
