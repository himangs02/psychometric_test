"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, MessageCircle, X, ArrowRight } from "lucide-react";

export function FloatingCounsellorWidget() {
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show the floating launcher when already on /counsellor
  const isCounsellorPage = pathname === "/counsellor" || pathname === "/ai-counsellor";

  useEffect(() => {
    // Show gentle teaser tooltip after 3 seconds on the site
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isCounsellorPage) return null;

  return (
    <></>
  );
}
