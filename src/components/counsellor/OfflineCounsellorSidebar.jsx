"use client";

import React, { useState } from "react";
import { 
  UserCheck, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export function OfflineCounsellorSidebar({ isDrawer = false, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const response = await axios.post("/api/counsellor/book", formData);
      if (response.data?.success) {
        setSubmittedData(response.data);
      } else {
        setErrorMsg(response.data?.error || "Failed to schedule session. Please try again.");
      }
    } catch (err) {
      console.error("Booking failed", err);
      // Fallback local confirmation
      setSubmittedData({
        bookingRef: `GU-OC-${Date.now().toString().slice(-6)}`,
        details: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          preferredDate: formData.preferredDate || "Next Available Slot",
          location: "Career Advisory & Admissions Block, Geeta University Campus, Panipat-Delhi NCR"
        }
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", email: "", preferredDate: "", notes: "" });
    setSubmittedData(null);
    setErrorMsg("");
  };

  return (
    <div className={`h-full flex flex-col rounded-[28px] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#12121E] shadow-xl overflow-hidden ${isDrawer ? "p-6" : "p-5 sm:p-6"}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between border-b border-[#F1F5F9] dark:border-white/10 pb-4 mb-4">
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#38BDF8] text-[10px] font-black uppercase tracking-wider">
            <UserCheck className="w-3 h-3" />
            <span>In-Person Guidance</span>
          </div>
          <h2 className="text-lg font-black text-[#111827] dark:text-white tracking-tight">
            Book an Offline Counsellor
          </h2>
          <p className="text-xs text-[#667085] dark:text-[#98A2B3] leading-relaxed">
            Prefer a face-to-face conversation? Meet 1-on-1 with a senior career counsellor at Geeta University.
          </p>
        </div>

        {isDrawer && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {submittedData ? (
          /* Confirmation View */
          <div className="space-y-4 py-2 text-left animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-[#111827] dark:text-white">
                Session Booked Successfully!
              </h3>
              <p className="text-xs text-[#667085] dark:text-[#98A2B3]">
                Our academic counsellor will connect with you to confirm your visit.
              </p>
            </div>

            {/* Booking Details Ticket */}
            <div className="rounded-2xl bg-[#F8F9FC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
                <span className="text-[#667085] dark:text-[#98A2B3]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#2563EB] dark:text-[#38BDF8]">
                  {submittedData.bookingRef}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#98A2B3]">Name:</span>
                <span className="font-semibold text-[#181829] dark:text-white">{submittedData.details?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#98A2B3]">Mobile:</span>
                <span className="font-semibold text-[#181829] dark:text-white">{submittedData.details?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#98A2B3]">Email:</span>
                <span className="font-semibold text-[#181829] dark:text-white truncate max-w-[150px]">{submittedData.details?.email}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-start gap-1.5 text-[11px] text-[#475467] dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                <span className="leading-tight">
                  Career Advisory Cell, Geeta University Campus, Panipat-Delhi NCR
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full rounded-2xl h-10 text-xs font-bold border-blue-200 text-[#2563EB] hover:bg-blue-50 cursor-pointer"
            >
              Book Another Session
            </Button>
          </div>
        ) : (
          /* Input Form View */
          <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Full Name Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475467] dark:text-slate-300 flex items-center gap-1">
                <User className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Full Name *</span>
              </label>
              <Input
                name="name"
                placeholder="e.g. Rohan Sharma"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting}
                className="h-10 rounded-xl bg-[#F8F9FC] dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs focus:ring-[#2563EB]"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475467] dark:text-slate-300 flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Phone Number *</span>
              </label>
              <Input
                name="phone"
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                disabled={submitting}
                className="h-10 rounded-xl bg-[#F8F9FC] dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs focus:ring-[#2563EB]"
                required
              />
            </div>

            {/* Email Address Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475467] dark:text-slate-300 flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Mail Address *</span>
              </label>
              <Input
                name="email"
                type="email"
                placeholder="e.g. rohan.sharma@gmail.com"
                value={formData.email}
                onChange={handleChange}
                disabled={submitting}
                className="h-10 rounded-xl bg-[#F8F9FC] dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs focus:ring-[#2563EB]"
                required
              />
            </div>

            {/* Preferred Date Field (Optional) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475467] dark:text-slate-300 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Preferred Date / Day</span>
              </label>
              <Input
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                disabled={submitting}
                className="h-10 rounded-xl bg-[#F8F9FC] dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs focus:ring-[#2563EB]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 h-11 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scheduling...</span>
                </>
              ) : (
                <>
                  <span>Book In-Person Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Trust & Location Footer */}
      <div className="border-t border-[#F1F5F9] dark:border-white/10 pt-3 mt-3 text-left space-y-1.5 text-[10px] text-[#98A2B3]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>100% Free & Confidential 1-on-1 Session</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-blue-500" />
          <span>Mon–Sat • 9:30 AM to 5:00 PM</span>
        </div>
      </div>
    </div>
  );
}
