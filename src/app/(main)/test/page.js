"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TESTS } from "@/data";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  BrainCircuit,
  Award,
  BookOpen,
  User,
  GraduationCap,
  Printer,
  Home,
  ShieldCheck,
  Check,
} from "lucide-react";
import axios from "axios";

const selectFields = {
  gender: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ],
};

const assessmentLoadingStates = [
  { text: "Processing your responses..." },
  { text: "Calculating psychometric dimensions..." },
  { text: "Mapping behavioral archetypes..." },
  { text: "Generating personalized growth insights..." },
];

function ResultContent({ testKey, resultDetails, score }) {
  if (!resultDetails) return null;

  if (testKey === "belbin") {
    return (
      <div className="space-y-6 pt-2">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#4F46E5]/20 bg-gradient-to-br from-[#EEF2FF] to-white dark:from-[#4F46E5]/10 dark:to-transparent p-6 text-center shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">Primary Role</span>
            <p className="text-2xl font-black text-[#4F46E5] dark:text-[#A5B4FC] mt-1">{resultDetails.primaryRole?.name}</p>
            <p className="text-4xl font-black text-[#111827] dark:text-white mt-1 font-mono">{resultDetails.primaryRole?.score}</p>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] dark:border-white/10 bg-[#F8F9FC] dark:bg-[#111827]/50 p-6 text-center shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">Secondary Role</span>
            <p className="text-2xl font-black text-[#111827] dark:text-white mt-1">{resultDetails.secondaryRole?.name}</p>
            <p className="text-4xl font-black text-[#667085] dark:text-[#98A2B3] mt-1 font-mono">{resultDetails.secondaryRole?.score}</p>
          </div>
        </div>

        <p className="text-[#111827] dark:text-slate-300 leading-relaxed text-sm sm:text-base">{resultDetails.description}</p>

        <div className="rounded-2xl border border-[#E5E7EB] dark:border-white/10 p-5 bg-[#F8F9FC] dark:bg-[#111827]/50 space-y-3">
          <h3 className="font-bold text-[#4F46E5] dark:text-[#A5B4FC] text-sm flex items-center gap-2 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Complete Team Role Profile</span>
          </h3>
          <div className="space-y-3">
            {resultDetails.roleDetails?.map((role, index) => (
              <div key={role.id} className={`rounded-xl border bg-white dark:bg-[#111827] p-4 shadow-xs ${index < 2 ? "border-[#4F46E5]/40" : "border-[#E5E7EB] dark:border-white/10"}`}>
                <div className="flex justify-between gap-3 items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111827] dark:text-white text-sm">{index + 1}. {role.name}</span>
                    {index === 0 && <span className="text-[10px] font-bold rounded-full bg-[#4F46E5] text-white px-2.5 py-0.5">Primary</span>}
                    {index === 1 && <span className="text-[10px] font-bold rounded-full bg-[#EEF2FF] dark:bg-white/10 text-[#4F46E5] dark:text-[#A5B4FC] px-2.5 py-0.5">Secondary</span>}
                  </div>
                  <span className="font-mono font-bold text-base text-[#4F46E5] dark:text-[#A5B4FC]">{role.score}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mt-3 text-xs text-[#667085] dark:text-[#98A2B3]">
                  <div><strong>Function:</strong> {role.function}</div>
                  <div><strong>Strength:</strong> {role.strength}</div>
                  <div><strong>Watch-out:</strong> {role.weakness}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  if (testKey === "mcclelland") {
    return (
      <div className="space-y-6 pt-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-white dark:from-[#4F46E5]/10 dark:to-transparent border border-[#4F46E5]/20 p-6 text-center shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">Dominant Motivational Need</span>
          <p className="text-3xl sm:text-4xl font-black text-[#4F46E5] dark:text-[#A5B4FC] mt-1">{resultDetails.dominantNeed?.name}</p>
          <p className="text-xs font-semibold text-[#667085] dark:text-[#98A2B3] mt-1">Secondary Need: {resultDetails.secondaryNeed?.name}</p>
        </div>
        <p className="text-[#111827] dark:text-slate-300 leading-relaxed text-sm sm:text-base">{resultDetails.description}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {resultDetails.motivationDetails?.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#111827] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#111827] dark:text-white text-sm">{item.name}</h3>
                  <span className="font-mono font-bold text-[#4F46E5] dark:text-[#A5B4FC]">{item.score}/40</span>
                </div>
                <div className="h-2 rounded-full bg-[#F1F5F9] dark:bg-white/10 overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
                <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  if (testKey === "mbti") {
    return (
      <div className="space-y-6 pt-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-white dark:from-[#4F46E5]/10 dark:to-transparent border border-[#4F46E5]/20 p-7 text-center shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">Your 4-Letter Personality Profile</span>
          <p className="text-5xl sm:text-6xl font-black tracking-widest text-[#4F46E5] dark:text-[#A5B4FC] mt-2 font-mono">{resultDetails.type}</p>
          <p className="text-base sm:text-lg font-bold text-[#111827] dark:text-white mt-1">{resultDetails.typeName}</p>
        </div>
        <p className="text-[#111827] dark:text-slate-300 leading-relaxed text-center max-w-2xl mx-auto text-sm sm:text-base">{resultDetails.description}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {resultDetails.dimensionScores?.map((d) => (
            <div key={d.dimension} className="rounded-2xl border border-[#E5E7EB] dark:border-white/10 p-5 bg-[#F8F9FC] dark:bg-[#111827]/50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#4F46E5] dark:text-[#A5B4FC] text-sm">{d.dimension}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#EEF2FF] dark:bg-white/10 text-[#4F46E5] dark:text-[#A5B4FC]">Prefers {d.preference}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className={`rounded-xl p-2.5 transition-colors ${d.preference === d.left ? "bg-[#4F46E5] text-white shadow-xs font-bold" : "bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 text-[#667085] dark:text-slate-400"}`}>
                  <div className="text-[10px] uppercase font-bold">{d.left}</div>
                  <div className="text-sm font-black mt-0.5 font-mono">{d.leftScore}</div>
                </div>
                <div className={`rounded-xl p-2.5 transition-colors ${d.preference === d.right ? "bg-[#4F46E5] text-white shadow-xs font-bold" : "bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-white/10 text-[#667085] dark:text-slate-400"}`}>
                  <div className="text-[10px] uppercase font-bold">{d.right}</div>
                  <div className="text-sm font-black mt-0.5 font-mono">{d.rightScore}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  if (resultDetails.breakdown) {
    return (
      <div className="space-y-6 pt-2">
        <div className="space-y-3">
          <h3 className="font-bold text-[#111827] dark:text-white text-xs uppercase tracking-wider">Top Dimensional Strengths</h3>
          {resultDetails.breakdown.slice(0, 3).map((cat, index) => (
            <div key={cat.id || cat.name} className="rounded-2xl border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#111827] p-4 flex items-center justify-between shadow-xs">
              <span className="font-bold text-[#111827] dark:text-white text-sm">{index + 1}. {cat.name}</span>
              <span className="font-mono font-black text-lg text-[#4F46E5] dark:text-[#A5B4FC]">{cat.score}</span>
            </div>
          ))}
        </div>
        <p className="text-[#111827] dark:text-slate-300 leading-relaxed text-sm sm:text-base">{resultDetails.description}</p>
        <Suggestions suggestions={resultDetails.suggestions} />
      </div>
    );
  }

  return (
    <div className="space-y-5 pt-2">
      {typeof resultDetails === "string" ? (
        <p className="text-xl font-bold text-[#4F46E5] dark:text-[#A5B4FC] text-center">{resultDetails}</p>
      ) : (
        <>
          {score !== null && (
            <div className="text-center py-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">Overall Standardized Score</span>
              <p className="font-black text-[#4F46E5] dark:text-[#A5B4FC] text-5xl sm:text-6xl mt-1 tracking-tight font-mono">{score}</p>
            </div>
          )}
          <p className="text-[#111827] dark:text-slate-300 leading-relaxed text-center font-medium text-sm sm:text-base max-w-xl mx-auto">{resultDetails.description}</p>
          {resultDetails.studentProfile && <InfoBox title="Student Profile Summary" text={resultDetails.studentProfile} />}
          {resultDetails.goal && <InfoBox title="Recommended Action Goal" text={resultDetails.goal} />}
          <Suggestions suggestions={resultDetails.suggestions} />
        </>
      )}
    </div>
  );
}

function InfoBox({ title, text }) {
  return (
    <div className="bg-[#F8F9FC] dark:bg-[#111827]/50 p-5 rounded-2xl border border-[#E5E7EB] dark:border-white/10 space-y-1">
      <h4 className="font-bold text-[#4F46E5] dark:text-[#A5B4FC] text-xs uppercase tracking-wider">{title}</h4>
      <p className="text-[#111827] dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Suggestions({ suggestions }) {
  if (!suggestions?.length) return null;
  return (
    <div className="bg-[#EEF2FF]/70 dark:bg-[#4F46E5]/10 p-5 rounded-2xl border border-[#4F46E5]/20 space-y-2">
      <h4 className="font-bold text-[#4F46E5] dark:text-[#A5B4FC] text-xs uppercase tracking-wider flex items-center gap-1.5">
        <span>Actionable Growth Roadmap</span>
      </h4>
      <ul className="list-disc list-inside text-[#111827] dark:text-slate-300 text-xs sm:text-sm space-y-1.5 leading-relaxed">
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

function SchoolSelect({ value, onChange, schools }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredSchools = useMemo(() => {
    if (!value) return schools;
    return schools.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
  }, [schools, value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1.5 relative" ref={containerRef}>
      <Label htmlFor="school_name" className="text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">University / Institution</Label>
      <div className="relative">
        <Input
          id="school_name"
          type="text"
          placeholder="Select or type institution name"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pr-8 rounded-xl bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5]/30 text-xs sm:text-sm"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#111827] focus:outline-none cursor-pointer"
        >
          <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isOpen && filteredSchools.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-48 overflow-y-auto rounded-2xl border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#111827] p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95">
          {filteredSchools.map((school, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 text-xs sm:text-sm rounded-xl cursor-pointer transition-colors ${value === school
                ? "bg-[#4F46E5] text-white font-medium"
                : "text-[#111827] dark:text-slate-200 hover:bg-[#EEF2FF] dark:hover:bg-white/5 hover:text-[#4F46E5]"
                }`}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(school);
                setIsOpen(false);
              }}
            >
              {school}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ImprovedPersonalityTest() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resultDetails, setResultDetails] = useState(null);
  const [schools, setSchools] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "", dob: "", class: "", gender: "", email: "", father_name: "", phone: "", school_name: "", state: "", city: "",
  });

  const test = selectedTest ? TESTS[selectedTest] : null;
  const kind = test?.kind;
  const isSpecial = ["belbin", "mcclelland", "mbti"].includes(selectedTest);
  const totalSteps = kind === "belbin" ? test?.sections?.length : test?.questions?.length || 0;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const testParam = query.get("test");
    if (testParam && TESTS[testParam]) setSelectedTest(testParam);
    axios.get("/api/schools").then((res) => setSchools(res.data)).catch(console.error);
  }, []);

  const reset = () => {
    setScore(null); setAnswers([]); setCurrentIndex(0); setResultDetails(null); setFormSubmitted(false); setOpen(false);
  };

  const handleTestSelect = (val) => { setSelectedTest(val); reset(); };

  const handleStandardAnswer = (value) => {
    const updated = [...answers]; updated[currentIndex] = value; setAnswers(updated);
  };

  const handleBelbinPoint = (sectionIndex, itemIndex, value) => {
    const updated = answers.length ? answers.map((s) => [...(s || [])]) : Array.from({ length: test.sections.length }, () => Array(8).fill(0));
    updated[sectionIndex][itemIndex] = Math.max(0, Math.min(10, Number(value) || 0));
    setAnswers(updated);
  };

  const sectionTotal = kind === "belbin" ? (answers[currentIndex] || []).reduce((sum, value) => sum + Number(value || 0), 0) : 0;
  const belbinSelectedCount = kind === "belbin" ? (answers[currentIndex] || []).filter((value) => Number(value || 0) > 0).length : 0;
  const belbinSectionComplete = kind === "belbin" && sectionTotal === 10 && belbinSelectedCount >= 1 && belbinSelectedCount <= 3;

  const allAnswered = useMemo(() => {
    if (!test) return false;
    if (kind === "belbin") return answers.length === test.sections.length && answers.every((section) => section?.length === 8 && section.reduce((s, v) => s + Number(v || 0), 0) === 10);
    return answers.length === test.questions.length && answers.every((answer) => answer !== undefined && answer !== null && answer !== "");
  }, [answers, kind, test]);

  const calculateScore = async () => {
    if (!test || submitting || !allAnswered) return;
    setSubmitting(true);
    try {
      let totalScore = 0;
      let interpretation;

      if (kind === "belbin") {
        interpretation = test.score(answers);
        totalScore = interpretation.primaryRole?.score ?? 0;
      } else if (kind === "mcclelland") {
        interpretation = test.score(answers);
        totalScore = interpretation.dominantNeed?.score ?? 0;
      } else if (kind === "mbti") {
        interpretation = test.score(answers);
        totalScore = interpretation.dimensionScores.reduce((sum, item) => sum + Math.max(item.leftScore, item.rightScore), 0);
      } else if (test.categories) {
        const categoryScores = test.categories.map((category) => {
          let categorySum = 0;
          if (category.range && category.range.length === 2) {
            for (let i = category.range[0]; i <= category.range[1]; i++) {
              const val = answers[i];
              if (val !== undefined) {
                const idx = test.options.indexOf(val);
                categorySum += test.scoring[i]?.[idx] ?? idx;
              }
            }
          }
          return { ...category, score: categorySum };
        });
        totalScore = categoryScores.reduce((sum, cat) => sum + cat.score, 0);
        interpretation = test.interpret(totalScore);
        interpretation.breakdown = categoryScores.sort((a, b) => b.score - a.score);
      } else {
        totalScore = answers.reduce((sum, val, i) => {
          const idx = test.options.indexOf(val);
          return sum + (test.scoring[i]?.[idx] || 0);
        }, 0);
        interpretation = test.interpret(totalScore);
      }

      setScore(totalScore);
      setResultDetails(interpretation);
      setOpen(true);

      const payload = {
        name: userInfo.name,
        dob: userInfo.dob || null,
        course: userInfo.class,
        married: 0,
        education: "",
        religion: "not-specified",
        gender: userInfo.gender,
        email: userInfo.email,
        occupation: userInfo.father_name,
        phone: userInfo.phone,
        institution: userInfo.school_name,
        city: userInfo.city,
        state: userInfo.state,
        rural_or_urban: "not-specified",
        test_key: selectedTest,
        test_name: test.title,
        score: totalScore,
        result: interpretation,
        responses: answers,
      };

      await axios.post("/api/submit-details", payload);
    } catch (error) {
      console.error("Failed to submit result", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-16 space-y-8 relative">
      {/* Multi-Step Loader Overlay during Assessment Submission */}
      <MultiStepLoader
        loadingStates={assessmentLoadingStates}
        loading={submitting}
        duration={1500}
        loop={false}
      />

      {/* Header & Test Selection */}
      {!formSubmitted && (
        <div className="space-y-4 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#4F46E5] dark:text-[#A5B4FC] text-[11px] font-bold uppercase tracking-wider">

            <span>Assessment Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-white tracking-tight">
            Select Your Assessment
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3]">
            Choose an instrument from the catalog below to start your standardized test.
          </p>
          <div className="pt-2">
            <Select onValueChange={handleTestSelect} value={selectedTest || ""}>
              <SelectTrigger className="w-full h-12 rounded-2xl bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 text-xs sm:text-sm font-semibold shadow-xs">
                <SelectValue placeholder="Choose an assessment to begin..." />
              </SelectTrigger>
              <SelectContent className="max-h-72 rounded-2xl bg-white dark:bg-[#111827]">
                {Object.entries(TESTS).map(([key, item]) => (
                  <SelectItem key={key} value={key} className="text-xs sm:text-sm font-medium py-2.5">
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Candidate Registration Form */}
      {selectedTest && !formSubmitted && (
        <Card className="w-full rounded-[24px] border border-[#E5E7EB] dark:border-white/10 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl shadow-xl overflow-hidden animate-in fade-in-0 slide-in-from-bottom-3 duration-300">
          <div className="bg-gradient-to-r from-[#0B1020] via-[#1e1b4b] to-[#0B1020] px-6 sm:px-8 py-5 text-white flex items-center justify-between border-b border-white/10">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#A5B4FC]">Registration Step</span>
              <h2 className="text-base sm:text-lg font-black">Candidate Information</h2>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#A5B4FC]">
              <User className="w-4 h-4" />
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <p className="text-xs sm:text-sm text-[#667085] dark:text-[#98A2B3]">
              Please enter your details accurately for your verified psychometric scoring and report.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                ["name", "Full Name", "text", "e.g. Rahul Sharma"],
                ["dob", "Date of Birth", "date", ""],
                ["class", "Course / Department", "text", "e.g. B.Tech CSE / MBA"],
                ["email", "Email Address", "email", "e.g. rahul@example.com"],
                ["father_name", "Father's Name", "text", "e.g. Mr. S. Sharma"],
                ["phone", "Phone Number", "tel", "e.g. 9876543210"],
                ["school_name", "University / Institution", "text", ""],
                ["state", "State", "text", "e.g. Haryana"],
                ["city", "City", "text", "e.g. Panipat"],
              ].map(([key, label, type, placeholder]) => (
                key === "school_name" ? (
                  <SchoolSelect
                    key={key}
                    value={userInfo.school_name}
                    onChange={(val) => setUserInfo({ ...userInfo, school_name: val })}
                    schools={schools}
                  />
                ) : (
                  <div key={key} className="space-y-1.5">
                    <Label htmlFor={key} className="text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">
                      {label}
                    </Label>
                    <Input
                      id={key}
                      type={type}
                      placeholder={placeholder}
                      value={userInfo[key]}
                      onChange={(e) => setUserInfo({ ...userInfo, [key]: e.target.value })}
                      className="rounded-xl bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 focus:ring-2 focus:ring-[#4F46E5]/30 text-xs sm:text-sm"
                    />
                  </div>
                )
              ))}

              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#98A2B3]">
                  Gender
                </Label>
                <Select
                  value={userInfo.gender}
                  onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}
                >
                  <SelectTrigger className="rounded-xl bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 text-xs sm:text-sm">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white dark:bg-[#111827]">
                    {selectFields.gender.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <Button
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#4F46E5] text-white hover:bg-[#3730A3] font-bold shadow-[0_10px_24px_-6px_rgba(79,70,229,0.5)] transition-all duration-200 cursor-pointer text-xs sm:text-sm"
                disabled={!userInfo.name || !userInfo.email || !userInfo.phone}
                onClick={() => setFormSubmitted(true)}
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Question Card */}
      {selectedTest && formSubmitted && (
        <Card className="w-full rounded-[24px] border border-[#E5E7EB] dark:border-white/10 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in-0 duration-300">
          {/* Top Progress Bar */}
          <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[#F1F5F9] dark:border-white/5">
            <div className="flex justify-between items-center gap-4 mb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4F46E5] dark:text-[#A5B4FC]">
                  {test?.title}
                </span>
                <div className="text-base sm:text-lg font-black text-[#111827] dark:text-white">
                  {kind === "belbin"
                    ? `Section ${currentIndex + 1} of ${totalSteps}`
                    : `Question ${currentIndex + 1} of ${totalSteps}`}
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#A5B4FC] font-mono font-bold text-xs">
                {Math.round(((currentIndex + 1) / totalSteps) * 100)}% Completed
              </div>
            </div>

            {/* Visual Progress Track */}
            <div className="h-1.5 bg-[#F1F5F9] dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Belbin Assessment Section Layout */}
            {kind === "belbin" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-[#EEF2FF]/60 dark:bg-[#4F46E5]/10 border border-[#4F46E5]/20 p-5 space-y-1">
                  <h2 className="text-base font-bold text-[#4F46E5] dark:text-[#A5B4FC]">
                    Section {test.sections[currentIndex].label}
                  </h2>
                  <p className="text-[#111827] dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {test.sections[currentIndex].prompt}
                  </p>
                  <p className="text-[11px] font-semibold text-[#667085] dark:text-[#98A2B3] pt-1">
                    Allocate exactly 10 points across the 8 statements (select 1 to 3 statements).
                  </p>
                </div>

                <div className="space-y-3">
                  {test.sections[currentIndex].items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="grid grid-cols-[1fr_90px] gap-4 items-center rounded-2xl border border-[#E5E7EB] dark:border-white/10 p-4 bg-white dark:bg-[#111827] shadow-xs hover:border-[#4F46E5]/40 transition-colors"
                    >
                      <div className="text-xs sm:text-sm text-[#111827] dark:text-slate-200 leading-relaxed">
                        <span className="font-bold text-[#4F46E5] mr-2">
                          {item.number}.
                        </span>
                        {item.text}
                      </div>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={answers[currentIndex]?.[itemIndex] ?? 0}
                        onChange={(e) =>
                          handleBelbinPoint(currentIndex, itemIndex, e.target.value)
                        }
                        className="text-center font-mono font-bold rounded-xl h-10 text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div
                  className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm ${belbinSectionComplete
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300"
                    : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300"
                    }`}
                >
                  Points allocated: {sectionTotal} / 10 · Statements selected: {belbinSelectedCount} / 3
                </div>
              </div>
            )}

            {/* MBTI Question Layout */}
            {kind === "mbti" && (() => {
              const question = test.questions[currentIndex];
              return (
                <div className="space-y-5">
                  <div className="text-base sm:text-lg font-bold text-[#111827] dark:text-white leading-relaxed">
                    <span className="text-[#4F46E5] mr-2">{question.number}.</span>
                    {question.prompt}
                  </div>
                  <RadioGroup
                    value={answers[currentIndex] || ""}
                    onValueChange={handleStandardAnswer}
                    className="space-y-3"
                  >
                    {Object.entries(question.options).map(([key, text]) => {
                      const isSelected = answers[currentIndex] === key;
                      return (
                        <div
                          key={key}
                          onClick={() => handleStandardAnswer(key)}
                          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${isSelected
                            ? "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 border-[#4F46E5] shadow-xs"
                            : "bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 hover:border-[#C7D2FE] dark:hover:border-[#4F46E5]/40"
                            }`}
                        >
                          <RadioGroupItem value={key} id={`${currentIndex}-${key}`} className="mt-0.5" />
                          <Label
                            className="w-full cursor-pointer text-xs sm:text-sm text-[#111827] dark:text-slate-200 leading-relaxed font-normal"
                            htmlFor={`${currentIndex}-${key}`}
                          >
                            <span className="font-bold text-[#4F46E5] mr-2">{key})</span>
                            {text}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              );
            })()}

            {/* McClelland Motivational Layout */}
            {kind === "mcclelland" && (
              <div className="space-y-5">
                <div className="text-base sm:text-lg font-bold text-[#111827] dark:text-white leading-relaxed">
                  <span className="text-[#4F46E5] mr-2">{currentIndex + 1}.</span>
                  {test.questions[currentIndex]}
                </div>
                <RadioGroup
                  value={answers[currentIndex] !== undefined ? String(answers[currentIndex]) : ""}
                  onValueChange={handleStandardAnswer}
                  className="space-y-3"
                >
                  {test.options.map((opt, index) => {
                    const optValue = String(5 - index);
                    const isSelected = String(answers[currentIndex]) === optValue;
                    return (
                      <div
                        key={index}
                        onClick={() => handleStandardAnswer(optValue)}
                        className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${isSelected
                          ? "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 border-[#4F46E5] shadow-xs"
                          : "bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 hover:border-[#C7D2FE]"
                          }`}
                      >
                        <RadioGroupItem value={optValue} id={`${currentIndex}-${index}`} />
                        <Label
                          className="w-full cursor-pointer text-xs sm:text-sm text-[#111827] dark:text-slate-200 font-normal"
                          htmlFor={`${currentIndex}-${index}`}
                        >
                          {opt}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            )}

            {/* Standard Likert Scale Question Layout */}
            {!isSpecial && (
              <div className="space-y-5">
                <div className="text-base sm:text-lg font-bold text-[#111827] dark:text-white leading-relaxed">
                  <span className="text-[#4F46E5] mr-2">{currentIndex + 1}.</span>
                  {test?.questions?.[currentIndex]}
                </div>
                <RadioGroup
                  value={answers[currentIndex] || ""}
                  onValueChange={handleStandardAnswer}
                  className="space-y-3"
                >
                  {test?.options?.map((opt, index) => {
                    const isSelected = answers[currentIndex] === opt;
                    return (
                      <div
                        key={index}
                        onClick={() => handleStandardAnswer(opt)}
                        className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${isSelected
                          ? "bg-[#EEF2FF] dark:bg-[#4F46E5]/10 border-[#4F46E5] shadow-xs"
                          : "bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 hover:border-[#C7D2FE]"
                          }`}
                      >
                        <RadioGroupItem value={opt} id={`${currentIndex}-${index}`} />
                        <Label
                          className="w-full cursor-pointer text-xs sm:text-sm text-[#111827] dark:text-slate-200 font-normal"
                          htmlFor={`${currentIndex}-${index}`}
                        >
                          {opt}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            )}

            {/* Navigation & Submission Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9] dark:border-white/5">
              <Button
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="rounded-full px-5 h-10 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Previous</span>
              </Button>

              {currentIndex < totalSteps - 1 ? (
                <Button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  disabled={
                    kind === "belbin"
                      ? !belbinSectionComplete
                      : answers[currentIndex] === undefined || answers[currentIndex] === ""
                  }
                  className="rounded-full px-6 h-10 bg-[#4F46E5] text-white hover:bg-[#3730A3] font-bold text-xs shadow-[0_4px_16px_rgba(79,70,229,0.3)]"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              ) : (
                <Button
                  className="rounded-full px-8 h-10 bg-[#4F46E5] text-white hover:bg-[#3730A3] font-bold text-xs shadow-[0_4px_16px_rgba(79,70,229,0.4)]"
                  onClick={calculateScore}
                  disabled={!allAnswered || submitting}
                >
                  {submitting ? "Processing..." : "Submit Assessment"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-left max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-white/10 shadow-2xl">
          <DialogHeader className="border-b border-[#F1F5F9] dark:border-white/5 pb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <BrainCircuit className="w-6 h-6 text-[#4F46E5]" />
              <DialogTitle className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white text-center">
                {test?.title} • Official Report
              </DialogTitle>
            </div>
            <p className="text-xs text-center text-[#667085] dark:text-[#98A2B3]">
              Center for Psychometric Assessment & Research • Geeta University
            </p>
          </DialogHeader>

          <ResultContent testKey={selectedTest} resultDetails={resultDetails} score={score} />

          <div className="text-center pt-6 border-t border-[#F1F5F9] dark:border-white/5 flex flex-wrap items-center justify-center gap-3">
            <Button
              className="rounded-full px-6 bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold text-xs"
              onClick={() => {
                setOpen(false);
                window.location.href = "/";
              }}
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              <span>Back to Home</span>
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 text-xs font-bold"
              onClick={() => {
                window.print();
              }}
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>Print Report</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
