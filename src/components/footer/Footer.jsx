"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[#801A45]/15 bg-[#181829] text-[#98A2B3] relative overflow-hidden">
      {/* Subtle bottom ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#801A45]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/gu.png"
                  alt="Geeta University Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#F472B6]">
                  Geeta University
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                  Psychometric Test Portal
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#98A2B3] max-w-sm leading-relaxed">
              Standardized psychological instruments engineered to help students unlock cognitive potential, behavioral traits, and calibrated career pathways.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#F472B6] font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>Standardized Psychometric Instruments</span>
            </div>
          </div>

          {/* Quick Tests Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-white">
              Assessments
            </h4>
            <ul className="space-y-2 text-xs text-[#D1D5DB]">
              <li>
                <Link href="/test?test=riasec" className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#801A45]" />
                  <span>RIASEC Career Interest</span>
                </Link>
              </li>
              <li>
                <Link href="/test?test=hgmi" className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#801A45]" />
                  <span>Multiple Intelligence (Gardner)</span>
                </Link>
              </li>
              <li>
                <Link href="/test?test=mbti" className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#801A45]" />
                  <span>MBTI 16 Personalities</span>
                </Link>
              </li>
              <li>
                <Link href="/career-guidance-test" className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#F472B6]" />
                  <span>Career Guidance Test</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-white">
              Geeta University
            </h4>
            <ul className="space-y-2 text-xs text-[#D1D5DB]">
              <li>
                <a
                  href="https://geetauniversity.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#F472B6] transition-colors"
                >
                  <span>Official University Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#98A2B3]" />
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F472B6] transition-colors">
                  Faculty & Admin Portal
                </Link>
              </li>
              <li>
                <span className="text-[#98A2B3]/80 block text-[11px] leading-relaxed mt-1">
                  NH-71, Naultha, Panipat, Delhi-NCR, Haryana 132145
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#98A2B3]">
          <div>
            © {new Date().getFullYear()} Geeta University. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-[#98A2B3]">
            <span>Engineered for Student Success at</span>
            <span className="font-semibold text-white">
              Geeta University
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
