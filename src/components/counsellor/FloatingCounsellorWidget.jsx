"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, MessageCircle, X, ArrowRight } from "lucide-react";

export function FloatingCounsellorWidget() {
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show the floating launcher when already on /counsellor
  const isCounsellorPage = pathname === "/counsellor" || pathname === "/ai-counsellor";

  useEffect(() => {
    // Show gentle teaser tooltip after 3 seconds on the site
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isCounsellorPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Speech Bubble Tooltip */}
      {showTooltip && !minimized && (
        <div className="pointer-events-auto mb-3 max-w-xs rounded-2xl bg-white dark:bg-[#181829] border border-slate-200/90 dark:border-white/10 p-3.5 shadow-xl animate-in fade-in-0 slide-in-from-bottom-2 duration-300 relative text-left">
          <button
            onClick={() => setMinimized(true)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] mb-1">
            <span>AI Career Counsellor</span>
          </div>
          <p className="text-xs text-[#0F172A] dark:text-slate-200 leading-snug font-medium">
            Not sure which career or test is right for you? Talk to our AI Counsellor first!
          </p>
          <Link
            href="/counsellor"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#FF5A1F] hover:text-[#EA580C] dark:text-[#FB923C] hover:underline"
          >
            <span>Start friendly conversation</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          {/* Arrow indicator */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white dark:bg-[#181829] border-r border-b border-slate-200/90 dark:border-white/10 rotate-45" />
        </div>
      )}

      {/* Launcher Button */}
      <Link
        href="/counsellor"
        className="pointer-events-auto group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D9480F] text-white shadow-[0_8px_25px_-5px_rgba(255,90,31,0.45)] hover:shadow-[0_12px_30px_-5px_rgba(255,90,31,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Open AI Career Counsellor"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <span className="text-xs sm:text-sm font-extrabold tracking-tight hidden sm:inline">
          AI Career Counsellor
        </span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </Link>
    </div>
  );
}
