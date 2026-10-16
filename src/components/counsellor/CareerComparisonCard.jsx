"use client";

import React from "react";
import { Scale, ArrowRight, CheckCircle2 } from "lucide-react";

export function CareerComparisonCard({ comparisonData }) {
  if (!comparisonData) return null;

  const {
    titleA = "Computer Science",
    titleB = "UI/UX Design",
    rows = [],
    matchA = 91,
    matchB = 78,
    summary = ""
  } = comparisonData;

  const getLevelBadge = (level) => {
    if (level === "Very High" || level === "High") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          {level}
        </span>
      );
    }
    if (level === "Medium" || level === "Medium-High") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          {level}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
        {level}
      </span>
    );
  };

  return (
    <div className="w-full my-4 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-[#181829] dark:via-[#141424] dark:to-[#181829] p-5 sm:p-6 shadow-sm space-y-4 text-left animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-white/10 text-[#1D68EE] dark:text-[#38BDF8] flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D68EE] dark:text-[#38BDF8]">
              Head-to-Head Comparison
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-[#111827] dark:text-white leading-tight">
              {titleA} vs {titleB}
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[11px] font-semibold text-[#667085] dark:text-[#98A2B3]">
          <span>Dimension Matrix</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 bg-[#FAF9FC] dark:bg-white/5">
              <th className="py-3 px-4 font-bold text-[#475467] dark:text-slate-300">Dimension / Area</th>
              <th className="py-3 px-4 font-extrabold text-[#1D68EE] dark:text-[#38BDF8] text-center sm:text-right">{titleA}</th>
              <th className="py-3 px-4 font-extrabold text-indigo-600 dark:text-indigo-400 text-center sm:text-right">{titleB}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-medium">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-[#181829] dark:text-slate-200">{row.trait}</td>
                <td className="py-2.5 px-4 text-center sm:text-right">{getLevelBadge(row.valA)}</td>
                <td className="py-2.5 px-4 text-center sm:text-right">{getLevelBadge(row.valB)}</td>
              </tr>
            ))}
            
            {/* Match Indicator Row */}
            <tr className="bg-blue-50/50 dark:bg-blue-900/10 font-black">
              <td className="py-3 px-4 text-[#181829] dark:text-white">Profile Alignment Match</td>
              <td className="py-3 px-4 text-center sm:text-right text-[#1D68EE] dark:text-[#38BDF8] font-mono text-sm sm:text-base">
                {matchA}%
              </td>
              <td className="py-3 px-4 text-center sm:text-right text-indigo-600 dark:text-indigo-400 font-mono text-sm sm:text-base">
                {matchB}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {summary && (
        <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-white/5 p-3.5 rounded-xl border border-slate-200/60 dark:border-white/5">
          {summary}
        </p>
      )}
    </div>
  );
}
