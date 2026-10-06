"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, User, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/", sectionId: "home" },
  { name: "Tests", href: "/#tests", sectionId: "tests" },
  { name: "About", href: "/#highlights", sectionId: "highlights" },
  { name: "Resources", href: "/#how-it-works", sectionId: "how-it-works" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll listener for header background and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      if (pathname === "/") {
        const sections = [
          { id: "contact", el: document.getElementById("contact") },
          { id: "highlights", el: document.getElementById("highlights") },
          { id: "how-it-works", el: document.getElementById("how-it-works") },
          { id: "tests", el: document.getElementById("tests") },
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

  // Handle hash scrolling on initial load or route transition
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  const handleNavClick = useCallback(
    (e, link) => {
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
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          setActiveSection(link.sectionId);
          window.history.pushState(null, "", `#${link.sectionId}`);
        }
      } else {
        setMobileMenuOpen(false);
      }
    },
    [pathname]
  );

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const isLinkActive = (link) => {
    if (pathname === "/") {
      return activeSection === link.sectionId;
    }
    return link.href === pathname;
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 sm:px-8 lg:px-12",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-5 sm:px-7 py-2.5",
          scrolled
            ? "bg-white/90 dark:bg-[#12121E]/90 backdrop-blur-xl border border-[#801A45]/15 shadow-[0_10px_35px_rgba(128,26,69,0.06)]"
            : "bg-white/70 dark:bg-[#12121E]/70 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-xs"
        )}
      >
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, NAV_LINKS[0])}
          className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-[#801A45]/30 rounded-lg p-0.5"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
            <Image
              src="/gu.png"
              alt="Geeta University Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold text-[#181829] dark:text-white tracking-tight leading-none">
              Geeta University
            </span>
            <span className="text-[11px] text-[#717182] dark:text-[#A0A0B5] font-medium leading-tight mt-0.5">
              Psychometric Test Portal
            </span>
          </div>
        </Link>

        {/* Center Pill Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4EFF7]/80 dark:bg-white/5 rounded-full p-1 border border-[#801A45]/10 dark:border-white/5 shadow-2xs">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link);

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer",
                  active
                    ? "bg-[#EDE9FE] dark:bg-[#801A45] text-[#801A45] dark:text-white shadow-xs font-bold"
                    : "text-[#667085] dark:text-slate-300 hover:text-[#801A45] dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & User Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#667085] dark:text-slate-300 hover:text-[#801A45] hover:bg-[#F4EFF7] dark:hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* User Profile Avatar */}
          <Link
            href="/admin"
            className="w-9 h-9 rounded-full bg-[#181829] dark:bg-white/10 text-white flex items-center justify-center shadow-xs hover:bg-[#801A45] transition-colors focus:outline-none cursor-pointer"
            title="User / Admin Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#181829] dark:text-slate-200 hover:bg-[#F4EFF7] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#801A45]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-white/95 dark:bg-[#12121E]/95 backdrop-blur-2xl border border-[#801A45]/15 shadow-2xl p-4 flex flex-col gap-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer",
                  active
                    ? "bg-[#801A45] text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-[#F4EFF7] hover:text-[#801A45]"
                )}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-2 border-t border-[#E5E7EB] dark:border-white/10 mt-1">
            <Link
              href="/test"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-[#801A45] hover:bg-[#6A1439] transition-colors"
            >
              <span>Explore Tests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
