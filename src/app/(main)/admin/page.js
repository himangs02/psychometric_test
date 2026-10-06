"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  Eye,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Download,
  Search,
  Users,
  ShieldCheck,
  Lock,
  Mail,
  Calendar,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { TESTS } from "@/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

const exportToCsv = (data, filename = 'Test Submissions.csv') => {
  if (typeof window === "undefined" || !data || !data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [];
  csvRows.push(headers.join(','));
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + (row[header] ?? '')).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ADMIN_EMAIL = "admin@geeta.edu.in";
const ADMIN_PASSWORD = "admin123";

// --- DATA: Intelligence Grid Details (Required for Admin View Mapping) ---
const HGMI_DETAILS = {
  "Linguistic": {
    characteristics: "You are good at words, language & also at:\n• Retention\n• Interpretation and explanation of ideas and information via language\n• Understanding relationship between communication and meaning",
    courses: [
      "BA LLB",
      "BBA LLB",
      "BA (H) Psychology, Political Science, English",
      "BA in Journalism & Mass Communication"
    ]
  },
  "Logical-Mathematical": {
    characteristics: "You are good at logical thinking & also at:\n• Detecting patterns\n• Scientific reasoning and deduction\n• Analyzing problems\n• Performing mathematical calculations\n• Understanding relationship between cause and effect",
    courses: [
      "B.Com",
      "Banking & Finance",
      "Law",
      "B.Pharmacy / D-Pharmacy",
      "BCA",
      "B.Sc (Hons.) in Mathematics, Microbiology, Forensic Science",
      "BA (Hons.) Economics",
      "B.Tech (CSE, ME, Civil)"
    ]
  },
  "Musical": {
    characteristics: "You are good at Musical Ability & also at:\n• Awareness, appreciation and use of sound\n• Recognition of tonal and rhythmic patterns\n• Understanding relationship between sound and feeling",
    courses: [
      "Event Management",
      "Mass Communication",
      "BBA, B.Com",
      "B.Tech",
      "BA Performing Arts",
      "Hotel Management"
    ]
  },
  "Bodily-Kinesthetic": {
    characteristics: "You are good at body movement control & also at:\n• Manual dexterity\n• Physical agility and balance\n• Eye and body coordination",
    courses: [
      "B.Sc. Design",
      "B.Design",
      "Diploma (ME, CE)",
      "B.Tech (ME, CE)"
    ]
  },
  "Intrapersonal": {
    characteristics: "You are good at self-awareness & also at:\n• Personal cognizance and objectivity\n• Understanding oneself and one's relationship to others\n• Understanding one's own need for and reaction to change",
    courses: [
      "BBA - Entrepreneurship & Family Business",
      "BA (Hons.) Psychology",
      "B.Sc Forensic Science",
      "BA (Hons.) in Design / Fine Arts / Performing Arts"
    ]
  },
  "Interpersonal": {
    characteristics: "You are good at perception of other people's feelings & also at:\n• Relating to others\n• Interpretation of behavior and communications\n• Understanding relationships between people and their situations",
    courses: [
      "BBA LLB",
      "BBA (Hons)",
      "BA (Hons.) Political Science, Psychology, Hotel Management",
      "B.Sc. Airlines, Travel & Tourism Management",
      "BBA MBA Integrated",
      "BA in Journalism & Mass Communication"
    ]
  },
  "Spatial": {
    characteristics: "You are good at visual and spatial perception & also at:\n• Interpretation and creation of visual images\n• Pictorial imagination and expression\n• Understanding relationship between images, meanings, and space",
    courses: [
      "B.Tech (Civil, ME, CSE, ECE)",
      "BCA",
      "B.Design, B.Sc Interior Design",
      "BA Film & Television Studies",
      "BA Fine Arts",
      "Dental Science"
    ]
  },
  "Naturalist": {
    characteristics: "You are good at doing things related to nature & also at:\n• Nurturing and relating information to one's natural surroundings\n• Sensitivity to nature and place within it\n• Caring for, taming and interacting with animals\n• Discern changes in weather or surroundings\n• Recognizing and classifying species",
    courses: [
      "B.Sc. Nutrition & Dietetics",
      "B.Sc. Agricultural Science",
      "B.Sc. Microbiology",
      "B.Sc Forensic Science",
      "B.Sc Chemistry"
    ]
  }
};

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [testSubmissions, setTestSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [testName, setTestName] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataToExport, setDataToExport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchAllTestSubmissions = async () => {
    try {
      const response = await axios.get("/api/submissions");
      if (testName === "all") {
        setFilteredSubmissions(response.data);
      } else {
        setFilteredSubmissions(
          response.data.filter((submission) => submission.test_name === testName)
        );
      }
      setTestSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching test submissions:", error);
      setError("Failed to fetch test submissions. Please try again later.");
    }
  };

  useEffect(() => {
    setDataToExport(
      filteredSubmissions.map((submission) => ({
        "Name": submission.name,
        "Email": submission.email,
        "Phone": submission.phone,
        "Test Name": submission.test_name,
        "Score": submission.score,
        "Result": submission.result,
        "Course": submission.course,
        "Institution": submission.institution,
        "Marital Status": submission.married ? "Married" : "Unmarried",
        "Education": submission.education,
        "Religion": submission.religion,
        "Rural or Urban": submission.rural_or_urban,
        "Timestamp": new Date(new Date(submission.timestamp).getTime() - 8 * 60 * 60 * 1000).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})
      }))
    );
  }, [filteredSubmissions]);

  useEffect(() => {
    const session = sessionStorage.getItem("adminLoggedIn");
    if (session === "true") {
      setLoggedIn(true);
      fetchAllTestSubmissions();
    }
  }, []);

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminLoggedIn", "true");
      setLoggedIn(true);
      setError("");
      fetchAllTestSubmissions();
    } else {
      setError("Invalid email or password.");
    }
  };

  useEffect(() => {
    if (testName === "all") {
      setFilteredSubmissions(testSubmissions);
    } else {
      setFilteredSubmissions(
        testSubmissions.filter((submission) => submission.test_name === testName)
      );
    }
  }, [testName, testSubmissions]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = testSubmissions.filter((submission) => {
        const submissionDate = new Date(new Date(submission.timestamp).getTime() - 8 * 60 * 60 * 1000);
        return submissionDate >= startDate && submissionDate <= endDate;
      });
      setFilteredSubmissions(filtered);
    } else if (testName === "all") {
      setFilteredSubmissions(testSubmissions);
    } else {
      setFilteredSubmissions(
        testSubmissions.filter((submission) => submission.test_name === testName)
      );
    }
    setCurrentPage(1);
  }, [startDate, endDate, testSubmissions, testName]);

  const totalPages = Math.ceil(filteredSubmissions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + rowsPerPage);

  if (!loggedIn) {
    return (
      <div className="w-full min-h-[85vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4">
        <div className="w-full max-w-md">
          <Card className="rounded-3xl border border-[#801A45]/15 dark:border-white/10 shadow-[0_20px_50px_rgba(128,26,69,0.08)] bg-white/90 dark:bg-[#181829]/90 backdrop-blur-xl overflow-hidden">
            <CardHeader className="text-center pt-8 pb-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#801A45]/10 dark:bg-white/5 flex items-center justify-center border border-[#801A45]/20">
                <Image
                  src="/gu.png"
                  alt="Geeta University Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] text-[10px] font-bold uppercase tracking-wider border border-[#801A45]/15 mb-2">
                  <ShieldCheck className="w-3 h-3 text-[#801A45]" />
                  <span>Institutional Portal</span>
                </div>
                <h2 className="text-2xl font-black text-[#181829] dark:text-white tracking-tight">
                  Faculty & Admin Login
                </h2>
                <p className="text-xs text-[#667085] dark:text-[#A0A0B5] mt-1">
                  Access student psychometric records and test diagnostics
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 pt-2 space-y-4">
              {error && (
                <Alert variant="destructive" className="rounded-2xl border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30">
                  <AlertTitle className="text-xs font-bold">Authentication Failed</AlertTitle>
                  <AlertDescription className="text-xs">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-[#344054] dark:text-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#801A45]" />
                  <span>Institutional Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@geeta.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-slate-200 dark:border-white/10 focus-visible:ring-[#801A45]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-[#344054] dark:text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#801A45]" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  className="rounded-xl border-slate-200 dark:border-white/10 focus-visible:ring-[#801A45]"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full mt-6 py-5 rounded-xl font-bold text-sm text-white bg-[#801A45] hover:bg-[#6A1439] shadow-lg shadow-[#801A45]/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
              >
                Sign In to Dashboard
              </Button>

              <div className="pt-4 text-center">
                <p className="text-[11px] text-[#98A2B3]">
                  Authorized personnel only. Sessions are encrypted and logged.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pt-28 sm:pt-32 px-4 sm:px-8 lg:px-12 pb-20 space-y-8">
      {/* Admin Header with Metrics & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#801A45]/10 dark:border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] text-[10px] font-bold uppercase tracking-wider border border-[#801A45]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#801A45]" />
            <span>Institutional Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#181829] dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A0A0B5]">
            Real-time psychometric assessment submissions, scoring analytics, and student records.
          </p>
        </div>

        {/* Stats Chips & Logout */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF5F8] dark:bg-white/5 border border-[#801A45]/15 text-xs">
            <Users className="w-4 h-4 text-[#801A45] dark:text-[#F472B6]" />
            <span className="text-[#667085] dark:text-slate-300">Total:</span>
            <span className="font-bold text-[#181829] dark:text-white">{testSubmissions.length}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
            <Layers className="w-4 h-4 text-slate-500 dark:text-slate-300" />
            <span className="text-[#667085] dark:text-slate-300">Filtered:</span>
            <span className="font-bold text-[#181829] dark:text-white">{filteredSubmissions.length}</span>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-xl border-slate-200 dark:border-white/15 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 text-xs font-semibold gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Submissions Card */}
      <Card className="rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] bg-white dark:bg-[#181829] overflow-hidden">
        {/* Card Header & Filter Bar */}
        <CardHeader className="p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#801A45] dark:text-[#F472B6]" />
              <h2 className="text-xl font-bold text-[#181829] dark:text-white">
                Student Submissions
              </h2>
            </div>
            <p className="text-xs text-[#667085] dark:text-[#A0A0B5]">
              Browse and inspect detailed candidate responses and course recommendations
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => exportToCsv(dataToExport, 'Test Submissions.csv')}
            className="rounded-xl border-[#801A45]/20 text-[#801A45] dark:text-[#F472B6] hover:bg-[#FAF5F8] dark:hover:bg-white/5 font-semibold text-xs gap-2 shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </Button>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-end gap-3 p-4 rounded-2xl bg-[#FAF9FC] dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
            <div className="w-full sm:w-auto min-w-[200px]">
              <Select value={testName} onValueChange={setTestName}>
                <SelectTrigger className="rounded-xl bg-white dark:bg-[#12121E] border-slate-200 dark:border-white/10 text-xs">
                  <SelectValue placeholder="Filter by Test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tests</SelectItem>
                  {Object.entries(TESTS).map(([key, test]) => (
                    <SelectItem key={key} value={test.title}>
                      {test.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DatePicker date={startDate} setDate={setStartDate} text="Start Date" />
            <DatePicker date={endDate} setDate={setEndDate} text="End Date" />

            <Button
              onClick={fetchAllTestSubmissions}
              className="rounded-xl bg-[#801A45] hover:bg-[#6A1439] text-white text-xs font-semibold gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </Button>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#FAF9FC] dark:bg-white/5">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Sr.</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Name</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Test</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Course</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Submission Time</TableHead>
                  <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedSubmissions.length !== 0 ? (
                  paginatedSubmissions.map((submission, index) => (
                    <TableRow
                      key={submission.id}
                      className="hover:bg-[#FAF5F8]/50 dark:hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-[#98A2B3]">{startIndex + index + 1}</TableCell>
                      <TableCell className="font-semibold text-xs text-[#181829] dark:text-white">{submission.name}</TableCell>
                      <TableCell className="text-xs text-[#667085] dark:text-slate-300">{submission.test_name}</TableCell>
                      <TableCell className="text-xs text-[#667085] dark:text-slate-300">{submission.course}</TableCell>
                      <TableCell className="text-xs text-[#667085] dark:text-slate-400">
                        {new Date(
                          new Date(submission.timestamp).getTime() - 8 * 60 * 60 * 1000
                        ).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* Detail View Modal */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-slate-200 dark:border-white/10 hover:border-[#801A45] hover:text-[#801A45] dark:hover:text-[#F472B6] text-xs gap-1.5 cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Inspect</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#181829] border border-slate-200 dark:border-white/10">
                            <DialogHeader className="pb-4 border-b border-slate-100 dark:border-white/10">
                              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF5F8] dark:bg-white/5 text-[#801A45] dark:text-[#F472B6] text-[10px] font-bold uppercase tracking-wider border border-[#801A45]/15 w-fit mb-2">
                                <span>Candidate Report</span>
                              </div>
                              <DialogTitle className="text-2xl font-black text-[#181829] dark:text-white tracking-tight">
                                {submission.name}
                              </DialogTitle>
                              <p className="text-xs text-[#667085] dark:text-[#A0A0B5]">
                                Submitted for {submission.test_name} on {new Date(submission.timestamp).toLocaleString()}
                              </p>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm">
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">{submission.email}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Phone</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">{submission.phone}</p>
                              </div>

                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Gender</Label>
                                <p className="font-semibold mt-0.5 capitalize text-[#181829] dark:text-white">{submission.gender}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Date of Birth</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">
                                  {new Date(submission.dob).toLocaleDateString()}
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Marital Status</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">
                                  {submission.married ? "Married" : "Unmarried"}
                                </p>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Education</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">{submission.education}</p>
                              </div>

                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Occupation</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">{submission.occupation}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Institution</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">{submission.institution}</p>
                              </div>

                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Course</Label>
                                <p className="font-semibold mt-0.5 text-[#181829] dark:text-white">{submission.course}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Demographics</Label>
                                <p className="font-semibold mt-0.5 capitalize text-[#181829] dark:text-white">
                                  {submission.religion} • {submission.rural_or_urban}
                                </p>
                              </div>

                              {/* Score Highlight Box */}
                              <div className="col-span-full my-4 p-6 rounded-2xl bg-[#FAF5F8] dark:bg-white/5 border border-[#801A45]/15 text-center space-y-1">
                                <p className="text-4xl font-black text-[#801A45] dark:text-[#F472B6]">
                                  {submission.score}
                                </p>
                                <Label className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-300">
                                  Total Calculated Score
                                </Label>
                              </div>

                              {/* Detailed Analysis Output */}
                              <div className="col-span-full space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                  Detailed Analysis & Profiling
                                </Label>
                                {(() => {
                                  const parseResult = (result) => {
                                    try {
                                      return JSON.parse(result);
                                    } catch (e) {
                                      return result;
                                    }
                                  };

                                  const parsedResult = parseResult(submission.result);

                                  if (typeof parsedResult === 'string') {
                                    return (
                                      <p className="font-semibold text-primary p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                                        {parsedResult}
                                      </p>
                                    );
                                  } else if (parsedResult && typeof parsedResult === 'object') {
                                    return (
                                      <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200/60 dark:border-white/5 space-y-4">
                                        <h4 className="font-bold text-base text-[#801A45] dark:text-[#F472B6]">
                                          {parsedResult.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                          {parsedResult.description}
                                        </p>
                                        
                                        {/* --- HGMI INTELLIGENCE BREAKDOWN & RECOMMENDATIONS --- */}
                                        {parsedResult.breakdown && Array.isArray(parsedResult.breakdown) && (
                                          <div className="mt-4 space-y-6">
                                            {/* Score Table */}
                                            <div>
                                              <h5 className="font-bold text-xs uppercase tracking-wider text-[#801A45] dark:text-[#F472B6] mb-2">Full Score Breakdown</h5>
                                              <div className="border rounded-xl bg-white dark:bg-[#12121E] overflow-hidden">
                                                <Table>
                                                  <TableHeader>
                                                    <TableRow>
                                                      <TableHead className="text-xs">Intelligence Type</TableHead>
                                                      <TableHead className="text-right text-xs">Score (Max 12)</TableHead>
                                                    </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                    {parsedResult.breakdown.map((cat, index) => (
                                                      <TableRow key={index} className={index < 3 ? 'bg-[#FAF5F8] dark:bg-white/5 font-semibold' : ''}>
                                                        <TableCell className="text-xs">{cat.name}</TableCell>
                                                        <TableCell className="text-right text-xs font-mono">{cat.score}</TableCell>
                                                      </TableRow>
                                                    ))}
                                                  </TableBody>
                                                </Table>
                                              </div>
                                            </div>

                                            {/* Detailed Recommendations for Top 3 */}
                                            <div className="border-t border-slate-200 dark:border-white/10 pt-4">
                                              <h5 className="font-bold text-xs uppercase tracking-wider text-[#801A45] dark:text-[#F472B6] mb-3">Top 3 Recommended Careers & Courses</h5>
                                              <div className="space-y-3">
                                                {parsedResult.breakdown.slice(0, 3).map((cat, i) => {
                                                  const details = HGMI_DETAILS[cat.id] || HGMI_DETAILS[cat.name]; 
                                                  if (!details) return null;

                                                  return (
                                                    <div key={i} className="bg-white dark:bg-[#12121E] p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
                                                      <h6 className="font-bold text-[#801A45] dark:text-[#F472B6] mb-2 text-sm flex items-center gap-2">
                                                        <span className="bg-[#801A45] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold font-mono">{i + 1}</span>
                                                        {cat.name}
                                                      </h6>
                                                      <div className="grid md:grid-cols-2 gap-3 text-xs">
                                                        <div>
                                                          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Characteristics:</span>
                                                          <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{details.characteristics}</p>
                                                        </div>
                                                        <div>
                                                          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1 flex items-center gap-1.5">
                                                            <GraduationCap className="w-3.5 h-3.5 text-[#801A45] dark:text-[#F472B6]"/> Recommended Courses:
                                                          </span>
                                                          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5 mt-1">
                                                            {details.courses.map((c, idx) => (
                                                              <li key={idx}>{c}</li>
                                                            ))}
                                                          </ul>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {parsedResult.studentProfile && (
                                          <div className="mt-3 border-t border-slate-200 dark:border-white/10 pt-3">
                                            <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Student Profile</h5>
                                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{parsedResult.studentProfile}</p>
                                          </div>
                                        )}
                                        {parsedResult.goal && (
                                          <div className="mt-3">
                                            <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Goal</h5>
                                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{parsedResult.goal}</p>
                                          </div>
                                        )}
                                        {parsedResult.suggestions && Array.isArray(parsedResult.suggestions) && (
                                          <div className="mt-3">
                                            <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Suggestions</h5>
                                            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                              {parsedResult.suggestions.map((suggestion, index) => (
                                                <li key={index}>{suggestion}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <p className="font-semibold text-primary p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                                        {JSON.stringify(parsedResult)}
                                      </p>
                                    );
                                  }
                                })()}
                              </div>

                              {/* Question responses json drawer */}
                              <div className="col-span-full border-t border-slate-200 dark:border-white/10 pt-4">
                                <details className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-3.5">
                                  <summary className="cursor-pointer font-bold text-xs uppercase tracking-wider text-[#801A45] dark:text-[#F472B6]">View Saved Question Responses</summary>
                                  {(() => {
                                    try {
                                      const raw = submission.responses ? JSON.parse(submission.responses) : null;
                                      if (!raw) return <p className="text-xs text-slate-500 mt-2">No question-level responses stored for this submission.</p>;
                                      return <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-white dark:bg-[#12121E] border border-slate-200 dark:border-white/10 p-3 text-[11px] font-mono whitespace-pre-wrap">{JSON.stringify(raw, null, 2)}</pre>;
                                    } catch (e) {
                                      return <p className="text-xs text-red-600 mt-2">Saved response data could not be parsed.</p>;
                                    }
                                  })()}
                                </details>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="text-center">
                    <TableCell colSpan={6} className="py-14">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        No submissions found matching your search criteria.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {filteredSubmissions.length > 0 && (
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
                  <SelectTrigger className="w-[80px] rounded-xl text-xs">
                    <SelectValue placeholder={rowsPerPage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-xs font-semibold text-[#667085] dark:text-slate-300">
                  Page {currentPage} of {totalPages || 1}
                </p>
                <div className="flex items-center space-x-2">
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
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}