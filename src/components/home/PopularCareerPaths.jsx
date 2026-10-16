"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Cpu, 
  Stethoscope, 
  TrendingUp, 
  Palette, 
  Scale, 
  BookOpen 
} from "lucide-react";

const CAREER_PATHS = [
  {
    title: "Engineering & Technology",
    image: "/career-engineering.jpg",
    icon: Cpu,
    iconColor: "text-[#2563EB]",
    iconBg: "bg-blue-500/10",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    description: "Software, AI, Robotics, Data Science & Core Systems",
    href: "/career-guidance-test"
  },
  {
    title: "Medical & Healthcare",
    image: "/career-medical.jpg",
    icon: Stethoscope,
    iconColor: "text-[#0D9488]",
    iconBg: "bg-teal-500/10",
    badgeBg: "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300",
    description: "Medicine, Pharmacy, Biotechnology & Allied Sciences",
    href: "/career-guidance-test"
  },
  {
    title: "Business & Management",
    image: "/career-business.jpg",
    icon: TrendingUp,
    iconColor: "text-[#EA580C]",
    iconBg: "bg-orange-500/10",
    badgeBg: "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
    description: "FinTech, Marketing, Entrepreneurship & Global Trade",
    href: "/career-guidance-test"
  },
  {
    title: "Design & Creative Arts",
    image: "/career-design.jpg",
    icon: Palette,
    iconColor: "text-[#D97706]",
    iconBg: "bg-amber-500/10",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
    description: "UI/UX, Product Design, Animation & Architecture",
    href: "/career-guidance-test"
  },
  {
    title: "Law & Public Service",
    image: "/career-law.jpg",
    icon: Scale,
    iconColor: "text-[#7C3AED]",
    iconBg: "bg-purple-500/10",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
    description: "Corporate Law, Judiciary, Civil Services & Policy",
    href: "/career-guidance-test"
  },
  {
    title: "Humanities, Media & More",
    image: "/career-humanities.jpg",
    icon: BookOpen,
    iconColor: "text-[#059669]",
    iconBg: "bg-emerald-500/10",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    description: "Journalism, Psychology, Economics & Research",
    href: "/career-guidance-test"
  }
];

export function PopularCareerPaths() {
  return (
    <section id="popular-careers" className="py-16 sm:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
          <div className="space-y-1 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
              Popular Career Paths Students Explore
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400">
              Discover some of the many career areas you can explore based on your interests.
            </p>
          </div>

          <Link
            href="/test"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#38BDF8] transition-colors shrink-0 group cursor-pointer"
          >
            <span>View All Careers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Career Path Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_PATHS.map((career, idx) => {
            const Icon = career.icon;

            return (
              <Link
                key={idx}
                href={career.href}
                className="group rounded-[28px] overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#181829] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col text-left cursor-pointer"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={career.image}
                    alt={career.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Footer Content Pill */}
                <div className="p-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${career.iconBg} ${career.iconColor} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-[11px] text-[#64748B] dark:text-slate-400">
                        {career.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
