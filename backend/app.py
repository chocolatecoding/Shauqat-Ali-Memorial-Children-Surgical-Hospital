from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from database import Database
from ai_services import AIServices
import datetime
import hashlib
import random
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.config['JWT_SECRET_KEY'] = 'smart-report-secret-key-2026'

jwt = JWTManager(app)
db = Database()
ai = AIServices()
ai.set_openai_key(os.getenv('OPENAI_API_KEY', 'your-key-here'))

def generate_otp():
    return str(random.randint(100000, 999999))

def generate_patient_id():
    return f"PAT{random.randint(10000, 99999)}{datetime.datetime.now().strftime('%Y%m%d')}"

# ==================== AUTH ROUTES ====================

@app.route('/api/staff/login', methods=['POST'])
def staff_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    hashed = hashlib.sha256(password.encode()).hexdigest()
    
    user = db.fetch_one(
        "SELECT * FROM users WHERE email=%s AND user_type='staff' AND password=%s",
        (email, hashed)
    )
    
    if user:
        token = create_access_token(identity={'id': user['id'], 'type': 'staff'})
        return jsonify({'success': True, 'token': token, 'user': user})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/patient/login', methods=['POST'])
def patient_login():
    data = request.json
    email = data.get('email')
    patient_id = data.get('patient_id')
    
    user = db.fetch_one(
        "SELECT * FROM users WHERE email=%s AND patient_id=%s AND user_type='patient'",
        (email, patient_id)
    )
    
    if user:
        otp = generate_otp()
        expires_at = datetime.datetime.now() + datetime.timedelta(minutes=10)
        db.execute_query(
            "INSERT INTO otp_codes (email, otp_code, expires_at) VALUES (%s, %s, %s)",
            (email, otp, expires_at)
        )
        # In production, send email here
        print(f"OTP for {email}: {otp}")
        return jsonify({'success': True, 'temp_token': create_access_token(identity={'email': email})})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    otp = data.get('otp')
    email = data.get('email')
    
    record = db.fetch_one(
        "SELECT * FROM otp_codes WHERE email=%s AND otp_code=%s AND expires_at > NOW() AND is_used=FALSE",
        (email, otp)
    )
    
    if record:
        db.execute_query("UPDATE otp_codes SET is_used=TRUE WHERE id=%s", (record['id'],))
        user = db.fetch_one("SELECT * FROM users WHERE email=%s", (email,))
        token = create_access_token(identity={'id': user['id'], 'type': 'patient'})
        return jsonify({'success': True, 'token': token, 'user': user})
    return jsonify({'error': 'Invalid OTP'}), 401

# ==================== PATIENT ROUTES ====================

@app.route('/api/patient/reports', methods=['GET'])
@jwt_required()
def get_patient_reports():
    current_user = get_jwt_identity()
    user = db.fetch_one("SELECT * FROM users WHERE id=%s", (current_user['id'],))
    reports = db.fetch_all(
        "SELECT r.*, CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END as has_summary "
        "FROM reports r LEFT JOIN ai_summaries a ON r.id = a.report_id "
        "WHERE r.patient_id=%s ORDER BY r.upload_date DESC",
        (user['patient_id'],)
    )
    return jsonify({'reports': reports})

@app.route('/api/patient/generate-summary/<int:report_id>', methods=['POST'])
@jwt_required()
def generate_summary(report_id):
    current_user = get_jwt_identity()
    report = db.fetch_one("SELECT * FROM reports WHERE id=%s", (report_id,))
    if not report:
        return jsonify({'error': 'Report not found'}), 404
    
    existing = db.fetch_one("SELECT id FROM ai_summaries WHERE report_id=%s", (report_id,))
    if existing:
        return jsonify({'error': 'Summary already exists'}), 400
    
    filepath = os.path.join('uploads', report['report_file_path'])
    text = ai.extract_text_from_pdf(filepath)
    
    if not text:
        return jsonify({'error': 'Could not extract text'}), 400
    
    summary = ai.generate_summary(text, report['report_title'])
    voice_file = ai.generate_voice_summary(summary, report_id)
    
    db.execute_query(
        "INSERT INTO ai_summaries (report_id, summary_text, summary_voice_path) VALUES (%s, %s, %s)",
        (report_id, summary, voice_file)
    )
    return jsonify({'success': True, 'summary': summary})

# ==================== STAFF ROUTES ====================

@app.route('/api/staff/patients', methods=['GET'])
@jwt_required()
def get_patients():
    current_user = get_jwt_identity()
    if current_user['type'] != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    patients = db.fetch_all("SELECT * FROM users WHERE user_type='patient' ORDER BY created_at DESC")
    return jsonify({'patients': patients})

@app.route('/api/staff/create-patient', methods=['POST'])
@jwt_required()
def create_patient():
    current_user = get_jwt_identity()
    if current_user['type'] != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    name = data.get('name')
    email = data.get('email')
    patient_id = generate_patient_id()
    
    db.execute_query(
        "INSERT INTO users (email, user_type, patient_id, name) VALUES (%s, 'patient', %s, %s)",
        (email, patient_id, name)
    )
    return jsonify({'success': True, 'patient_id': patient_id})

if __name__ == '__main__':
    db.connect()
    app.run(host='0.0.0.0', port=5000, debug=True)