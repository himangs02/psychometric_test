"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Award, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export function GeetaUniversityPossibilities() {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#0B1120] border-t border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Split Hero Card Banner */}
        <div className="rounded-[36px] overflow-hidden bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-left space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#38BDF8] text-[11px] font-bold tracking-tight">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Geeta University Campus</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight leading-tight">
                Your Future, <br />
                More Possibilities at Geeta University
              </h2>

              <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed max-w-lg">
                At Geeta University, we believe in helping you discover your true potential. 
                Our diverse range of undergraduate programs, modern infrastructure and industry-focused learning prepare you for the careers of tomorrow.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://geetauniversity.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] dark:bg-white dark:text-[#0F172A] dark:hover:bg-slate-100 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Programs at Geeta University</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Campus Photo */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full w-full bg-slate-100 dark:bg-slate-800">
            <Image
              src="/geeta-campus.jpg"
              alt="Geeta University Modern Academic Campus"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bottom Campus Stats Pill Bar (Matching Mockup 4 Items) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* Item 1 */}
          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-[#0F172A] dark:text-white block">100+</span>
              <span className="text-xs text-[#64748B] dark:text-slate-400">Undergraduate & PG Programs</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-[#0F172A] dark:text-white block">Modern Campus</span>
              <span className="text-xs text-[#64748B] dark:text-slate-400">World-class infrastructure</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#7C3AED] flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-[#0F172A] dark:text-white block">Industry Exposure</span>
              <span className="text-xs text-[#64748B] dark:text-slate-400">Live projects & internships</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#EA580C] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-[#0F172A] dark:text-white block">Placement Support</span>
              <span className="text-xs text-[#64748B] dark:text-slate-400">Top multinational recruiters</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
