'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Bot, MessageCircle, CheckCircle, XCircle } from 'lucide-react';

export default function StaffSettings() {
  const router = useRouter();
  const [aiSummary, setAiSummary] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Check if staff is logged in
    const token = localStorage.getItem('staffToken');
    if (!token) {
      router.push('/staff/login');
      return;
    }
    
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/staff/settings');
      const data = await response.json();
      
      if (response.ok) {
        setAiSummary(data.ai_summary === 'true' || data.ai_summary === true);
        setChatbot(data.chatbot === 'true' || data.chatbot === true);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/staff/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ai_summary: aiSummary,
          chatbot: chatbot,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: '✅ Settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: `❌ ${data.error || 'Failed to save settings'}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('staffToken');
    localStorage.removeItem('userName');
    router.push('/staff/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-600">Loading settings...</div>
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
              🏥 Smart Report System - Settings
            </div>
            <div className="flex items-center gap-4">
              <Link href="/staff/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          href="/staff/dashboard" 
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Settings Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white px-6 py-5">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              ⚙️ System Settings
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Configure system features for patient portal
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mx-6 mt-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="p-6">
            {/* AI Summary Feature */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-100 last:border-b-0">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-800">🤖 AI Summary Feature</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  When enabled, patients can generate AI summaries of their medical reports.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Enabled: Patients can click "Generate AI Summary" button</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <XCircle className="w-3 h-3" />
                    <span>Disabled: Button will be hidden from patients</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiSummary}
                    onChange={(e) => setAiSummary(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {aiSummary ? 'ON' : 'OFF'}
                  </span>
                </label>
              </div>
            </div>

            {/* Chatbot Feature */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-100 last:border-b-0">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-800">💬 Chatbot Feature</h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  When enabled, patients can ask questions about their reports and get AI-powered answers.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Enabled: Chatbot appears on report view page</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <XCircle className="w-3 h-3" />
                    <span>Disabled: Chatbot will be hidden</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chatbot}
                    onChange={(e) => setChatbot(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {chatbot ? 'ON' : 'OFF'}
                  </span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : '💾 Save Settings'}
            </button>
          </form>

          {/* Info Box */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="text-indigo-500 text-xl">ℹ️</div>
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">About Settings:</p>
                <p>Changes made here will immediately affect what patients see on their dashboard and report pages.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}