"use client";

import { useState } from "react";
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
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockReports = [
  {
    id: 1,
    report_title: "Complete Blood Count (CBC)",
    report_date: "2026-04-10",
    has_summary: true,
    report_type: "Hematology",
  },
  {
    id: 2,
    report_title: "Lipid Profile Test",
    report_date: "2026-04-05",
    has_summary: false,
    report_type: "Biochemistry",
  },
  {
    id: 3,
    report_title: "Liver Function Test",
    report_date: "2026-03-28",
    has_summary: true,
    report_type: "Biochemistry",
  },
  {
    id: 4,
    report_title: "Thyroid Profile",
    report_date: "2026-03-20",
    has_summary: false,
    report_type: "Endocrinology",
  },
];

const mockPatient = {
  name: "Sarah Ahmed",
  patient_id: "PAT1234567890",
  email: "sarah@example.com",
};

export default function PatientDashboard() {
  const router = useRouter();
  const [reports, setReports] = useState(mockReports);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const generateSummary = async (reportId: number) => {
    setGeneratingId(reportId);
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === reportId ? { ...report, has_summary: true } : report
      ));
      setGeneratingId(null);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredReports = reports.filter(report => {
    if (selectedFilter === "summarized") return report.has_summary;
    if (selectedFilter === "pending") return !report.has_summary;
    return true;
  }).filter(report => 
    report.report_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: reports.length,
    summarized: reports.filter(r => r.has_summary).length,
    pending: reports.filter(r => !r.has_summary).length
  };

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
              <span className="font-semibold text-gray-800">Smart Report System</span>
              <span className="text-xs text-gray-400 ml-2 hidden sm:inline">| Patient Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {mockPatient.name.split(' ')[0]}</span>
              <button
                onClick={() => router.push("/")}
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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {mockPatient.name.split(' ')[0]}!
              </h1>
              <p className="text-red-100 text-sm">Patient ID: {mockPatient.patient_id}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.summarized}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
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
              className={`px-4 py-2 text-sm rounded-lg transition ${selectedFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("summarized")}
              className={`px-4 py-2 text-sm rounded-lg transition flex items-center gap-1 ${selectedFilter === 'summarized' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Sparkles className="w-3 h-3" /> Summarized
            </button>
            <button
              onClick={() => setSelectedFilter("pending")}
              className={`px-4 py-2 text-sm rounded-lg transition flex items-center gap-1 ${selectedFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Clock className="w-3 h-3" /> Pending
            </button>
          </div>
        </div>

        {/* Reports List */}
        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{report.report_title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {report.report_type}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(report.report_date)}
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
                      {!report.has_summary ? (
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
                          {generatingId === report.id ? "Generating..." : "AI Summary"}
                        </Button>
                      ) : (
                        <Button size="sm" disabled variant="outline" className="text-gray-400 gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Done
                        </Button>
                      )}
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
              <p className="text-gray-500">No reports found</p>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contact */}
        <div className="mt-8 p-4 bg-red-50 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">24/7 Emergency Support</p>
              <p className="text-xs text-gray-500">Immediate medical assistance available</p>
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
              <p className="text-xs text-gray-600">Regular health check-ups help detect potential issues early. Stay proactive about your health!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}