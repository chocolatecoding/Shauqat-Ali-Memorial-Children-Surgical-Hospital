"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Eye,
  Sparkles,
  Calendar,
  CheckCircle,
  Loader2,
  LogOut,
  User,
  Search,
  Phone,
  Heart,
  Clock,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_BASE = "http://localhost:5000/api";

interface Report {
  id: number;
  report_title: string;
  report_date: string;
  upload_date: string;
  has_summary: boolean;
  report_file_path?: string;
}

interface Patient {
  name: string;
  patient_id: string;
  email?: string;
}

interface Settings {
  ai_summary_enabled: boolean;
  chatbot_enabled: boolean;
}

export default function PatientDashboard() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    ai_summary_enabled: true,
    chatbot_enabled: true,
  });

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/patient/login");
      return;
    }
    fetchSettings();
    fetchDashboard(token);
  }, [router]);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/patient/settings`);
      const data = await response.json();
      setSettings({
        ai_summary_enabled: data.ai_summary_enabled === true,
        chatbot_enabled: data.chatbot_enabled === true,
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchDashboard = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/patient/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setReports(data.reports || []);
        setPatient(data.patient);
      } else {
        setError(data.error || "Failed to load dashboard");
        if (data.error === "Unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/patient/login");
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      setError("Network error. Make sure backend is running on port 5000");
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async (reportId: number) => {
    const token = getToken();
    if (!token) return;

    // Check if AI summary is enabled
    if (!settings.ai_summary_enabled) {
      alert(
        "AI Summary feature is currently disabled by staff. Please contact hospital administration.",
      );
      return;
    }

    setGeneratingId(reportId);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/patient/generate-summary/${reportId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setReports((prev) =>
          prev.map((report) =>
            report.id === reportId ? { ...report, has_summary: true } : report,
          ),
        );
        alert("AI Summary generated successfully! Click View to see it.");
      } else {
        setError(data.error || "Failed to generate summary");
      }
    } catch (error) {
      setError("Error generating summary");
    } finally {
      setGeneratingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredReports = reports
    .filter((report) => {
      if (selectedFilter === "summarized") return report.has_summary;
      if (selectedFilter === "pending") return !report.has_summary;
      return true;
    })
    .filter((report) =>
      report.report_title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const stats = {
    total: reports.length,
    summarized: reports.filter((r) => r.has_summary).length,
    pending: reports.filter((r) => !r.has_summary).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-gray-800">
                Smart Report System
              </span>
              <span className="text-xs text-gray-400 ml-2 hidden sm:inline">
                | Patient Portal
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                Welcome, {patient?.name?.split(" ")[0] || "Patient"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* AI Feature Notice */}
        {!settings.ai_summary_enabled && (
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <p className="text-amber-700 text-sm">
                AI Summary feature is currently disabled by staff. You can still
                view your reports normally.
              </p>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="bg-linear-to-r from-red-600 to-red-700 rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {patient?.name?.split(" ")[0] || "Patient"}!
              </h1>
              <p className="text-red-100 text-sm">
                Patient ID: {patient?.patient_id}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-red-100">Reports</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold">{stats.summarized}</p>
                <p className="text-xs text-red-100">AI Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-500">Total Reports</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.summarized}
                </p>
                <p className="text-sm text-gray-500">AI Summarized</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
                <p className="text-sm text-gray-500">Pending Summary</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 text-sm rounded-lg transition ${selectedFilter === "all" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              All
            </button>
            {settings.ai_summary_enabled && (
              <>
                <button
                  onClick={() => setSelectedFilter("summarized")}
                  className={`px-4 py-2 text-sm rounded-lg transition flex items-center gap-1 ${selectedFilter === "summarized" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Sparkles className="w-3 h-3" /> Summarized
                </button>
                <button
                  onClick={() => setSelectedFilter("pending")}
                  className={`px-4 py-2 text-sm rounded-lg transition flex items-center gap-1 ${selectedFilter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Clock className="w-3 h-3" /> Pending
                </button>
              </>
            )}
          </div>
        </div>

        {/* Reports List */}
        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {report.report_title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(
                              report.report_date || report.upload_date,
                            )}
                          </span>
                          {report.has_summary && (
                            <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Ready
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/patient/report/${report.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                      {/* AI Summary Button - Only show if enabled in settings */}
                      {settings.ai_summary_enabled && !report.has_summary ? (
                        <Button
                          size="sm"
                          onClick={() => generateSummary(report.id)}
                          disabled={generatingId === report.id}
                          className="bg-red-600 hover:bg-red-700 gap-1"
                        >
                          {generatingId === report.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                          {generatingId === report.id
                            ? "Generating..."
                            : "AI Summary"}
                        </Button>
                      ) : report.has_summary ? (
                        <Button
                          size="sm"
                          disabled
                          variant="outline"
                          className="text-gray-400 gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Done
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm
                  ? "No reports match your search"
                  : "No reports found"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contact */}
        <div className="mt-8 p-4 bg-red-50 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                24/7 Emergency Support
              </p>
              <p className="text-xs text-gray-500">
                Immediate medical assistance available
              </p>
            </div>
          </div>
          <a href="tel:03480639599">
            <Button className="bg-red-600 hover:bg-red-700">
              Call Emergency: 03480639599
            </Button>
          </a>
        </div>

        {/* Health Tip */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <div className="flex gap-3">
            <Heart className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Health Tip</p>
              <p className="text-xs text-gray-600">
                Regular health check-ups help detect potential issues early.
                Stay proactive about your health!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
