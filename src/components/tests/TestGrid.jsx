"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ALL_TESTS } from "./TestCardsData";

const CATEGORIES = [
  "All Tests",
  "Career & Ambition",
  "Intelligence & Cognitive",
  "Personality & Mindset",
  "Emotional & Social",
];

export function TestGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All Tests");

  const filteredTests = useMemo(() => {
    if (selectedCategory === "All Tests") return ALL_TESTS;
    return ALL_TESTS.filter((test) => test.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="tests" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative">
      {/* Header Section with Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-3 max-w-2xl text-left">
          {/* Subheader */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#801A45] dark:text-[#F472B6]">
            <span className="w-5 h-[2px] bg-[#801A45]" />
            <span>OUR TESTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#181829] dark:text-white tracking-tight leading-tight">
            Explore Your Personality with Our Tests
          </h2>

          <p className="text-sm text-[#667085] dark:text-[#A0A0B5] leading-relaxed">
            Choose from our complete catalog of {ALL_TESTS.length} scientifically calibrated assessments to understand your cognitive strengths, behavioral traits, and career orientation.
          </p>
        </div>

        {/* Category Count Tag */}
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#801A45] dark:text-[#F472B6] bg-[#FAF5F8] dark:bg-white/5 border border-[#801A45]/15">
            <span className="w-2 h-2 rounded-full bg-[#801A45]" />
            <span>{ALL_TESTS.length} Standardized Tests Available</span>
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === "All Tests"
              ? ALL_TESTS.length
              : ALL_TESTS.filter((t) => t.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-[#801A45] text-white shadow-[0_4px_14px_rgba(128,26,69,0.25)] scale-[1.02]"
                  : "bg-white dark:bg-white/5 text-[#667085] dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-[#801A45]/30 hover:text-[#801A45] dark:hover:text-white"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-white/10 text-[#667085] dark:text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of All Available Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredTests.map((test) => {
          const IconComp = test.icon;
          return (
            <Link
              key={test.id || test.href}
              href={test.href}
              className="group relative rounded-[26px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(128,26,69,0.08)] hover:border-[#D8B4FE]"
            >
              <div className="space-y-4">
                {/* Icon & Duration Header */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105 ${test.iconBg}`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  {test.duration && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#667085] dark:text-slate-400 px-2.5 py-1 rounded-full bg-[#FAF9FC] dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                      <Clock className="w-3 h-3 text-[#98A2B3]" />
                      <span>{test.duration}</span>
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#181829] dark:text-white group-hover:text-[#801A45] dark:group-hover:text-[#F472B6] transition-colors leading-snug">
                    {test.title}
                  </h3>
                  {test.subtitle && (
                    <div className="text-xs font-semibold text-[#801A45] dark:text-[#F472B6]">
                      {test.subtitle}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#667085] dark:text-[#A0A0B5] leading-relaxed line-clamp-3">
                  {test.desc}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/5 mt-4">
                <span className="text-xs font-bold text-[#801A45] dark:text-[#F472B6] group-hover:underline">
                  Take Assessment
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xs bg-[#F4EFF7] dark:bg-white/5 text-[#181829] dark:text-white group-hover:bg-[#801A45] group-hover:text-white group-hover:scale-110">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default TestGrid;
