"use client";

import React from "react";
import { User, UserCheck, Heart, Compass, HelpCircle, Target } from "lucide-react";

export function SummaryCard({ summaryData }) {
  if (!summaryData) return null;

  const {
    youEnjoy = [],
    youAreConsidering = [],
    youAreUnsureAbout = [],
    mainGoal = "Make a more confident career decision"
  } = summaryData;

  return (
    <div className="w-full my-4 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] dark:from-[#131322] dark:via-[#181829] dark:to-[#131322] p-5 sm:p-6 shadow-sm space-y-4 text-left animate-in fade-in-0 zoom-in-95 duration-200">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="w-7 h-7 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Profile Reflection
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-[#111827] dark:text-white leading-tight">
            What I Understood About You
          </h3>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* You Enjoy */}
        <div className="rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Heart className="w-3.5 h-3.5" />
            <span>You enjoy</span>
          </div>
          <ul className="space-y-1 text-xs text-[#334155] dark:text-slate-300">
            {youEnjoy.length > 0 ? (
              youEnjoy.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-[#94A3B8] italic">Exploring current interests</li>
            )}
          </ul>
        </div>

        {/* You're Considering */}
        <div className="rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Compass className="w-3.5 h-3.5" />
            <span>You&apos;re considering</span>
          </div>
          <ul className="space-y-1 text-xs text-[#334155] dark:text-slate-300">
            {youAreConsidering.length > 0 ? (
              youAreConsidering.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-[#94A3B8] italic">Open to all suitable directions</li>
            )}
          </ul>
        </div>

        {/* You're Unsure About */}
        <div className="rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>You&apos;re unsure about</span>
          </div>
          <ul className="space-y-1 text-xs text-[#334155] dark:text-slate-300">
            {youAreUnsureAbout.length > 0 ? (
              youAreUnsureAbout.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-[#94A3B8] italic">Gaining confirmation on fit</li>
            )}
          </ul>
        </div>

        {/* Main Goal */}
        <div className="rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400">
            <Target className="w-3.5 h-3.5" />
            <span>Your main goal</span>
          </div>
          <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
            {mainGoal}
          </p>
        </div>
      </div>
    </div>
  );
}
