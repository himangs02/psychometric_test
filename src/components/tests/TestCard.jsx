"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestCard({ test }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    setIsLoading(true);
  };

  const IconComponent = test.icon || Sparkles;

  // Theme accent colors based on test category
  const themeGradients = {
    "Career & Ambition": {
      glow: "rgba(79, 70, 229, 0.12)",
      borderGlow: "rgba(79, 70, 229, 0.35)",
      topAccent: "from-[#4F46E5] via-[#6366F1] to-[#06B6D4]",
      iconBg: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] border-[#4F46E5]/20",
      badge: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] border-[#4F46E5]/20",
      dot: "bg-[#4F46E5]",
    },
    "Intelligence & Cognitive": {
      glow: "rgba(6, 182, 212, 0.12)",
      borderGlow: "rgba(6, 182, 212, 0.35)",
      topAccent: "from-[#06B6D4] via-[#3B82F6] to-[#4F46E5]",
      iconBg: "bg-[#ECFEFF] dark:bg-[#06B6D4]/10 text-[#0891B2] dark:text-[#22D3EE] border-[#06B6D4]/20",
      badge: "bg-[#ECFEFF] dark:bg-[#06B6D4]/10 text-[#0891B2] dark:text-[#22D3EE] border-[#06B6D4]/20",
      dot: "bg-[#06B6D4]",
    },
    "Personality & Mindset": {
      glow: "rgba(79, 70, 229, 0.12)",
      borderGlow: "rgba(79, 70, 229, 0.35)",
      topAccent: "from-[#4F46E5] via-[#818CF8] to-[#06B6D4]",
      iconBg: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] border-[#4F46E5]/20",
      badge: "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] border-[#4F46E5]/20",
      dot: "bg-[#4F46E5]",
    },
    "Emotional & Social": {
      glow: "rgba(6, 182, 212, 0.12)",
      borderGlow: "rgba(6, 182, 212, 0.35)",
      topAccent: "from-[#06B6D4] via-[#4F46E5] to-[#3730A3]",
      iconBg: "bg-[#ECFEFF] dark:bg-[#06B6D4]/10 text-[#0891B2] dark:text-[#22D3EE] border-[#06B6D4]/20",
      badge: "bg-[#ECFEFF] dark:bg-[#06B6D4]/10 text-[#0891B2] dark:text-[#22D3EE] border-[#06B6D4]/20",
      dot: "bg-[#06B6D4]",
    },
  };

  const theme =
    themeGradients[test.category] || themeGradients["Career & Ambition"];

  return (
    <Link
      href={test.href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="test-card-item group relative h-full rounded-[24px] p-[1px] transition-all duration-300 hover:-translate-y-1.5 block focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 cursor-pointer select-none"
    >
      {/* 1. Dynamic Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.borderGlow}, transparent 70%)`
            : "transparent",
        }}
      />

      {/* 2. Glassmorphic Card Surface */}
      <div className="relative h-full w-full rounded-[24px] bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(79,70,229,0.12)] hover:border-[#C7D2FE] dark:hover:border-[#4F46E5]/40 transition-all duration-300 overflow-hidden">
        {/* Subtle Ambient Radial Lighting in Top Corner */}
        <div
          className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100"
          style={{ background: theme.glow }}
        />

        {/* Top Animated Shimmer Bar when Clicked / Loading */}
        {isLoading ? (
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent animate-pulse" />
        ) : (
          <div
            className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${theme.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
        )}

        <div className="space-y-4 relative z-10">
          {/* Header Row: Category Badge & Time */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-2xs",
                theme.badge
              )}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`}
              />
              {test.badge}
            </span>

            {test.duration && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#667085] dark:text-[#98A2B3] bg-[#F8F9FC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3 h-3 text-[#98A2B3]" />
                {test.duration}
              </span>
            )}
          </div>

          {/* Test Icon & Title */}
          <div className="flex items-start gap-3.5 pt-1">
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-xs transition-all duration-300 group-hover:scale-105",
                theme.iconBg
              )}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#111827] dark:text-white group-hover:text-[#4F46E5] dark:group-hover:text-[#A5B4FC] transition-colors duration-200 leading-snug">
                {test.title}
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-medium text-[#059669] dark:text-[#34D399]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Validated Instrument</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] line-clamp-3 leading-relaxed">
            {test.desc}
          </p>
        </div>

        {/* Footer Action with Interactive Micro-interactions & Loading State */}
        <div className="pt-4 mt-4 border-t border-[#F1F5F9] dark:border-white/5 flex items-center justify-between relative z-10">
          <span className="text-xs font-bold text-[#4F46E5] dark:text-[#A5B4FC] group-hover:text-[#3730A3] transition-colors flex items-center gap-1.5">
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4F46E5]" />
                <span>Opening Test...</span>
              </>
            ) : (
              <span>Start Assessment</span>
            )}
          </span>

          <div
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xs",
              isLoading
                ? "bg-[#4F46E5] text-white animate-spin"
                : "bg-[#EEF2FF] dark:bg-white/5 text-[#4F46E5] dark:text-[#A5B4FC] group-hover:bg-[#4F46E5] group-hover:text-white group-hover:scale-105 group-hover:translate-x-1"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
