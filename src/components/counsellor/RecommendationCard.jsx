"use client";

import React from "react";
import { Check, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RecommendationCard({ cardData, onContinueTalking, onWhyClick }) {
  if (!cardData) return null;

  const {
    testName = "Multiple Intelligence Test (Howard Gardner Framework)",
    testUrl = "/test?test=hgmi",
    estimatedTime = "5–10 minutes",
    bulletPoints = [
      "Your strongest areas & multiple intelligences",
      "Your core career interest code",
      "Your natural working preferences",
      "Careers and college courses that match your profile"
    ],
    reason = "Based on our conversation, a psychometric assessment could help you gain objective clarity before making a decision."
  } = cardData;

  return (
    <div className="w-full my-4 rounded-3xl border border-blue-200/80 dark:border-white/10 bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-[#181829] dark:via-[#131728] dark:to-[#181829] p-5 sm:p-6 shadow-[0_10px_35px_-10px_rgba(29,104,238,0.12)] space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1D68EE] dark:bg-[#38BDF8] animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1D68EE] dark:text-[#38BDF8]">
            YOUR NEXT STEP
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[11px] font-semibold text-[#667085] dark:text-[#98A2B3]">
          <Clock className="w-3 h-3 text-[#1D68EE] dark:text-[#38BDF8]" />
          <span>Estimated time: {estimatedTime}</span>
        </div>
      </div>

      {/* Recommended Test Title */}
      <div className="space-y-1.5 text-left">
        <h3 className="text-base sm:text-lg font-black text-[#111827] dark:text-white">
          {testName}
        </h3>
        <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
          {reason}
        </p>
      </div>

      {/* What it unlocks checklist */}
      <div className="rounded-2xl bg-white/80 dark:bg-black/20 border border-blue-500/15 dark:border-white/5 p-4 space-y-2 text-left">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">
          This assessment will help you understand:
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#181829] dark:text-slate-200">
          {bulletPoints.map((pt, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-50 dark:bg-white/10 text-[#1D68EE] dark:text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="leading-tight">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          href={testUrl}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#F05018] hover:bg-[#D9410D] shadow-md shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          <span>Take the Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Button
          type="button"
          variant="outline"
          onClick={onContinueTalking}
          className="rounded-full px-5 py-2.5 text-xs font-bold border-slate-300 dark:border-white/15 text-[#181829] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          <span>Continue Talking</span>
        </Button>

        {onWhyClick && (
          <button
            type="button"
            onClick={onWhyClick}
            className="text-[11px] font-semibold text-[#1D68EE] dark:text-[#38BDF8] hover:underline ml-auto cursor-pointer"
          >
            Why take this test?
          </button>
        )}
      </div>
    </div>
  );
}
