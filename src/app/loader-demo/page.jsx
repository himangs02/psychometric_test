"use client";

import React, { useState } from "react";
import MultiStepLoaderDemo from "@/components/multi-step-loader-demo";
import { FluidLoader } from "@/components/ui/FluidLoader";
import { Sparkles, Play } from "lucide-react";

export default function LoaderDemoPage() {
  const [showPencilLoader, setShowPencilLoader] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1020] text-white flex flex-col items-center justify-center p-6 space-y-12">
      {showPencilLoader && (
        <FluidLoader
          minDuration={3000}
          onComplete={() => setShowPencilLoader(false)}
        />
      )}

      {/* Demo Section 1: Animated Pencil Loader */}
      <div className="text-center space-y-4 max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30 text-[#A5B4FC] text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Loader</span>
        </div>
        <h1 className="text-2xl font-black">Pencil Drawing Loader</h1>
        <p className="text-xs text-[#98A2B3]">
          Continuous circular drawing and erasing pencil animation.
        </p>
        <button
          onClick={() => setShowPencilLoader(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold transition shadow-lg shadow-[#4F46E5]/40 cursor-pointer text-xs"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Preview Pencil Loader</span>
        </button>
      </div>

      {/* Demo Section 2: Multi-Step Assessment Loader */}
      <div className="text-center space-y-4 w-full max-w-xl">
        <h2 className="text-xl font-bold text-slate-300">Multi-Step Loader Demo</h2>
        <p className="text-xs text-slate-500">Used during assessment scoring & calculation</p>
        <MultiStepLoaderDemo />
      </div>
    </div>
  );
}
