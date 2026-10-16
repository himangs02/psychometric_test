"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  UserCheck, 
  Phone, 
  Mail, 
  Calendar, 
  Search, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Eye, 
  ExternalLink, 
  PhoneCall, 
  MessageCircle, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Save,
  Trash2,
  FileSpreadsheet,
  MapPin,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

const STATUS_CONFIG = {
  confirmed: {
    label: "New / Confirmed",
    bg: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
    icon: Clock,
  },
  contacted: {
    label: "Contacted",
    bg: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/40",
    icon: PhoneCall,
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    icon: XCircle,
  },
};

export function OfflineCounsellingDashboard({ onCountUpdate }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Detail Modal
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updatingNotes, setUpdatingNotes] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);

  // Fetch bookings from backend API
  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/counsellor/book");
      if (res.data?.success) {
        setBookings(res.data.bookings || []);
        if (onCountUpdate) onCountUpdate(res.data.count || 0);
      } else {
        setError(res.data?.error || "Failed to load offline bookings.");
      }
    } catch (err) {
      console.error("Error fetching offline bookings", err);
      setError("Unable to connect to the database. Showing cached records if available.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch("/api/counsellor/book", { id, status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Save notes
  const handleSaveNotes = async () => {
    if (!selectedBooking) return;
    setUpdatingNotes(true);
    try {
      await axios.patch("/api/counsellor/book", {
        id: selectedBooking.id,
        notes: adminNotes,
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === selectedBooking.id ? { ...b, notes: adminNotes } : b))
      );
      setSelectedBooking((prev) => ({ ...prev, notes: adminNotes }));
      setNoteSuccess(true);
      setTimeout(() => setNoteSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to save notes", err);
      alert("Failed to save notes.");
    } finally {
      setUpdatingNotes(false);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to remove this booking request?")) return;
    try {
      await axios.delete(`/api/counsellor/book?id=${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) {
        setDetailModalOpen(false);
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete booking.");
    }
  };

  // Filtered list
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const matchesSearch =
        !searchTerm.trim() ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.booking_ref?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedList = filteredBookings.slice(startIndex, startIndex + rowsPerPage);

  // Metrics
  const metrics = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "confirmed" || !b.status).length;
    const contacted = bookings.filter((b) => b.status === "contacted").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    return { total, pending, contacted, completed };
  }, [bookings]);

  // Export to CSV
  const handleExportCsv = () => {
    if (!filteredBookings.length) return;
    const headers = [
      "Booking Ref",
      "Full Name",
      "Phone",
      "Email Address",
      "Preferred Date",
      "Status",
      "Counsellor Notes",
      "Submitted At",
    ];
    const rows = filteredBookings.map((b) => [
      `"${b.booking_ref || ""}"`,
      `"${b.name || ""}"`,
      `"${b.phone || ""}"`,
      `"${b.email || ""}"`,
      `"${b.preferred_date || "Flexible"}"`,
      `"${b.status || "confirmed"}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(b.created_at).toLocaleString("en-IN")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Offline_Counselling_Students_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181829] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#667085] dark:text-[#98A2B3]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Requests</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#38BDF8] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#181829] dark:text-white">
              {metrics.total}
            </span>
            <span className="text-[11px] text-[#667085] dark:text-[#98A2B3]">registered</span>
          </div>
        </div>

        {/* Pending Action */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181829] border border-amber-200/80 dark:border-amber-900/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">New / Awaiting Call</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400">
              {metrics.pending}
            </span>
            <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80">needs response</span>
          </div>
        </div>

        {/* Contacted / In Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181829] border border-blue-200/80 dark:border-blue-900/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-blue-700 dark:text-blue-400">
            <span className="text-xs font-bold uppercase tracking-wider">Contacted</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-400">
              {metrics.contacted}
            </span>
            <span className="text-[11px] text-blue-600/80 dark:text-blue-400/80">session scheduled</span>
          </div>
        </div>

        {/* Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181829] border border-emerald-200/80 dark:border-emerald-900/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Sessions</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
              {metrics.completed}
            </span>
            <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">visited campus</span>
          </div>
        </div>
      </div>

      {/* 2. Main Table Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] bg-white dark:bg-[#181829] overflow-hidden">
        {/* Header & Filter Controls */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />
              <h2 className="text-xl font-bold text-[#181829] dark:text-white">
                Offline Counselling Registrations
              </h2>
            </div>
            <p className="text-xs text-[#667085] dark:text-[#A0A0B5]">
              Students requesting 1-on-1 in-person career guidance with phone number and email
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              disabled={loading}
              className="rounded-xl border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-semibold gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              disabled={!filteredBookings.length}
              className="rounded-xl border-slate-200 dark:border-white/10 text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 font-semibold text-xs gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export to CSV</span>
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 pb-4 bg-[#FAF9FC] dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
            <Input
              type="text"
              placeholder="Search by student name, phone, email, or ref..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-10 rounded-xl bg-white dark:bg-[#12121E] border-slate-200 dark:border-white/10 text-xs"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#667085] dark:text-[#98A2B3] font-medium hidden sm:inline">
              Status:
            </span>
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[170px] h-10 rounded-xl bg-white dark:bg-[#12121E] border-slate-200 dark:border-white/10 text-xs">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses ({bookings.length})</SelectItem>
                <SelectItem value="confirmed">New / Confirmed ({metrics.pending})</SelectItem>
                <SelectItem value="contacted">Contacted ({metrics.contacted})</SelectItem>
                <SelectItem value="completed">Completed ({metrics.completed})</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FAF9FC] dark:bg-white/5">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Sr.</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Ref #</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Student Name</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Phone Number</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Mail Address</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Preferred Visit Date</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Status</TableHead>
                  <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-xs text-[#667085]">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#2563EB]" />
                      Loading offline counsellor requests...
                    </TableCell>
                  </TableRow>
                ) : paginatedList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-xs text-[#667085]">
                      <AlertCircle className="w-6 h-6 mx-auto mb-2 text-[#98A2B3]" />
                      No offline counselling bookings found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedList.map((booking, index) => {
                    const statusObj = STATUS_CONFIG[booking.status] || STATUS_CONFIG.confirmed;
                    const StatusIcon = statusObj.icon;

                    return (
                      <TableRow
                        key={booking.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                      >
                        {/* Serial */}
                        <TableCell className="font-mono text-xs text-[#98A2B3]">
                          {startIndex + index + 1}
                        </TableCell>

                        {/* Booking Ref */}
                        <TableCell>
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/10 text-[#2563EB] dark:text-[#38BDF8]">
                            {booking.booking_ref}
                          </span>
                        </TableCell>

                        {/* Student Name */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#38BDF8] flex items-center justify-center font-bold text-xs shrink-0">
                              {booking.name ? booking.name[0].toUpperCase() : "S"}
                            </div>
                            <span className="font-bold text-xs text-[#181829] dark:text-white">
                              {booking.name}
                            </span>
                          </div>
                        </TableCell>

                        {/* Phone Number with click-to-call */}
                        <TableCell>
                          <a
                            href={`tel:${booking.phone}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181829] dark:text-slate-200 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                            title="Click to call student"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>{booking.phone}</span>
                          </a>
                        </TableCell>

                        {/* Mail Address with click-to-mail */}
                        <TableCell>
                          <a
                            href={`mailto:${booking.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[#475467] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                            title="Click to email student"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-[180px]">{booking.email}</span>
                          </a>
                        </TableCell>

                        {/* Preferred Visit Date */}
                        <TableCell className="text-xs text-[#475467] dark:text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#2563EB]/70" />
                            <span>{booking.preferred_date || "Flexible / Next Available"}</span>
                          </div>
                        </TableCell>

                        {/* Status Dropdown */}
                        <TableCell>
                          <Select
                            value={booking.status || "confirmed"}
                            onValueChange={(val) => handleStatusChange(booking.id, val)}
                          >
                            <SelectTrigger className={`h-7 px-2.5 rounded-lg border text-[11px] font-bold ${statusObj.bg}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">New / Confirmed</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setAdminNotes(booking.notes || "");
                              setDetailModalOpen(true);
                            }}
                            className="h-8 rounded-xl border-slate-200 dark:border-white/10 hover:border-[#2563EB] hover:text-[#2563EB] text-xs gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">Rows per page</p>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[80px] h-8 rounded-xl text-xs">
                  <SelectValue placeholder={rowsPerPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xs font-semibold text-[#667085] dark:text-slate-300">
                Page {currentPage} of {totalPages} ({filteredBookings.length} total)
              </p>
              <div className="flex items-center space-x-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-slate-200 dark:border-white/10 h-8 w-8 p-0 cursor-pointer"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-slate-200 dark:border-white/10 h-8 w-8 p-0 cursor-pointer"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Student Booking Modal */}
      {selectedBooking && (
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#181829] border border-slate-200 dark:border-white/10 text-left">
            <DialogHeader className="pb-4 border-b border-slate-100 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] dark:bg-blue-950/40 dark:text-[#38BDF8]">
                  {selectedBooking.booking_ref}
                </span>
                <span className="text-[11px] text-[#98A2B3]">
                  Registered on: {new Date(selectedBooking.created_at).toLocaleString("en-IN")}
                </span>
              </div>
              <DialogTitle className="text-2xl font-black text-[#181829] dark:text-white">
                {selectedBooking.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#667085] dark:text-[#A0A0B5]">
                Candidate requesting offline in-person career counselling session.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Quick Contact Bar */}
              <div className="p-4 rounded-2xl bg-[#FAF9FC] dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#98A2B3]">Direct Actions</span>
                  <p className="text-xs font-semibold text-[#181829] dark:text-white">Reach out to student now</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedBooking.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call ({selectedBooking.phone})</span>
                  </a>

                  <a
                    href={`https://wa.me/91${selectedBooking.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedBooking.name)},%20this%20is%20from%20the%20Career%20Guidance%20Cell%20at%20Geeta%20University%20regarding%20your%20offline%20counselling%20request.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedBooking.email}?subject=Your%20In-Person%20Career%20Counselling%20Session%20-%20Geeta%20University`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                    Full Name
                  </Label>
                  <p className="font-semibold text-sm text-[#181829] dark:text-white">
                    {selectedBooking.name}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                    Phone Number
                  </Label>
                  <p className="font-semibold text-sm text-[#181829] dark:text-white">
                    {selectedBooking.phone}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                    Email Address
                  </Label>
                  <p className="font-semibold text-sm text-[#181829] dark:text-white break-all">
                    {selectedBooking.email}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                    Preferred Date
                  </Label>
                  <p className="font-semibold text-sm text-[#181829] dark:text-white">
                    {selectedBooking.preferred_date || "Flexible / Next Available Slot"}
                  </p>
                </div>
              </div>

              {/* Location Badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#181829] dark:text-white">Session Location: </span>
                  <span className="text-[#667085] dark:text-[#A0A0B5]">
                    Career Advisory & Admissions Block, Geeta University Campus, Panipat-Delhi NCR
                  </span>
                </div>
              </div>

              {/* Status Selector in Modal */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Update Session Status
                </Label>
                <div className="flex flex-wrap items-center gap-2">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                    const isSelected = selectedBooking.status === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleStatusChange(selectedBooking.id, key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? cfg.bg + " ring-2 ring-blue-500/30 font-black"
                            : "bg-white dark:bg-[#12121E] border-slate-200 dark:border-white/10 text-[#667085] hover:border-slate-300"
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Counsellor Internal Notes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-[#344054] dark:text-slate-200">
                    Counsellor Notes & Action Log
                  </Label>
                  {noteSuccess && (
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Notes saved!
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record outcome of call, scheduled date/time, candidate preferences, or follow-up notes..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-[#FAF9FC] dark:bg-white/5 text-xs text-[#181829] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    disabled={updatingNotes}
                    className="h-8 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{updatingNotes ? "Saving..." : "Save Notes"}</span>
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between sm:justify-between w-full">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteBooking(selectedBooking.id)}
                className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Booking</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setDetailModalOpen(false)}
                className="rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
