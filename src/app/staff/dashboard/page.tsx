"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [createResult, setCreateResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [uploadResult, setUploadResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [patientReports, setPatientReports] = useState<Report[]>([]);
  const [userName, setUserName] = useState("");

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
        setCreateResult({
          type: "success",
          message: `✓ Patient created! ID: ${data.patient_id}`,
        });
        setPatientName("");
        setPatientEmail("");
        fetchPatients();
        setTimeout(() => setCreateResult(null), 3000);
      } else {
        setCreateResult({ type: "error", message: `❌ ${data.error}` });
      }
    } catch (error) {
      setCreateResult({
        type: "error",
        message: "❌ Failed to create patient",
      });
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
        setUploadResult({
          type: "success",
          message: "✓ Report uploaded successfully!",
        });
        setSelectedPatient("");
        setReportTitle("");
        setReportFile(null);

        const fileInput = document.getElementById(
          "reportFile",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        setTimeout(() => setUploadResult(null), 3000);
      } else {
        setUploadResult({
          type: "error",
          message: `❌ Upload failed: ${data.error}`,
        });
      }
    } catch (error) {
      setUploadResult({ type: "error", message: "❌ Upload failed" });
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
    if (
      confirm(
        "⚠️ Are you sure you want to delete this report? This cannot be undone.",
      )
    ) {
      const response = await fetch(`/api/staff/delete-report/${reportId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ Report deleted successfully!");
        if (currentPatient) {
          viewReports(currentPatient.id, currentPatient.name);
        }
      } else {
        alert("❌ Failed to delete report");
      }
    }
  };

  const deletePatient = async (patientId: string, patientName: string) => {
    if (
      confirm(
        `⚠️ Are you sure you want to delete patient "${patientName}" and ALL their reports?\n\nThis cannot be undone!`,
      )
    ) {
      const response = await fetch(`/api/staff/delete-patient/${patientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(`✅ Patient "${patientName}" deleted successfully!`);
        fetchPatients();
      } else {
        alert("❌ Failed to delete patient");
      }
    }
  };

  const deleteAllPatients = async () => {
    if (
      confirm(
        "⚠️⚠️⚠️ WARNING: This will delete ALL patients and ALL their reports!\n\nThis action CANNOT be undone!\n\nClick OK to confirm:",
      )
    ) {
      const response = await fetch("/api/staff/delete-all-patients", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ All patients and reports deleted successfully!");
        fetchPatients();
      } else {
        alert("❌ Failed to delete all patients");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("userName");
    router.push("/staff/login");
  };

  const getFileIcon = (filePath: string) => {
    if (!filePath) return "📄";
    const ext = filePath.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "📑";
    if (ext === "jpg" || ext === "jpeg" || ext === "png") return "🖼️";
    return "📄";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-indigo-600">
              🏥 Smart Report System - Staff Panel
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {userName}</span>
              <Link
                href="/staff/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                ⚙️ Settings
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Staff Dashboard
        </h1>

        {/* Create Patient Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">➕ Create New Patient</h2>
          <form onSubmit={handleCreatePatient}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Email
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Create Patient
                </button>
              </div>
            </div>
          </form>
          {createResult && (
            <div
              className={`mt-4 p-3 rounded-md ${
                createResult.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {createResult.message}
            </div>
          )}
        </div>

        {/* Upload Report Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📄 Upload Lab Report</h2>
          <form onSubmit={handleUploadReport}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Title
                </label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report File
                </label>
                <input
                  id="reportFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Upload Report
                </button>
              </div>
            </div>
          </form>
          {uploadResult && (
            <div
              className={`mt-4 p-3 rounded-md ${
                uploadResult.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {uploadResult.message}
            </div>
          )}
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Registered Patients</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.patient_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.patient_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            viewReports(patient.patient_id, patient.name)
                          }
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          📄 View Reports
                        </button>
                        <button
                          onClick={() =>
                            deletePatient(patient.patient_id, patient.name)
                          }
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {patients.length > 0 && (
            <div className="mt-6 text-right">
              <button
                onClick={deleteAllPatients}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                ⚠️ Delete ALL Patients
              </button>
              <p className="text-xs text-red-500 mt-2">
                ⚠️ Warning: This will delete ALL patients and their reports!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reports Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                📄 Reports for: {currentPatient?.name}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              {patientReports.length > 0 ? (
                <div className="space-y-4">
                  {patientReports.map((report) => (
                    <div
                      key={report.id}
                      className="border-b pb-4 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {getFileIcon(report.report_file_path)}{" "}
                            {report.report_title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Uploaded: {report.upload_date}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            📁 File: {report.report_file_path || "No file"}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={`/api/staff/view-report-file/${report.id}`}
                            target="_blank"
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            👁️ View
                          </a>
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  📭 No reports found for this patient.
                </p>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 text-center">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}