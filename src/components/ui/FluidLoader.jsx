"use client";

import React, { useEffect, useState } from "react";
import { PencilLoader } from "./PencilLoader";

export function FluidLoader({ isLoading = true, onComplete, minDuration = 1800 }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsMounted(false);
        if (onComplete) onComplete();
      }, 500);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F9FC] dark:bg-[#0B1020] text-[#111827] dark:text-white select-none transition-all duration-500 ease-out ${
        isExiting
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 scale-100"
      }`}
      role="status"
      aria-label="Loading Psychometric Portal"
    >
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        {/* The Animated Drawing Pencil SVG */}
        <PencilLoader />

        {/* Minimalist Portal Label */}
        <div className="text-center space-y-1">
          <h2 className="text-sm font-bold tracking-tight text-[#111827] dark:text-white uppercase tracking-wider">
            Preparing Assessment Portal
          </h2>
          <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
            Geeta University • Center for Psychometric Insights
          </p>
        </div>
      </div>
    </div>
  );
}

export default FluidLoader;
