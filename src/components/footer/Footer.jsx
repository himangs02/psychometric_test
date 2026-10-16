"use client";

import React from "react";
import Link from "next/link";
import { Compass, Instagram, Youtube, Linkedin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0B1120] text-[#64748B] dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left">
          
          {/* Column 1: Brand Info & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black text-[#0F172A] dark:text-white tracking-tight leading-none uppercase">
                  GEETA
                </span>
                <span className="text-[10px] sm:text-[11px] font-black text-[#2563EB] dark:text-[#38BDF8] tracking-wider leading-none mt-0.5 uppercase">
                  CAREER COMPASS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-sm leading-relaxed">
              Discover Yourself. Explore Possibilities. Build Your Future.
            </p>

            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              Powered by Geeta University — providing scientific career assessment, academic stream advisory, and 1-on-1 expert guidance for high school and college students.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#475467] dark:text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#2563EB] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/career-guidance-test" className="hover:text-[#2563EB] transition-colors">
                  Career Assessment
                </Link>
              </li>
              <li>
                <Link href="/#tests" className="hover:text-[#2563EB] transition-colors">
                  All 15 Tests
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#2563EB] transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <a href="https://geetauniversity.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors inline-flex items-center gap-1">
                  <span>About Geeta University</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] dark:text-white">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-[#475467] dark:text-slate-300">
              <li>
                <Link href="/counsellor" className="hover:text-[#2563EB] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/counsellor" className="hover:text-[#2563EB] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#2563EB] transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of Use</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] dark:text-white">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-[#2563EB] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-[#2563EB] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-[#2563EB] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© 2026 Geeta Career Compass. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="font-bold text-[#0F172A] dark:text-white">Geeta University</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
