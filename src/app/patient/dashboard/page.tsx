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
  AlertCircle,
  Loader2,
  Activity,
  LogOut,
  User,
  Menu,
  X,
  Heart,
  Clock,
  Search,
  Home,
  Settings,
  HelpCircle,
  Phone,
  Bell,
  Microscope
} from "lucide-react";

// Mock data
const mockReports = [
  {
    id: 1,
    report_title: "Complete Blood Count (CBC)",
    report_date: "2026-04-10",
    has_summary: true,
    report_type: "Hematology",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    report_title: "Lipid Profile Test",
    report_date: "2026-04-05",
    has_summary: false,
    report_type: "Biochemistry",
    doctor: "Dr. Michael Chen",
  },
  {
    id: 3,
    report_title: "Liver Function Test",
    report_date: "2026-03-28",
    has_summary: true,
    report_type: "Biochemistry",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 4,
    report_title: "Thyroid Profile",
    report_date: "2026-03-20",
    has_summary: false,
    report_type: "Endocrinology",
    doctor: "Dr. Emily Watson",
  },
];

const mockPatient = {
  name: "Test Patient",
  patient_id: "PAT1234567890",
};

export default function PatientDashboard() {
  const router = useRouter();
  const [reports, setReports] = useState(mockReports);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const generateSummary = async (reportId: number) => {
    setGeneratingId(reportId);
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === reportId ? { ...report, has_summary: true } : report
      ));
      setMessage({ type: "success", text: "✨ AI Summary generated successfully!" });
      setGeneratingId(null);
      setTimeout(() => setMessage(null), 3000);
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
    report.report_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: reports.length,
    summarized: reports.filter(r => r.has_summary).length,
    pending: reports.filter(r => !r.has_summary).length
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        backgroundColor: 'white',
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 50,
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#dc2626', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>SRS</span>
              </div>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>Smart Report</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link href="/patient/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '8px', textDecoration: 'none' }}>
            <Home size={18} /> <span>Dashboard</span>
          </Link>
          <Link href="/patient/reports" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: '#6b7280', borderRadius: '8px', textDecoration: 'none' }}>
            <FileText size={18} /> <span>My Reports</span>
          </Link>
          <Link href="/patient/settings" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: '#6b7280', borderRadius: '8px', textDecoration: 'none' }}>
            <Settings size={18} /> <span>Settings</span>
          </Link>
          <Link href="/patient/help" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: '#6b7280', borderRadius: '8px', textDecoration: 'none' }}>
            <HelpCircle size={18} /> <span>Help</span>
          </Link>
        </nav>
        
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Phone size={14} color="#dc2626" />
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Emergency</span>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>+1 234 567 8900</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 0 }}>
        {/* Header */}
        <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <button onClick={() => setIsMenuOpen(true)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Menu size={20} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: '#dc2626', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>SRS</span>
                </div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>Patient Portal</span>
              </div>
              
              <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
                <Bell size={18} />
                <span style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', backgroundColor: '#dc2626', borderRadius: '50%' }}></span>
              </button>
              <button onClick={() => router.push("/")} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <LogOut size={18} />
              </button>
            </div>
            
            {/* Search Bar */}
            <div style={{ marginTop: '12px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ padding: '16px' }}>
          {/* Welcome Banner */}
          <div style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: '12px', padding: '16px', marginBottom: '20px', color: 'white' }}>
            <div>
              <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>Welcome back,</p>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{mockPatient.name.split(' ')[0]}</h1>
              <p style={{ fontSize: '11px', opacity: 0.9 }}>ID: {mockPatient.patient_id}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '11px', opacity: 0.9 }}>Reports</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.total}</p>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '11px', opacity: 0.9 }}>AI Ready</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.summarized}</p>
              </div>
            </div>
          </div>

          {/* Message Toast */}
          {message && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color="#059669" />
              <p style={{ fontSize: '13px', color: '#065f46', flex: 1 }}>{message.text}</p>
              <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          )}

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <Microscope size={16} color="#3b82f6" />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{stats.total}</p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>Total</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#f0fdf4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <Sparkles size={16} color="#22c55e" />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{stats.summarized}</p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>Summarized</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#fefce8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <Clock size={16} color="#eab308" />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{stats.pending}</p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>Pending</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button onClick={() => setSelectedFilter("all")} style={{ padding: '6px 16px', fontSize: '13px', fontWeight: '500', borderRadius: '20px', border: 'none', cursor: 'pointer', backgroundColor: selectedFilter === 'all' ? '#dc2626' : '#f3f4f6', color: selectedFilter === 'all' ? 'white' : '#6b7280' }}>All</button>
            <button onClick={() => setSelectedFilter("summarized")} style={{ padding: '6px 16px', fontSize: '13px', fontWeight: '500', borderRadius: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: selectedFilter === 'summarized' ? '#22c55e' : '#f3f4f6', color: selectedFilter === 'summarized' ? 'white' : '#6b7280' }}><Sparkles size={12} /> Summarized</button>
            <button onClick={() => setSelectedFilter("pending")} style={{ padding: '6px 16px', fontSize: '13px', fontWeight: '500', borderRadius: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: selectedFilter === 'pending' ? '#eab308' : '#f3f4f6', color: selectedFilter === 'pending' ? 'white' : '#6b7280' }}><Clock size={12} /> Pending</button>
          </div>

          {/* Reports List */}
          {filteredReports.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredReports.map((report) => (
                <div key={report.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={20} color="#dc2626" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{report.report_title}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{report.report_type}</span>
                        <span style={{ fontSize: '10px', color: '#6b7280' }}>{formatDate(report.report_date)}</span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>{report.doctor}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/patient/report/${report.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <button style={{ width: '100%', padding: '8px', fontSize: '12px', fontWeight: '500', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Eye size={14} /> View</button>
                    </Link>
                    {!report.has_summary ? (
                      <button onClick={() => generateSummary(report.id)} disabled={generatingId === report.id} style={{ flex: 1, padding: '8px', fontSize: '12px', fontWeight: '500', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        {generatingId === report.id ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={14} />}
                        {generatingId === report.id ? 'Loading...' : 'AI Summary'}
                      </button>
                    ) : (
                      <button disabled style={{ flex: 1, padding: '8px', fontSize: '12px', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#9ca3af', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><CheckCircle size={14} /> Summarized</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '12px' }}>
              <FileText size={48} color="#d1d5db" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: '#6b7280' }}>No reports found</p>
            </div>
          )}

          {/* Health Tip */}
          <div style={{ marginTop: '20px', backgroundColor: '#eff6ff', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px' }}>
            <Heart size={18} color="#3b82f6" style={{ marginTop: '2px' }} />
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', marginBottom: '2px' }}>Health Tip</p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>Regular check-ups help detect issues early. Stay healthy! 🏃‍♂️</p>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}