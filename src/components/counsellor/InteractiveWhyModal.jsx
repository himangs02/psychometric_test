"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  UserCheck, 
  Target, 
  Compass, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert, 
  ArrowRight,
  BookOpen,
  Brain
} from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    id: 1,
    title: "1. Understand Yourself",
    badge: "Self-Awareness",
    icon: UserCheck,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    quote: "Your marks tell you how you performed academically. They don't necessarily tell you what type of work you enjoy or what environment suits you.",
    details: "School exams measure performance on a specific syllabus under time pressure. Psychometrics assesses your innate work style, cognitive predispositions, and genuine interests—the factors that actually determine whether you will feel fulfilled in a job 5–10 years from now."
  },
  {
    id: 2,
    title: "2. Discover Your Strengths",
    badge: "Cognitive Profile",
    icon: Brain,
    color: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    quote: "The assessment helps identify patterns in your interests, abilities and preferences.",
    details: "Whether you excel at spatial visualization, linguistic nuance, systematic logic, or interpersonal empathy, our calibrated frameworks (like Howard Gardner's Multiple Intelligences and Holland RIASEC) pinpoint your signature strengths."
  },
  {
    id: 3,
    title: "3. Explore Careers",
    badge: "Curated Discovery",
    icon: Compass,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    quote: "Instead of starting with thousands of possible careers, you can narrow your exploration to areas that align with your profile.",
    details: "The modern professional world has thousands of specialized titles. An assessment groups careers into structured domains matching your specific traits, transforming overwhelming confusion into a focused shortlist."
  },
  {
    id: 4,
    title: "4. Make Better Decisions",
    badge: "Clarity & Agency",
    icon: Target,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    quote: "The test doesn't choose your career for you. It gives you additional information that can help you make a more informed decision.",
    details: "You remain 100% the pilot of your future. The assessment is a high-resolution instrument on your dashboard—providing objective data so you and your family can discuss options with facts rather than emotional assumptions."
  },
  {
    id: 5,
    title: "5. Get Personalized Recommendations",
    badge: "Degree Mapping",
    icon: CheckCircle2,
    color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    quote: "Your results can connect your profile with suitable career domains and academic courses.",
    details: "Directly see which undergraduate degrees (e.g., B.Tech CSE, B.Des, BA LLB, BBA Entrepreneurship, Biotechnology) and university pathways best complement your unique psychological profile."
  }
];

export function InteractiveWhyModal({ open, onOpenChange, onStartAssessment }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 shadow-2xl">
        <DialogHeader className="text-left space-y-2 border-b border-[#F1F5F9] dark:border-white/5 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-white/10 text-[#1D68EE] dark:text-[#38BDF8] text-xs font-bold uppercase tracking-wider w-fit">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Educational Framework</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
            Why Should I Take a Psychometric Test?
          </DialogTitle>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3]">
            Understanding what a psychometric assessment actually does—and what it doesn’t do.
          </p>
        </DialogHeader>

        {/* 5 Interactive Pillars */}
        <div className="py-4 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#1D68EE] text-white border-[#1D68EE] shadow-md shadow-blue-500/20 scale-[1.02]" 
                      : "bg-[#F8F9FC] dark:bg-white/5 text-[#667085] dark:text-slate-300 border-[#E5E7EB] dark:border-white/10 hover:border-[#1D68EE]/40 hover:bg-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1.5" />
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">{sec.title.split('. ')[1]}</span>
                  <span className={`text-[9px] font-medium mt-0.5 ${isSelected ? "text-white/80" : "text-[#98A2B3]"}`}>Step {sec.id}</span>
                </button>
              );
            })}
          </div>

          {/* Active Section Content Display */}
          {(() => {
            const current = SECTIONS.find((s) => s.id === activeTab) || SECTIONS[0];
            const Icon = current.icon;
            return (
              <div className="rounded-2xl border border-[#E5E7EB] dark:border-white/10 p-5 sm:p-6 bg-gradient-to-br from-blue-50/30 to-white dark:from-[#181829] dark:to-[#111827] space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-white/10 text-[#1D68EE] dark:text-[#38BDF8] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D68EE] dark:text-[#38BDF8]">{current.badge}</span>
                    <h3 className="text-base sm:text-lg font-black text-[#111827] dark:text-white leading-tight">{current.title}</h3>
                  </div>
                </div>

                {/* Primary Core Quote */}
                <div className="border-l-4 border-[#1D68EE] pl-4 py-1 italic text-xs sm:text-sm font-semibold text-[#181829] dark:text-slate-200">
                  “{current.quote}”
                </div>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  {current.details}
                </p>
              </div>
            );
          })()}
        </div>

        {/* Section 8 Mandatory Disclaimer */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 p-4 space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Important Psychological Disclaimer</span>
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            “A psychometric test doesn&apos;t decide your future or guarantee that you&apos;ll succeed in a particular career. Think of it as a tool that helps you understand yourself and explore options more systematically.”
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F1F5F9] dark:border-white/5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full px-5 text-xs font-semibold"
          >
            Back to Conversation
          </Button>

          <Button
            onClick={() => {
              onOpenChange(false);
              if (onStartAssessment) onStartAssessment();
            }}
            className="rounded-full px-6 bg-[#F05018] hover:bg-[#D9410D] text-white text-xs font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Assessments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
