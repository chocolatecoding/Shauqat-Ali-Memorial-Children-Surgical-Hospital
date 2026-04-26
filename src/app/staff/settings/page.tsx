'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Bot, MessageCircle, CheckCircle, XCircle, Settings, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StaffSettings() {
  const router = useRouter();
  const [aiSummary, setAiSummary] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if staff is logged in
    const token = localStorage.getItem('staffToken');
    const name = localStorage.getItem('userName');
    
    if (!token) {
      router.push('/staff/login');
      return;
    }
    
    setUserName(name || 'Staff');
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
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: `${data.error || 'Failed to save settings'}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - IDENTICAL to dashboard header */}
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
              <Link href="/staff/dashboard" className="text-gray-500 hover:text-gray-700 transition">
                <ArrowLeft className="w-5 h-5" />
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title - MATCHES dashboard style */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Configure system features for patient portal
          </p>
        </div>

        {/* Settings Card - Using same Card component as dashboard */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-red-600" />
              Feature Toggles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-3 rounded-lg text-sm ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? '✅' : '❌'} {message.text}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* AI Summary Feature */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-red-600" />
                    <h3 className="text-base font-semibold text-gray-800">AI Summary Feature</h3>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {aiSummary ? 'ON' : 'OFF'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Chatbot Feature */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-red-600" />
                    <h3 className="text-base font-semibold text-gray-800">Chatbot Feature</h3>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {chatbot ? 'ON' : 'OFF'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Save Button - MATCHES dashboard button style */}
              <Button 
                type="submit" 
                disabled={saving}
                className="w-full bg-red-600 hover:bg-red-700 py-6"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </form>

            {/* Info Box - MATCHES dashboard quick tip style */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-amber-600 text-sm">ℹ️</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">About Settings</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Changes made here will immediately affect what patients see on their dashboard and report pages.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}