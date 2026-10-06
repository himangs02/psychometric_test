import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F46E5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] flex items-center justify-center border border-[#4F46E5]/20 shadow-lg shadow-[#4F46E5]/10">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
      </div>

      <div className="relative z-10 space-y-2 max-w-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] text-[11px] font-bold uppercase tracking-wider border border-[#4F46E5]/15">
          <Sparkles className="w-3 h-3 text-[#06B6D4]" />
          <span>404 Error</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-white tracking-tight">
          Assessment Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
          The psychometric assessment, question matrix, or diagnostic report you are looking for does not exist or has been relocated.
        </p>
      </div>

      <div className="relative z-10 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs text-white bg-[#4F46E5] hover:bg-[#3730A3] shadow-[0_10px_24px_-6px_rgba(79,70,229,0.5)] transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portal</span>
        </Link>
      </div>
    </div>
  );
}
