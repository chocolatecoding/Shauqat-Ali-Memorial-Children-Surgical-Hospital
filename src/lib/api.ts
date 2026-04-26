const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Staff endpoints
  staffLogin: (email: string, password: string) =>
    fetch(`${API_BASE}/staff/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json()),
  
  getPatients: (token: string) =>
    fetch(`${API_BASE}/staff/patients`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(res => res.json()),
  
  createPatient: (name: string, email: string, token: string) =>
    fetch(`${API_BASE}/staff/create-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    }).then(res => res.json()),
  
  uploadReport: (patientId: string, title: string, file: File, token: string) => {
    const formData = new FormData();
    formData.append('patient_id', patientId);
    formData.append('report_title', title);
    formData.append('report_file', file);
    return fetch(`${API_BASE}/staff/upload-report`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    }).then(res => res.json());
  },
  
  deletePatient: (patientId: string, token: string) =>
    fetch(`${API_BASE}/staff/delete-patient/${patientId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(res => res.json()),
  
  getSettings: (token: string) =>
    fetch(`${API_BASE}/staff/settings`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(res => res.json()),
  
  updateSettings: (settings: any, token: string) =>
    fetch(`${API_BASE}/staff/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    }).then(res => res.json()),
  
  // Patient endpoints
  patientLogin: (email: string, patientId: string) =>
    fetch(`${API_BASE}/patient/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, patient_id: patientId }),
    }).then(res => res.json()),
  
  verifyOTP: (otp: string, email: string) =>
    fetch(`${API_BASE}/patient/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, email }),
    }).then(res => res.json()),
  
  resendOTP: (tempToken: string) =>
    fetch(`${API_BASE}/patient/resend-otp`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tempToken}` },
    }).then(res => res.json()),
  
  getPatientDashboard: (token: string) =>
    fetch(`${API_BASE}/patient/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(res => res.json()),
  
  getReport: (reportId: number, token: string) =>
    fetch(`${API_BASE}/patient/report/${reportId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(res => res.json()),
  
  generateSummary: (reportId: number, token: string) =>
    fetch(`${API_BASE}/patient/generate-summary/${reportId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then(res => res.json()),
  
  chatbot: (question: string, reportId: number, token: string) =>
    fetch(`${API_BASE}/patient/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ question, report_id: reportId }),
    }).then(res => res.json()),
};