"use client";

import { useState } from "react";
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
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock report data
const mockReport = {
  id: 1,
  title: "Complete Blood Count (CBC)",
  date: "April 10, 2026",
  fileUrl: "/reports/cbc-report.pdf",
  summary: `Your Complete Blood Count report shows normal results. 

Hemoglobin: 14.2 g/dL (Normal range: 13.5-17.5)
White Blood Cells: 7.2 (Normal range: 4.5-11.0)
Red Blood Cells: 4.8 (Normal range: 4.5-5.9)
Platelets: 250 (Normal range: 150-450)

All your values are within the normal range. No abnormalities detected. 
Your blood counts indicate good overall health. 
Continue with your healthy lifestyle and regular check-ups.`,
};

const mockPatient = {
  name: "Sarah Ahmed",
  patient_id: "PAT1234567890",
};

export default function ReportViewPage() {
  const params = useParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: "bot", content: "Hello! Ask me anything about your report." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const speakSummary = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(mockReport.summary);
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      alert("Text-to-speech is not supported in your browser");
    }
  };

  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    setChatHistory(prev => [...prev, { role: "user", content: chatMessage }]);
    setIsLoading(true);

    setTimeout(() => {
      const response = getAIResponse(chatMessage);
      setChatHistory(prev => [...prev, { role: "bot", content: response }]);
      setIsLoading(false);
    }, 1000);

    setChatMessage("");
  };

  const getAIResponse = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes("normal") || q.includes("good")) {
      return "Yes, all your values are within the normal range. Your report shows no abnormalities.";
    } else if (q.includes("high") || q.includes("low")) {
      return "All your values are within normal range. No values are high or low.";
    } else if (q.includes("meaning") || q.includes("mean")) {
      return "Your test results show that all your blood counts are at healthy levels. This indicates good overall health.";
    } else if (q.includes("next") || q.includes("do")) {
      return "Based on your normal results, you should continue with your regular health routine. Schedule your next check-up in 6 months.";
    } else {
      return "Your report shows all normal values. No immediate concerns detected. Please consult your doctor for detailed interpretation.";
    }
  };

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{mockReport.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{mockReport.date}</p>
        </div>

        {/* Original Report Button */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <a 
              href={mockReport.fileUrl} 
              target="_blank" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 rounded-lg text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <FileText className="w-4 h-4" />
              View Original Report
            </a>
          </CardContent>
        </Card>

        {/* AI Summary Section */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <h2 className="font-semibold text-gray-800">AI Summary</h2>
              </div>
              <button
                onClick={speakSummary}
                className="p-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition"
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {mockReport.summary}
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-red-600" />
              <h2 className="font-semibold text-gray-800">Ask About Your Report</h2>
            </div>
            
            {/* Chat Messages */}
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
            
            {/* Chat Input */}
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

        {/* Emergency Contact */}
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

        {/* Health Tip */}
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