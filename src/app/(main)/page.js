"use client";

import React from "react";
import { CareerCompassHero } from "@/components/home/CareerCompassHero";
import { HowCompassHelps } from "@/components/home/HowCompassHelps";
import { ThreeSimpleSteps } from "@/components/home/ThreeSimpleSteps";
import { AllPsychometricTestsSection } from "@/components/home/AllPsychometricTestsSection";
import { StudentTestimonials } from "@/components/home/StudentTestimonials";
import { ReadyToFindDirectionCta } from "@/components/home/ReadyToFindDirectionCta";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section: "Confused About Your Career? You're Not Alone." */}
      <CareerCompassHero />

      {/* 2. "How Geeta Career Compass Helps You" (4 Pastel Cards) */}
      <HowCompassHelps />

      {/* 3. "Find Your Direction in 3 Simple Steps" (1-2-3 Process Cards) */}
      <ThreeSimpleSteps />

      {/* 4. "All 15 Psychometric Assessments" (Complete 15-Test Battery) */}
      <AllPsychometricTestsSection />

      {/* 5. "Hear From Students Like You" (Testimonials: Aanya, Rohan, Meera) */}
      <StudentTestimonials />

      {/* 6. "Ready to Find Your Direction?" (Doodle CTA Banner) */}
      <ReadyToFindDirectionCta />
    </div>
  );
}
