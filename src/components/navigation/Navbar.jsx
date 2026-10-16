"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Compass, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/", sectionId: "home" },
  { name: "All 15 Tests", href: "/#tests", sectionId: "tests" },
  { name: "Career Assessment", href: "/career-guidance-test" },
  { name: "Resources", href: "/#how-it-works", sectionId: "how-it-works" },
  { name: "AI Counsellor", href: "/counsellor" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      if (pathname === "/") {
        const sections = [
          { id: "tests", el: document.getElementById("tests") },
          { id: "how-it-works", el: document.getElementById("how-it-works") },
        ];

        const scrollPosition = window.scrollY + 200;
        let current = "home";
        for (const section of sections) {
          if (section.el) {
            const top = section.el.offsetTop;
            if (scrollPosition >= top) {
              current = section.id;
              break;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleNavClick = useCallback(
    (e, link) => {
      if (!link.sectionId) {
        setMobileMenuOpen(false);
        return;
      }

      if (pathname === "/") {
        e.preventDefault();
        setMobileMenuOpen(false);

        if (link.sectionId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("home");
          window.history.pushState(null, "", "/");
          return;
        }

        const element = document.getElementById(link.sectionId);
        if (element) {
          const headerOffset = 85;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          setActiveSection(link.sectionId);
          window.history.pushState(null, "", `/#${link.sectionId}`);
        }
      }
    },
    [pathname]
  );

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5",
          scrolled
            ? "bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)]"
            : "bg-white/85 dark:bg-[#0F172A]/85 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-xs"
        )}
      >
        {/* Brand Logo & Name (Geeta Career Compass with Blue Circular Compass) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group text-left focus:outline-none rounded-lg"
        >
          <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
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

        {/* Center Navigation Links (Matching Mockup) */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (pathname === "/" && activeSection === link.sectionId);

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer",
                  active
                    ? "text-[#2563EB] dark:text-[#38BDF8] font-bold"
                    : "text-[#475467] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white"
                )}
              >
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Login & Get Started Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>


          {/* Get Started Button (Navy Solid Pill) */}
          <Link
            href="/career-guidance-test"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#0F172A] dark:bg-[#2563EB] hover:bg-[#1E293B] dark:hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-xl text-[#0F172A] dark:text-white cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-xl space-y-2 text-left">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="block px-4 py-2.5 rounded-xl text-xs font-bold text-[#334155] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10">
            <Link
              href="/career-guidance-test"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center px-4 py-2.5 rounded-xl bg-[#EA580C] text-white text-xs font-bold"
            >
              Start Free Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
