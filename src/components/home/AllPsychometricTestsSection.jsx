"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_TESTS } from "@/components/tests/TestCardsData";
import { 
  ArrowRight, 
  Clock, 
  Layers, 
  Search,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

const CATEGORIES = [
  "All Tests",
  "Career & Ambition",
  "Intelligence & Cognitive",
  "Personality & Mindset",
  "Emotional & Social"
];

export function AllPsychometricTestsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTests = useMemo(() => {
    return ALL_TESTS.filter((test) => {
      const matchesCategory =
        selectedCategory === "All Tests" || test.category === selectedCategory;

      const matchesSearch =
        !searchTerm.trim() ||
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (test.subtitle && test.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        test.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.badge.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section id="tests" className="py-16 sm:py-24 bg-white dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-white/5 pb-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#38BDF8] text-xs font-bold tracking-tight">
              <Layers className="w-3.5 h-3.5" />
              <span>Standardized Battery • 15 Scientific Assessments</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
              All 15 Psychometric Assessments
            </h2>

            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-2xl leading-relaxed">
              Explore our complete suite of calibrated psychometric instruments covering Holland RIASEC career interests, Gardner multiple intelligences, emotional agility, cognitive resilience, and leadership potential.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
              <span className="text-[#64748B] dark:text-slate-400">Available Tests: </span>
              <span className="font-extrabold text-[#2563EB] dark:text-[#38BDF8] text-sm">15 Validated</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {CATEGORIES.map((cat) => {
              const count = cat === "All Tests" 
                ? ALL_TESTS.length 
                : ALL_TESTS.filter(t => t.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                      : "bg-[#F1F5F9] dark:bg-white/5 text-[#475467] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-white/60 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#F8FAFC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
            />
          </div>
        </div>

        {/* 15 Tests Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test, index) => {
            const Icon = test.icon;

            return (
              <div
                key={test.id}
                className="group rounded-[28px] p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#181829] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badge + Duration */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${test.iconBg} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-[#475467] dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                        {test.badge}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{test.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Test Title & Subtitle */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors tracking-tight">
                      {test.title}
                    </h3>
                    {test.subtitle && (
                      <span className="text-xs text-[#2563EB] dark:text-[#38BDF8] font-semibold block mt-0.5">
                        {test.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Test Description */}
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed line-clamp-3">
                    {test.desc}
                  </p>
                </div>

                {/* Footer Action Button */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                  <Link
                    href={test.href}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 group-hover:bg-[#2563EB] text-[#0F172A] dark:text-white group-hover:text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <span>Take Assessment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
