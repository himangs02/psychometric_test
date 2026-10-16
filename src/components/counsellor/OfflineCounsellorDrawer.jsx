"use client";

import React, { useState, useEffect } from "react";
import { OfflineCounsellorSidebar } from "./OfflineCounsellorSidebar";
import { UserCheck, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

export function OfflineCounsellorDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Listen for global custom event to trigger the booking drawer from any button/link
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-offline-counsellor", handleOpenEvent);
    return () => window.removeEventListener("open-offline-counsellor", handleOpenEvent);
  }, []);

  return (
    <>
      {/* 1. Floating Right-Edge Tab Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 py-3 px-2.5 rounded-l-2xl bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-[-4px_6px_20px_rgba(37,99,235,0.35)] hover:px-3.5 transition-all duration-200 cursor-pointer group text-xs font-bold tracking-tight select-none [writing-mode:vertical-rl]"
        title="Book an In-Person / Offline Counselling Session"
      >
        <span className="flex items-center gap-1.5 py-1">
          <Calendar className="w-3.5 h-3.5 -rotate-90" />
          <span>Book Offline Counsellor</span>
        </span>
      </button>

      {/* 2. Slide-out Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative z-10 w-full max-w-md h-full bg-white dark:bg-[#12121E] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col p-4 sm:p-6 overflow-hidden">
            <OfflineCounsellorSidebar isDrawer={true} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
