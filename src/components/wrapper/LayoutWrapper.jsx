"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BackgroundEffect } from "@/components/ui/BackgroundEffect";
import { FluidLoader } from "@/components/ui/FluidLoader";

export default function LayoutWrapper({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-[#4F46E5]/15 selection:text-[#4F46E5] relative">
      {/* 1. Fluid Liquid Intelligence Initial Page Loader */}
      {initialLoading && (
        <FluidLoader minDuration={1400} onComplete={() => setInitialLoading(false)} />
      )}

      {/* 2. Ambient background visual layers */}
      <BackgroundEffect />

      {/* 3. Modern Floating Header */}
      <Navbar />

      {/* 4. Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* 5. Sleek University Footer */}
      <Footer />
    </div>
  );
}


