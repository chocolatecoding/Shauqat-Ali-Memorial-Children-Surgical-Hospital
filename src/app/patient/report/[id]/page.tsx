"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX,
  MessageCircle,
  Send,
  LogOut,
  Phone,
  Heart,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_BASE = "http://localhost:5000/api";

interface Report {
  id: number;
  report_title: string;
  report_date: string;
  upload_date: string;
  report_file_path: string;
}

interface Summary {
  id: number;
  summary_text: string;
  summary_voice_path: string;
}

interface Patient {
  name: string;
  patient_id: string;
}

interface Settings {
  ai_summary_enabled: boolean;
  chatbot_enabled: boolean;
}

export default function ReportViewPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;

  const [report, setReport] = useState<Report | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: "bot", content: "Hello! Ask me anything about your report." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({ 
    ai_summary_enabled: true, 
    chatbot_enabled: true 
  });

  const getToken = () => {
    if (typeof window !== 'undefined') {
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
    
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setPatient({ name: userData.name, patient_id: userData.patient_id });
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    fetchReportData(token);
  }, [reportId]);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/patient/settings`);
      const data = await response.json();
      setSettings({
        ai_summary_enabled: data.ai_summary_enabled === true,
        chatbot_enabled: data.chatbot_enabled === true
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchReportData = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const reportRes = await fetch(`${API_BASE}/patient/report/${reportId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const reportData = await reportRes.json();
      
      if (reportRes.ok) {
        setReport(reportData.report);
        setSummary(reportData.summary);
      } else {
        setError(reportData.error || "Failed to load report");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      setError("Failed to connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async () => {
    const token = getToken();
    if (!token) return;
    
    if (!settings.ai_summary_enabled) {
      alert("AI Summary feature is currently disabled by staff.");
      return;
    }
    
    setGeneratingSummary(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/patient/generate-summary/${reportId}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        await fetchReportData(token);
        alert("AI Summary generated successfully!");
      } else {
        setError(data.error || "Failed to generate summary");
      }
    } catch (error) {
      console.error("Generate summary error:", error);
      setError("Failed to generate summary");
    } finally {
      setGeneratingSummary(false);
    }
  };

  const speakSummary = () => {
    const textToSpeak = summary?.summary_text || "";
    if (!textToSpeak) {
      alert("No summary available to read aloud");
      return;
    }
    
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      alert("Text-to-speech is not supported in your browser");
    }
  };

  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    if (!settings.chatbot_enabled) {
      alert("Chatbot feature is currently disabled by staff.");
      return;
    }

    setChatHistory(prev => [...prev, { role: "user", content: chatMessage }]);
    setIsLoading(true);

    try {
      const token = getToken();
      const response = await fetch(`${API_BASE}/patient/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ question: chatMessage, report_id: parseInt(reportId) })
      });
      const data = await response.json();
      
      setChatHistory(prev => [...prev, { role: "bot", content: data.answer || "Sorry, I couldn't process your question." }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatHistory(prev => [...prev, { role: "bot", content: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
      setChatMessage("");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Report Not Found</h1>
          <p className="text-gray-500 mb-6">{error || "The report you're looking for doesn't exist."}</p>
          <Link href="/patient/dashboard">
            <Button className="bg-red-600 hover:bg-red-700">
              Back to Dashboard
            </Button>
          </Link>
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
            <div className="flex items-center gap-3">
              <Link href="/patient/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-semibold text-gray-800">Smart Report System</span>
                <span className="text-xs text-gray-400 ml-2 hidden sm:inline">| Report Viewer</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {patient?.name?.split(' ')[0] || "Patient"}</span>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Title - ALWAYS VISIBLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{report.report_title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Report Date: {formatDate(report.report_date || report.upload_date)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Patient ID: {patient?.patient_id}</p>
        </div>

        {/* View Original Report Button - ALWAYS VISIBLE */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <a 
              href={`http://localhost:5000/uploads/${report.report_file_path}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 rounded-lg text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <FileText className="w-4 h-4" />
              View Original Report
            </a>
          </CardContent>
        </Card>

        {/* AI Summary Section - ONLY SHOW IF AI SUMMARY IS ENABLED */}
        {settings.ai_summary_enabled && (
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-red-600" />
                  <h2 className="font-semibold text-gray-800">AI Summary</h2>
                </div>
                <div className="flex gap-2">
                  {summary && (
                    <button
                      onClick={speakSummary}
                      className="p-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition"
                      title="Listen to summary"
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}
                  {!summary && (
                    <button
                      onClick={generateSummary}
                      disabled={generatingSummary}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 transition flex items-center gap-2"
                    >
                      {generatingSummary ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Generate AI Summary
                    </button>
                  )}
                  {summary && settings.ai_summary_enabled && (
                    <button
                      onClick={generateSummary}
                      disabled={generatingSummary}
                      className="p-2 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition disabled:opacity-50"
                      title="Regenerate AI Summary"
                    >
                      {generatingSummary ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              {summary ? (
                <>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-4">
                    {summary.summary_text}
                  </div>
                  <div className="text-xs text-gray-400 text-right border-t pt-3 mt-2">
                    <span>AI-generated content. Please consult your doctor for medical advice.</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No AI summary available yet</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Generate AI Summary" to create one</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* AI Feature Disabled Notice */}
        {!settings.ai_summary_enabled && (
          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">AI Features Disabled</p>
                <p className="text-xs text-amber-700 mt-1">
                  AI Summary and Chatbot features are currently disabled by hospital staff.
                  You can still view your original report.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot Section - ONLY SHOW IF BOTH AI SUMMARY AND CHATBOT ARE ENABLED */}
        {settings.ai_summary_enabled && settings.chatbot_enabled && summary && (
          <Card className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-red-600" />
                <h2 className="font-semibold text-gray-800">Ask About Your Report</h2>
              </div>
              
              <div className="h-80 overflow-y-auto space-y-3 mb-4 bg-gray-50 rounded-xl p-4">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-700 shadow-sm border border-gray-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a question about your report..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatMessage.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contact - ALWAYS VISIBLE */}
        <div className="mt-6 p-4 bg-red-50 rounded-xl flex items-center justify-between flex-wrap gap-3">
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

        {/* Health Tip - ALWAYS VISIBLE */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <div className="flex gap-3">
            <Heart className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Health Tip</p>
              <p className="text-xs text-gray-600">Always consult your doctor if you have questions about your test results.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}