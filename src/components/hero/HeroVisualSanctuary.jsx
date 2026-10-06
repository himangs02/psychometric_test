"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, BarChart2, Star, User } from "lucide-react";

export function HeroVisualSanctuary() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] max-w-[620px] rounded-[32px] overflow-hidden select-none group transition-all duration-300"
      style={{ perspective: 1200 }}
    >
      {/* 1. Background 3D Sanctuary Render */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-sanctuary.jpg"
          alt="Psychometric Sanctuary 3D Visual"
          fill
          priority
          className="object-cover object-center scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft edge blend gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Floating Banner "A Better You" */}
      <div
        className="absolute top-10 right-14 sm:top-12 sm:right-20 z-20 transition-transform duration-300 pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)`,
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-base sm:text-lg font-bold text-[#181829] tracking-tight text-center leading-tight drop-shadow-xs">
            A Better<br />You
          </span>
          {/* Hand-drawn pink underline doodle */}
          <svg width="42" height="8" viewBox="0 0 42 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
            <path d="M1 5.5C12 2 30 1.5 41 6.5" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 3. Golden Connecting Curved Dotted Paths */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arc from main card to Bar Chart */}
        <path
          d="M 370 200 C 400 170, 410 145, 425 125"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeOpacity="0.8"
        />
        {/* Arc from main card to Star */}
        <path
          d="M 390 240 C 415 250, 420 280, 415 305"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeOpacity="0.8"
        />
        {/* Arc from main card to Avatar */}
        <path
          d="M 400 220 C 460 215, 480 220, 500 235"
          stroke="#A855F7"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeOpacity="0.8"
        />
      </svg>

      {/* 4. Floating Mini Badge 1: Bar Chart */}
      <div
        className="absolute top-[24%] right-[28%] z-20 w-10 h-10 rounded-full bg-[#FFFBEB]/90 backdrop-blur-md border border-[#FDE68A] shadow-[0_8px_20px_rgba(245,158,11,0.2)] flex items-center justify-center text-[#D97706] transition-transform duration-300 animate-bounce"
        style={{
          animationDuration: "4s",
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`,
        }}
      >
        <BarChart2 className="w-5 h-5" />
      </div>

      {/* 5. Floating Mini Badge 2: Star */}
      <div
        className="absolute bottom-[28%] right-[30%] z-20 w-10 h-10 rounded-full bg-[#FFFBEB]/90 backdrop-blur-md border border-[#FDE68A] shadow-[0_8px_20px_rgba(245,158,11,0.2)] flex items-center justify-center text-[#D97706] transition-transform duration-300 animate-pulse"
        style={{
          transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`,
        }}
      >
        <Star className="w-5 h-5 fill-current" />
      </div>

      {/* 6. Floating Mini Badge 3: User Avatar */}
      <div
        className="absolute top-[48%] right-[14%] z-20 w-10 h-10 rounded-full bg-[#F5F3FF]/90 backdrop-blur-md border border-[#DDD6FE] shadow-[0_8px_20px_rgba(139,92,246,0.25)] flex items-center justify-center text-[#7C3AED] transition-transform duration-300 animate-bounce"
        style={{
          animationDuration: "5s",
          transform: `translate3d(${mousePos.x * -22}px, ${mousePos.y * -22}px, 0)`,
        }}
      >
        <User className="w-5 h-5" />
      </div>

      {/* 7. Central Floating Glassmorphism "Know Yourself" Card */}
      <div
        className="absolute top-[18%] left-[16%] z-30 w-[240px] sm:w-[260px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 40px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 18}deg) rotate(-4deg)`,
        }}
      >
        {/* Floating Brain Icon on top right corner of card */}
        <div className="absolute -top-4 -right-4 z-40 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_10px_25px_rgba(128,26,69,0.15)] flex items-center justify-center text-[#801A45]">
          <Brain className="w-6 h-6" />
        </div>

        {/* Card Body with Frosted Glass */}
        <Link
          href="/test"
          className="block rounded-[26px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12)] p-6 transition-all duration-300 hover:scale-[1.02] group/card cursor-pointer"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-black text-[#181829] tracking-tight">
              Know<br />Yourself
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed pr-2">
              Discover your strengths and unique personality.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-start">
            <div className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center text-[#181829] group-hover/card:bg-[#801A45] group-hover/card:text-white group-hover/card:border-[#801A45] transition-colors duration-200">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HeroVisualSanctuary;
