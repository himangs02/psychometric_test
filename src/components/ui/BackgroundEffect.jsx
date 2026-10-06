"use client";

import React from "react";

export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Subtle modern dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#4F46E5 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Top Glow - Electric Indigo / Navy */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.07) 0%, rgba(6, 182, 212, 0.02) 60%, transparent 80%)",
        }}
      />

      {/* Ambient Side Accents - Cyan & Indigo */}
      <div
        className="absolute top-1/3 -right-24 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.035) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 -left-28 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
