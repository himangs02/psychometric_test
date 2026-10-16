"use client";

import React from "react";
import { Compass, Target, GitFork, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const BENEFIT_CARDS = [
  {
    title: "Understand Yourself",
    description: "Discover your interests, strengths, personality and work preferences.",
    icon: Compass,
    iconColor: "text-[#2563EB]",
    iconBg: "bg-[#2563EB]/10",
    cardBg: "bg-[#EFF6FF] dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30",
    href: "/career-guidance-test"
  },
  {
    title: "Explore Career Options",
    description: "Get a personalized list of careers that truly fit you — with clear reasons.",
    icon: Target,
    iconColor: "text-[#EA580C]",
    iconBg: "bg-[#EA580C]/10",
    cardBg: "bg-[#FFF7ED] dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30",
    href: "/#popular-careers"
  },
  {
    title: "See the Complete Path",
    description: "Find out courses, entrance exams, colleges and skills for each career.",
    icon: GitFork,
    iconColor: "text-[#059669]",
    iconBg: "bg-[#059669]/10",
    cardBg: "bg-[#F0FDF4] dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30",
    href: "/test"
  },
  {
    title: "Get Expert Guidance",
    description: "Discuss your results with our career counsellors whenever you need help.",
    icon: Users,
    iconColor: "text-[#7C3AED]",
    iconBg: "bg-[#7C3AED]/10",
    cardBg: "bg-[#FAF5FF] dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30",
    href: "/counsellor"
  }
];

export function HowCompassHelps() {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
            How Geeta Career Compass Helps You
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-xl mx-auto">
            A research-backed framework designed to remove confusion and empower students with actionable guidance.
          </p>
        </div>

        {/* 4 Pastel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFIT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-[28px] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between text-left space-y-5 ${card.cardBg}`}
              >
                <div className="space-y-4">
                  {/* Circular Icon Badge */}
                  <div className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] dark:text-white hover:text-[#2563EB] transition-colors pt-2 group w-fit cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
