"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  RotateCcw, 
  HelpCircle, 
  Bot, 
  User, 
  BrainCircuit, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InteractiveWhyModal } from "@/components/counsellor/InteractiveWhyModal";
import { RecommendationCard } from "@/components/counsellor/RecommendationCard";
import { SummaryCard } from "@/components/counsellor/SummaryCard";
import { CareerComparisonCard } from "@/components/counsellor/CareerComparisonCard";
import { OfflineCounsellorSidebar } from "@/components/counsellor/OfflineCounsellorSidebar";
import { createInitialProfile } from "@/lib/counsellor/studentProfileExtractor";
import axios from "axios";

const INITIAL_QUICK_CHIPS = [
  "🚀 Which of the 15 tests should I take?",
  "💼 Tell me about the RIASEC career test",
  "🧠 How does the Multiple Intelligence test work?",
  "⚖️ I'm confused between two careers",
  "📚 I'm choosing between Science and Commerce",
  "🔍 I don't know what my strengths are",
  "❓ Why should I take a psychometric test?",
  "📞 How can I book an offline counsellor?",
];

export default function CounsellorPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentProfile, setStudentProfile] = useState(createInitialProfile());
  const [sessionId, setSessionId] = useState("");
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [quickChips, setQuickChips] = useState(INITIAL_QUICK_CHIPS);
  const [latestAssessment, setLatestAssessment] = useState(null);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = (behavior = "smooth") => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    // Do not scroll on initial load so the page remains cleanly at the top
    if (isFirstRender.current) {
      isFirstRender.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    scrollToBottom();
  }, [messages, loading]);

  // Initialize session, check URL query params and localStorage
  useEffect(() => {
    const existingSession = localStorage.getItem("counsellor_session_id");
    const activeSessionId = existingSession || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSessionId(activeSessionId);
    if (!existingSession) {
      localStorage.setItem("counsellor_session_id", activeSessionId);
    }

    // Check if student recently completed a test
    let cachedAssessment = null;
    try {
      const stored = localStorage.getItem("latest_assessment_result");
      if (stored) {
        cachedAssessment = JSON.parse(stored);
        setLatestAssessment(cachedAssessment);
      }
    } catch (e) {
      console.warn("Could not parse cached assessment", e);
    }

    // Check query params
    const query = new URLSearchParams(window.location.search);
    const ref = query.get("ref");
    const testKey = query.get("testKey");

    // Retrieve past messages from localStorage if any, or start with empathetic greeting
    const cachedMessages = localStorage.getItem(`counsellor_messages_${activeSessionId}`);
    if (cachedMessages) {
      try {
        const parsed = JSON.parse(cachedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          const cachedProfile = localStorage.getItem(`counsellor_profile_${activeSessionId}`);
          if (cachedProfile) setStudentProfile(JSON.parse(cachedProfile));
          return;
        }
      } catch (e) {
        console.warn("Failed to load cached messages", e);
      }
    }

    // Default Initial Welcome
    let initialGreeting = 
      "Hello! I'm your **AI Career Counsellor** at Geeta University.\n\n" +
      "I'm specifically dedicated to assisting you with our portal, your academic stream choices (Science, Commerce, Humanities), and our **15 standardized psychometric & intelligence assessments** (including RIASEC, Multiple Intelligences, MBTI, Belbin, Mindset, and more).\n\n" +
      "Whether you want to explore career paths, find the right test for you, or interpret your assessment report, I'm here to help.\n\n" +
      "What brings you here today?";

    if (ref === "assessment" && (cachedAssessment || testKey)) {
      const testTitle = cachedAssessment?.testName || testKey || "Psychometric Test";
      initialGreeting = 
        `Welcome back! I see you just finished the **${testTitle}** 🎉.\n\n` +
        "I have your report ready. We can discuss why specific career paths were recommended, compare different course options, or discuss your next steps.\n\n" +
        "What questions do you have about your results?";
    }

    const firstMessage = {
      id: "msg_init",
      sender: "counsellor",
      text: initialGreeting,
      timestamp: new Date().toISOString(),
    };

    setMessages([firstMessage]);
  }, []);

  // Save messages and profile to localStorage
  const saveStateToLocal = (newMsgs, newProfile) => {
    if (sessionId) {
      localStorage.setItem(`counsellor_messages_${sessionId}`, JSON.stringify(newMsgs));
      if (newProfile) {
        localStorage.setItem(`counsellor_profile_${sessionId}`, JSON.stringify(newProfile));
      }
    }
  };

  // Reset conversation to fresh session
  const handleResetSession = () => {
    isFirstRender.current = true;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
    const newId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSessionId(newId);
    localStorage.setItem("counsellor_session_id", newId);
    const initialProf = createInitialProfile();
    setStudentProfile(initialProf);
    setQuickChips(INITIAL_QUICK_CHIPS);

    const greeting = {
      id: `msg_init_${Date.now()}`,
      sender: "counsellor",
      text: "Hello! I'm your **AI Career Counsellor**. Let's start fresh. What questions do you have about our platform, our 15 psychometric tests, or your career choices?",
      timestamp: new Date().toISOString(),
    };
    setMessages([greeting]);
    saveStateToLocal([greeting], initialProf);
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    setInputValue("");

    // Add student message
    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: "student",
      text: text,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveStateToLocal(updatedMessages, studentProfile);
    setLoading(true);

    try {
      const response = await axios.post("/api/counsellor", {
        message: text,
        conversationHistory: updatedMessages,
        studentProfile: studentProfile,
        latestAssessmentResult: latestAssessment,
        sessionId: sessionId,
      });

      const data = response.data;
      if (data && data.success) {
        const aiMsg = {
          id: `ai_${Date.now()}`,
          sender: "counsellor",
          text: data.reply,
          summaryCard: data.summaryCard || null,
          recommendationCard: data.recommendationCard || null,
          comparisonCard: data.comparisonCard || null,
          timestamp: new Date().toISOString(),
        };

        const finalMessages = [...updatedMessages, aiMsg];
        setMessages(finalMessages);
        if (data.updatedProfile) {
          setStudentProfile(data.updatedProfile);
        }
        if (data.suggestedChips && data.suggestedChips.length > 0) {
          setQuickChips(data.suggestedChips);
        }
        if (data.showInteractiveWhyModal) {
          setShowWhyModal(true);
        }
        saveStateToLocal(finalMessages, data.updatedProfile);
      }
    } catch (err) {
      console.error("Counsellor request failed", err);
      const fallbackMsg = {
        id: `ai_err_${Date.now()}`,
        sender: "counsellor",
        text: "I had a brief connection delay. I'm right here though—could you share what you were saying once more?",
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...updatedMessages, fallbackMsg];
      setMessages(finalMessages);
      saveStateToLocal(finalMessages, studentProfile);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9FC] via-[#FFFFFF] to-[#FAF9FC] dark:from-[#0C0C14] dark:via-[#10101C] dark:to-[#0C0C14] text-[#111827] dark:text-slate-100 pt-20 pb-8 px-3 sm:px-6 lg:px-8">
      {/* Main Two-Column Layout (Chat Stream Dialog Box + Offline Counsellor Sidebar) */}
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chat Stream Box (Fits screen height, fixed/sticky, does not scroll off screen) */}
        <div className="lg:col-span-8 lg:sticky lg:top-20 flex flex-col rounded-[28px] border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#12121E]/95 shadow-xl backdrop-blur-2xl overflow-hidden h-[calc(100vh-6rem)]">
          {/* Minimal Compact Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-slate-100 dark:border-white/5 bg-[#FAF9FC]/90 dark:bg-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#1D68EE] to-[#38BDF8] text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white">
                AI Counsellor
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWhyModal(true)}
                className="h-7 px-2.5 rounded-full text-[11px] font-semibold border-slate-200 dark:border-white/10 hover:border-[#1D68EE]/30 hover:bg-blue-50/50 text-[#1D68EE] dark:text-[#38BDF8] cursor-pointer"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                <span>Why Take a Test?</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetSession}
                title="Restart session"
                className="h-7 px-2.5 rounded-full text-[11px] font-semibold text-[#667085] dark:text-slate-300 hover:text-[#1D68EE] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                <span>Reset</span>
              </Button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
          {messages.map((msg, index) => {
            const isUser = msg.sender === "student";

            return (
              <div
                key={msg.id || index}
                className={`flex gap-3 sm:gap-4 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Counsellor Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-white/10 text-[#1D68EE] dark:text-[#38BDF8] border border-blue-200/60 dark:border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble & Embedded Cards */}
                <div className={`max-w-[85%] sm:max-w-[78%] space-y-3`}>
                  <div
                    className={`rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#1D68EE] text-white rounded-tr-xs shadow-md shadow-[#1D68EE]/20"
                        : "bg-[#F8F9FC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[#181829] dark:text-slate-200 rounded-tl-xs shadow-xs"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-normal">
                      {msg.text}
                    </div>
                  </div>

                  {/* Summary Card if present */}
                  {msg.summaryCard && (
                    <SummaryCard summaryData={msg.summaryCard} />
                  )}

                  {/* Comparison Card if present */}
                  {msg.comparisonCard && (
                    <CareerComparisonCard comparisonData={msg.comparisonCard} />
                  )}

                  {/* Personalized Recommendation Card if present */}
                  {msg.recommendationCard && (
                    <RecommendationCard 
                      cardData={msg.recommendationCard} 
                      onContinueTalking={() => {
                        inputRef.current?.focus();
                        handleSendMessage("I'd like to continue talking about my options before taking the test.");
                      }}
                      onWhyClick={() => setShowWhyModal(true)}
                    />
                  )}
                </div>

                {/* Student Avatar */}
                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-[#0F172A] dark:bg-white/10 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-3 sm:gap-4 justify-start">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-white/10 text-[#1D68EE] flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-2xl rounded-tl-xs bg-[#F8F9FC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-4 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1D68EE] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#1D68EE] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#1D68EE] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-[#667085] dark:text-[#98A2B3] ml-2 font-medium">
                  Counsellor is thinking...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Suggested Response Chips (Contextual & Student Friendly) */}
        {quickChips.length > 0 && (
          <div className="border-t border-slate-100 dark:border-white/5 bg-[#FAF9FC]/90 dark:bg-white/5 px-4 sm:px-6 py-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-2 w-max">
              <span className="text-[11px] font-bold text-[#667085] dark:text-[#98A2B3] uppercase tracking-wider shrink-0 flex items-center gap-1">
                Quick Suggestions:
              </span>
              {quickChips.map((chip, idx) => {
                const cleanChipText = chip.replace(/^[^a-zA-Z0-9]+/, "").trim();
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(cleanChipText)}
                    disabled={loading}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#181829] border border-slate-200 dark:border-white/10 text-[#181829] dark:text-slate-200 hover:border-[#1D68EE] hover:text-[#1D68EE] hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0 shadow-2xs"
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Text Input & Send */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#12121E] border-t border-slate-100 dark:border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your thoughts, confusion, or career question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              className="flex-1 h-12 rounded-2xl bg-[#F8F9FC] dark:bg-white/5 border-slate-200 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-[#1D68EE]/30 text-xs sm:text-sm px-4"
            />
            <Button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="h-12 px-6 rounded-2xl bg-[#1D68EE] hover:bg-[#1655C4] text-white font-bold text-xs shadow-md shadow-[#1D68EE]/20 cursor-pointer disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>

          {/* Micro Trust & Disclaimer Footnote */}
          <div className="flex items-center justify-between text-[11px] text-[#98A2B3] pt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              100% Confidential Counselling Session
            </span>
            <span className="hidden sm:inline italic">
              AI guidance for self-discovery • Psychometric assessments available on demand
            </span>
          </div>
        </div>
      </div>

        {/* Right: Book an Offline Counsellor Sidebar (Scrolls with page) */}
        <aside className="lg:col-span-4 w-full">
          <OfflineCounsellorSidebar />
        </aside>
      </div>

      {/* Interactive Modal for "Why Should I Take a Psychometric Test?" */}
      <InteractiveWhyModal
        open={showWhyModal}
        onOpenChange={setShowWhyModal}
        onStartAssessment={() => {
          handleSendMessage("I'm interested in understanding which test fits my situation.");
        }}
      />
    </div>
  );
}
