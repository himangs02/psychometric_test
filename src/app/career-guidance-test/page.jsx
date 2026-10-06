"use client";

import React from "react";
import Link from "next/link";
import {
  Monitor,
  CheckCircle2,
  Settings,
  TrendingUp,
  Database,
  BookText,
  Calculator,
  Music,
  Dumbbell,
  User,
  Users,
  Eye,
  Leaf,
  HelpCircle,
  Clock,
  ClipboardList,
  Grid2x2,
  Layers,
  FileText,
  CheckCircle,
  X,
  GraduationCap,
  UserCheck,
  Building2,
  Briefcase,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  BrainCircuit,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function CareerGuidancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* 1. Header */}
      <Navbar />

      <main className="flex-1 w-full pt-20">
        {/* 2. Hero Section */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
          <div className="relative rounded-[28px] overflow-hidden p-8 sm:p-14 bg-[#0B1020] text-white border border-[#4F46E5]/30 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.2)]">
            {/* Ambient Radial Lights */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#4F46E5]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#A5B4FC] text-[11px] font-bold uppercase tracking-wider border border-white/15 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Academic & Career Advisory Guide</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Confused About Career & Course Choices?
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#98A2B3] leading-relaxed">
                A complete scientific diagnostic framework for high-school and undergraduate students to map natural intelligence dimensions to optimal higher education degrees and industry careers.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/test?test=hgmi"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-[#4F46E5] hover:bg-[#3730A3] shadow-[0_10px_24px_-6px_rgba(79,70,229,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span>Take Free Gardner Test (90 Qs)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/test?test=riasec"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-200 cursor-pointer"
                >
                  <span>Quick RIASEC Test (18 Qs)</span>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-5 text-[11px] text-[#98A2B3]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>Instant Scoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Validated by O*NET & Gardner Models</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What & Why Section */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] text-[11px] font-bold uppercase tracking-wider border border-[#4F46E5]/15">
                  <Award className="w-3.5 h-3.5" />
                  <span>Scientific Methodology</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
                  What is Our Career Guidance Test?
                </h2>
                <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                  Our career guidance assessment cross-analyzes multidimensional cognitive traits against the international O*NET occupational database. It measures how you absorb information, solve logic puzzles, and relate to colleagues to compute your highest-affinity university majors.
                </p>
              </div>

              <div className="rounded-[22px] p-6 bg-gradient-to-br from-[#EEF2FF] to-white dark:from-[#111827] dark:to-[#1e1b4b]/20 border border-[#4F46E5]/20 flex flex-col sm:flex-row items-center gap-5 shadow-xs">
                <div className="text-4xl sm:text-5xl font-black text-[#4F46E5] dark:text-[#A5B4FC] font-mono">
                  93%
                </div>
                <div className="text-xs sm:text-sm text-[#111827] dark:text-slate-300 leading-relaxed">
                  of Indian high-school students are aware of only <strong>7 traditional career options</strong>, whereas over <strong>250 emerging disciplines</strong> with 5,000+ specialized job types exist in modern industry.
                </div>
              </div>
            </div>

            {/* Feature Cards Bento */}
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-[20px] p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] flex items-center justify-center shrink-0 border border-[#4F46E5]/15">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white">Data-Driven Scoring</h3>
                  <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-1">Standardized Likert metrics that eliminate subjective test-taker bias.</p>
                </div>
              </div>

              <div className="rounded-[20px] p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ECFEFF] dark:bg-[#06B6D4]/10 text-[#0891B2] dark:text-[#22D3EE] flex items-center justify-center shrink-0 border border-[#06B6D4]/20">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white">Curated Course Fit</h3>
                  <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-1">Recommended undergraduate and postgraduate degrees calibrated to your abilities.</p>
                </div>
              </div>

              <div className="rounded-[20px] p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] flex items-center justify-center shrink-0 border border-[#4F46E5]/15">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827] dark:text-white">O*NET Industry Mapping</h3>
                  <p className="text-xs text-[#667085] dark:text-[#98A2B3] mt-1">Backed by the global gold standard in occupational taxonomies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Howard Gardner 8 Intelligence Dimensions Grid */}
        <section className="py-16 bg-white/50 dark:bg-[#111827]/40 border-y border-[#E5E7EB] dark:border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] text-[11px] font-bold uppercase tracking-wider border border-[#4F46E5]/15">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Howard Gardner Model</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
                8 Multiple Intelligence Dimensions
              </h2>
              <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3] leading-relaxed">
                Discover which cognitive channels you naturally excel at.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Linguistic", desc: "Verbal agility, communication nuances, storytelling, and language synthesis.", icon: BookText },
                { title: "Logical-Mathematical", desc: "Scientific deduction, pattern recognition, coding logic, and numerical problem solving.", icon: Calculator },
                { title: "Musical", desc: "Rhythmic patterns, pitch sensitivity, acoustic awareness, and audio-emotional association.", icon: Music },
                { title: "Bodily-Kinesthetic", desc: "Motor coordination, tactile dexterity, somatic awareness, and dynamic physical agility.", icon: Dumbbell },
                { title: "Intrapersonal", desc: "Deep self-awareness, metacognition, intrinsic motivation, and emotional self-regulation.", icon: User },
                { title: "Interpersonal", desc: "Social empathy, team leadership, negotiation instincts, and collaborative rapport.", icon: Users },
                { title: "Spatial-Visual", desc: "Architectural imagination, 3D mental rotation, aesthetic geometry, and UI spatialization.", icon: Eye },
                { title: "Naturalist", desc: "Ecological discernment, biological classification, and environmental sensitivity.", icon: Leaf },
              ].map((dim) => {
                const IconComponent = dim.icon;
                return (
                  <div
                    key={dim.title}
                    className="rounded-[20px] p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 shadow-xs hover:border-[#C7D2FE] dark:hover:border-[#4F46E5]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-white/5 text-[#4F46E5] dark:text-[#A5B4FC] flex items-center justify-center border border-[#4F46E5]/15">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-[#111827] dark:text-white">{dim.title}</h3>
                      <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">{dim.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Assessment Comparison Matrix */}
        <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2.5 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
              Compare Our Core Assessments
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3]">
              Choose the diagnostic instrument that best matches your immediate timeline and goals.
            </p>
          </div>

          <div className="rounded-[24px] overflow-hidden border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#111827] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB] dark:border-white/10 bg-[#F8F9FC] dark:bg-white/5">
                    <th className="p-4 sm:p-5 font-black text-[#111827] dark:text-white w-2/5">Metric / Feature</th>
                    <th className="p-4 sm:p-5 font-black text-[#4F46E5] dark:text-[#A5B4FC] text-center w-3/10 bg-[#EEF2FF]/60 dark:bg-[#4F46E5]/10">
                      Multiple Intelligence (HGMI)
                    </th>
                    <th className="p-4 sm:p-5 font-black text-[#0891B2] dark:text-[#22D3EE] text-center w-3/10">
                      Career Interest (RIASEC)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-white/5">
                  {[
                    ["8 Intelligence Dimensions Breakdown", true, false],
                    ["Holland Code Hexagon Analysis", false, true],
                    ["Recommended Academic Degrees", true, true],
                    ["Detailed Psychological Report", true, true],
                    ["Total Calibrated Questions", "90 Questions (~10 mins)", "18 Questions (~5 mins)"],
                    ["Cost & Registration", "100% Free", "100% Free"],
                  ].map(([feature, hgmi, riasec], idx) => (
                    <tr key={idx} className="hover:bg-[#F8F9FC] dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-[#111827] dark:text-white">{feature}</td>
                      <td className="p-4 sm:p-5 text-center bg-[#EEF2FF]/30 dark:bg-[#4F46E5]/5 font-medium">
                        {typeof hgmi === "boolean" ? (
                          hgmi ? <CheckCircle className="w-4 h-4 text-[#059669] mx-auto" /> : <X className="w-4 h-4 text-[#98A2B3] mx-auto" />
                        ) : (
                          <span className="font-bold text-[#4F46E5] dark:text-[#A5B4FC]">{hgmi}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center font-medium">
                        {typeof riasec === "boolean" ? (
                          riasec ? <CheckCircle className="w-4 h-4 text-[#059669] mx-auto" /> : <X className="w-4 h-4 text-[#98A2B3] mx-auto" />
                        ) : (
                          <span className="font-bold text-[#0891B2] dark:text-[#22D3EE]">{riasec}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8F9FC] dark:bg-white/5">
                    <td className="p-4 sm:p-5"></td>
                    <td className="p-4 sm:p-5 text-center bg-[#EEF2FF]/60 dark:bg-[#4F46E5]/10">
                      <Link
                        href="/test?test=hgmi"
                        className="inline-block px-5 py-2 rounded-full text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#3730A3] shadow-xs"
                      >
                        Start HGMI Test
                      </Link>
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <Link
                        href="/test?test=riasec"
                        className="inline-block px-5 py-2 rounded-full text-xs font-bold text-white bg-[#06B6D4] hover:bg-[#0891B2] shadow-xs"
                      >
                        Start RIASEC Test
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}