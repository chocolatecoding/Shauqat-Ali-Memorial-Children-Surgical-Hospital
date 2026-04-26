"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Upload, 
  FileText, 
  Eye, 
  Trash2, 
  Plus, 
  LogOut,
  Search,
  ChevronRight,
  Calendar,
  Mail,
  User,
  File,
  Image as ImageIcon,
  FileCheck,
  AlertCircle,
  X,
  Download,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Patient {
  patient_id: string;
  name: string;
  email: string;
  created_at: string;
}

interface Report {
  id: number;
  report_title: string;
  report_file_path: string;
  upload_date: string;
  report_date?: string;
}

export default function StaffDashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [createResult, setCreateResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [uploadResult, setUploadResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<{ id: string; name: string } | null>(null);
  const [patientReports, setPatientReports] = useState<Report[]>([]);
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("staffToken");
    const name = localStorage.getItem("userName");

    if (!token) {
      router.push("/staff/login");
      return;
    }

    setUserName(name || "Staff");
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/staff/patients");
      const data = await response.json();
      if (response.ok) {
        setPatients(data.patients);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateResult(null);

    try {
      const response = await fetch("/api/staff/create-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: patientName, email: patientEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setCreateResult({ type: "success", message: `Patient created! ID: ${data.patient_id}` });
        setPatientName("");
        setPatientEmail("");
        fetchPatients();
        setTimeout(() => setCreateResult(null), 3000);
      } else {
        setCreateResult({ type: "error", message: data.error });
      }
    } catch (error) {
      setCreateResult({ type: "error", message: "Failed to create patient" });
    }
  };

  const handleUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !reportTitle || !reportFile) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("patient_id", selectedPatient);
    formData.append("report_title", reportTitle);
    formData.append("report_file", reportFile);

    setUploadResult(null);

    try {
      const response = await fetch("/api/staff/upload-report", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadResult({ type: "success", message: "Report uploaded successfully!" });
        setSelectedPatient("");
        setReportTitle("");
        setReportFile(null);
        const fileInput = document.getElementById("reportFile") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        setTimeout(() => setUploadResult(null), 3000);
      } else {
        setUploadResult({ type: "error", message: data.error });
      }
    } catch (error) {
      setUploadResult({ type: "error", message: "Upload failed" });
    }
  };

  const viewReports = async (patientId: string, patientName: string) => {
    setCurrentPatient({ id: patientId, name: patientName });
    setPatientReports([]);
    setModalOpen(true);

    try {
      const response = await fetch(`/api/staff/patient-reports/${patientId}`);
      const data = await response.json();
      if (response.ok && data.reports) {
        setPatientReports(data.reports);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const deleteReport = async (reportId: number) => {
    if (confirm("Are you sure you want to delete this report? This cannot be undone.")) {
      const response = await fetch(`/api/staff/delete-report/${reportId}`, { method: "DELETE" });
      if (response.ok) {
        alert("Report deleted successfully!");
        if (currentPatient) {
          viewReports(currentPatient.id, currentPatient.name);
        }
      } else {
        alert("Failed to delete report");
      }
    }
  };

  const deletePatient = async (patientId: string, patientName: string) => {
    if (confirm(`Delete patient "${patientName}" and ALL their reports? This cannot be undone!`)) {
      const response = await fetch(`/api/staff/delete-patient/${patientId}`, { method: "DELETE" });
      if (response.ok) {
        alert(`Patient "${patientName}" deleted successfully!`);
        fetchPatients();
      } else {
        alert("Failed to delete patient");
      }
    }
  };

  const deleteAllPatients = async () => {
    if (confirm("WARNING: This will delete ALL patients and ALL their reports! This action CANNOT be undone!")) {
      const response = await fetch("/api/staff/delete-all-patients", { method: "DELETE" });
      if (response.ok) {
        alert("All patients and reports deleted successfully!");
        fetchPatients();
      } else {
        alert("Failed to delete all patients");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("userName");
    router.push("/staff/login");
  };

  const getFileIcon = (filePath: string) => {
    if (!filePath) return <File className="w-4 h-4 text-gray-400" />;
    const ext = filePath.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <FileCheck className="w-4 h-4 text-red-500" />;
    if (ext === "jpg" || ext === "jpeg" || ext === "png") return <ImageIcon className="w-4 h-4 text-blue-500" />;
    return <File className="w-4 h-4 text-gray-400" />;
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
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
              <span className="font-semibold text-gray-800">Smart Report System</span>
              <span className="text-xs text-gray-400 ml-2 hidden sm:inline">| Staff Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {userName}</span>
              <Link href="/staff/settings" className="text-gray-500 hover:text-gray-700 transition">
                <Settings className="w-5 h-5" />
              </Link>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage patients, upload reports, and track medical records</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Create Patient & Upload Report */}
          <div className="space-y-6">
            {/* Create Patient Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-600" />
                  Create New Patient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePatient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      type="text"
                      placeholder="e.g., John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Patient
                  </Button>
                </form>
                {createResult && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${createResult.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {createResult.message}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Report Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-red-600" />
                  Upload Lab Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadReport} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
                    <select
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a patient</option>
                      {patients.map((patient) => (
                        <option key={patient.patient_id} value={patient.patient_id}>
                          {patient.name} ({patient.patient_id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                    <Input
                      type="text"
                      placeholder="e.g., Complete Blood Count"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report File</label>
                    <Input
                      id="reportFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                      required
                      className="pt-1.5"
                    />
                    <p className="text-xs text-gray-400 mt-1">Supported formats: PDF, JPG, PNG</p>
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Report
                  </Button>
                </form>
                {uploadResult && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${uploadResult.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {uploadResult.message}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-linear-to-br from-red-50 to-white border-red-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 font-medium">Total Patients</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{patients.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-linear-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Reports</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">—</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Tip Card */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Quick Tip</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Patients receive their Patient ID via email instantly after creation. 
                      They can then login to access their reports.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient List Section */}
        <div className="mt-8">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-600" />
                  Registered Patients
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <TableRow key={patient.patient_id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm font-medium text-gray-900">
                            {patient.patient_id}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{patient.name}</TableCell>
                          <TableCell className="text-gray-500">{patient.email}</TableCell>
                          <TableCell className="text-gray-500">{formatDate(patient.created_at)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => viewReports(patient.patient_id, patient.name)}
                                className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                Reports
                              </button>
                              <button
                                onClick={() => deletePatient(patient.patient_id, patient.name)}
                                className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          {searchTerm ? "No patients match your search" : "No patients registered yet"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {patients.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-xs text-gray-400">
                    Showing {filteredPatients.length} of {patients.length} patients
                  </p>
                  <button
                    onClick={deleteAllPatients}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Delete All Patients
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Reports Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Reports for {currentPatient?.name}
            </DialogTitle>
            <DialogDescription>
              View and manage all medical reports for this patient
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4">
            {patientReports.length > 0 ? (
              patientReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileIcon(report.report_file_path)}
                    <div>
                      <p className="font-medium text-gray-900">{report.report_title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(report.upload_date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/api/staff/view-report-file/${report.id}`}
                      target="_blank"
                      className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    >
                      View
                    </a>
                    <button
                      onClick={() => deleteReport(report.id)}
                      className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No reports found for this patient</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}