from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import hashlib
import jwt
import datetime
import random
from werkzeug.utils import secure_filename
from database import Database
from ai_services import AIServices
from email_service import EmailService
from settings import SettingsManager
import PyPDF2
from PIL import Image
import pytesseract
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

db = Database()
email_service = EmailService()
settings_manager = SettingsManager()  # ← CREATE INSTANCE
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs('static/audio', exist_ok=True)

JWT_SECRET = os.getenv('JWT_SECRET', 'smart-report-secret-key-2026')

# ==================== HELPER FUNCTIONS ====================

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_otp():
    return str(random.randint(100000, 999999))

def generate_patient_id():
    return f"PAT{random.randint(10000, 99999)}{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"

def generate_jwt(user_id, user_type):
    payload = {
        'user_id': user_id,
        'user_type': user_type,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def verify_jwt(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
    except:
        return None

def extract_text_from_file(filepath):
    ext = filepath.lower().split('.')[-1]
    text = ""
    try:
        if ext == 'pdf':
            with open(filepath, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                for page in reader.pages:
                    text += page.extract_text() or ""
        elif ext in ['png', 'jpg', 'jpeg']:
            image = Image.open(filepath)
            text = pytesseract.image_to_string(image)
    except Exception as e:
        print(f"Text extraction error: {e}")
    return text

# ==================== STAFF API ROUTES ====================

@app.route('/api/staff/login', methods=['POST'])
def staff_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    hashed = hash_password(password)
    
    user = db.fetch_one(
        "SELECT * FROM users WHERE email=%s AND user_type='staff' AND password=%s",
        (email, hashed)
    )
    
    if user:
        token = generate_jwt(user['id'], 'staff')
        return jsonify({
            'success': True,
            'token': token,
            'user': {'id': user['id'], 'name': user['name'], 'email': user['email']}
        })
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/staff/patients', methods=['GET'])
def get_patients():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    patients = db.fetch_all("SELECT * FROM users WHERE user_type='patient' ORDER BY created_at DESC")
    return jsonify({'patients': patients})

@app.route('/api/staff/create-patient', methods=['POST'])
def create_patient():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    name = data.get('name')
    email = data.get('email')
    patient_id = generate_patient_id()
    
    try:
        db.execute_query(
            "INSERT INTO users (email, user_type, patient_id, name) VALUES (%s, 'patient', %s, %s)",
            (email, patient_id, name)
        )
        email_service.send_patient_id(email, name, patient_id)
        return jsonify({'success': True, 'patient_id': patient_id})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/staff/upload-report', methods=['POST'])
def upload_report():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    patient_id = request.form.get('patient_id')
    report_title = request.form.get('report_title')
    file = request.files.get('report_file')
    
    if not file or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    
    filename = secure_filename(file.filename)
    unique_filename = f"{patient_id}_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
    file.save(filepath)
    
    db.execute_query(
        "INSERT INTO reports (patient_id, report_title, report_file_path, report_date) VALUES (%s, %s, %s, %s)",
        (patient_id, report_title, unique_filename, datetime.datetime.now().date())
    )
    
    patient = db.fetch_one("SELECT email, name FROM users WHERE patient_id=%s", (patient_id,))
    if patient:
        email_service.send_report_uploaded(patient['email'], patient['name'], report_title)
    
    return jsonify({'success': True})

@app.route('/api/staff/delete-report/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    report = db.fetch_one("SELECT report_file_path FROM reports WHERE id=%s", (report_id,))
    if report and report['report_file_path']:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], report['report_file_path'])
        if os.path.exists(filepath):
            os.remove(filepath)
    
    db.execute_query("DELETE FROM ai_summaries WHERE report_id=%s", (report_id,))
    db.execute_query("DELETE FROM reports WHERE id=%s", (report_id,))
    
    return jsonify({'success': True})

@app.route('/api/staff/delete-patient/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    reports = db.fetch_all("SELECT report_file_path FROM reports WHERE patient_id=%s", (patient_id,))
    for report in reports:
        if report['report_file_path']:
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], report['report_file_path'])
            if os.path.exists(filepath):
                os.remove(filepath)
    
    db.execute_query("DELETE FROM reports WHERE patient_id=%s", (patient_id,))
    db.execute_query("DELETE FROM users WHERE patient_id=%s", (patient_id,))
    return jsonify({'success': True})

@app.route('/api/staff/patient-reports/<patient_id>', methods=['GET'])
def get_patient_reports(patient_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    reports = db.fetch_all(
        "SELECT * FROM reports WHERE patient_id=%s ORDER BY upload_date DESC",
        (patient_id,)
    )
    return jsonify({'reports': reports})

# ==================== SETTINGS API ROUTES ====================

@app.route('/api/staff/settings', methods=['GET'])
def get_staff_settings():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    settings = settings_manager.get_all_settings()  # ← USE INSTANCE
    return jsonify(settings)

@app.route('/api/staff/settings', methods=['POST'])
def update_staff_settings():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'staff':
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    for key, value in data.items():
        settings_manager.update_setting(key, 'true' if value else 'false')  # ← USE INSTANCE
    
    return jsonify({'success': True})

@app.route('/api/patient/settings', methods=['GET'])
def get_patient_settings():
    """Get settings for patient view"""
    settings = settings_manager.get_all_settings()  # ← USE INSTANCE
    return jsonify({
        'ai_summary_enabled': settings.get('ai_summary_enabled', 'true') == 'true',
        'chatbot_enabled': settings.get('chatbot_enabled', 'true') == 'true'
    })

# ==================== PATIENT API ROUTES ====================

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
        email_service.send_otp(email, otp)
        return jsonify({'success': True, 'temp_token': generate_jwt(user['id'], 'temp')})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/patient/verify-otp', methods=['POST'])
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
        token = generate_jwt(user['id'], 'patient')
        return jsonify({
            'success': True,
            'token': token,
            'user': {'id': user['id'], 'name': user['name'], 'patient_id': user['patient_id']}
        })
    
    return jsonify({'error': 'Invalid OTP'}), 401

@app.route('/api/patient/resend-otp', methods=['POST'])
def resend_otp():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = db.fetch_one("SELECT * FROM users WHERE id=%s", (payload['user_id'],))
    if user:
        otp = generate_otp()
        expires_at = datetime.datetime.now() + datetime.timedelta(minutes=10)
        db.execute_query(
            "INSERT INTO otp_codes (email, otp_code, expires_at) VALUES (%s, %s, %s)",
            (user['email'], otp, expires_at)
        )
        email_service.send_otp(user['email'], otp)
        return jsonify({'success': True})
    
    return jsonify({'error': 'Failed to resend OTP'}), 400

@app.route('/api/patient/dashboard', methods=['GET'])
def patient_dashboard():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'patient':
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = db.fetch_one("SELECT * FROM users WHERE id=%s", (payload['user_id'],))
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    reports = db.fetch_all(
        """SELECT r.*, 
           CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END as has_summary 
           FROM reports r 
           LEFT JOIN ai_summaries a ON r.id = a.report_id 
           WHERE r.patient_id=%s 
           ORDER BY r.upload_date DESC""",
        (user['patient_id'],)
    )
    
    return jsonify({
        'patient': {'name': user['name'], 'patient_id': user['patient_id']},
        'reports': reports
    })

@app.route('/api/patient/report/<int:report_id>', methods=['GET'])
def get_report(report_id):
    report = db.fetch_one("SELECT * FROM reports WHERE id=%s", (report_id,))
    summary = db.fetch_one("SELECT * FROM ai_summaries WHERE report_id=%s", (report_id,))
    return jsonify({'report': report, 'summary': summary})

@app.route('/api/patient/generate-summary/<int:report_id>', methods=['POST'])
def generate_summary(report_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'patient':
        return jsonify({'error': 'Unauthorized'}), 401
    
    existing = db.fetch_one("SELECT id FROM ai_summaries WHERE report_id=%s", (report_id,))
    if existing:
        return jsonify({'error': 'Summary already exists'}), 400
    
    report = db.fetch_one("SELECT * FROM reports WHERE id=%s", (report_id,))
    if not report:
        return jsonify({'error': 'Report not found'}), 404
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], report['report_file_path'])
    text = extract_text_from_file(filepath)
    
    if not text or len(text.strip()) < 50:
        return jsonify({'error': 'Could not extract enough text from the report'}), 400
    
    summary = AIServices.generate_summary(text, report['report_title'])
    voice_path = AIServices.generate_voice_summary(summary, report_id)
    
    db.execute_query(
        "INSERT INTO ai_summaries (report_id, summary_text, summary_voice_path) VALUES (%s, %s, %s)",
        (report_id, summary, voice_path)
    )
    
    return jsonify({'success': True, 'summary': summary})

@app.route('/api/patient/chatbot', methods=['POST'])
def chatbot():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Unauthorized'}), 401
    
    token = auth_header.replace('Bearer ', '')
    payload = verify_jwt(token)
    
    if not payload or payload.get('user_type') != 'patient':
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    question = data.get('question')
    report_id = data.get('report_id')
    
    report = db.fetch_one("SELECT * FROM reports WHERE id=%s", (report_id,))
    if not report:
        return jsonify({'error': 'Report not found'}), 404
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], report['report_file_path'])
    text = extract_text_from_file(filepath)
    
    answer = AIServices.chatbot_response(question, text, report['report_title'])
    return jsonify({'answer': answer})

@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/static/audio/<path:filename>')
def serve_audio(filename):
    return send_from_directory('static/audio', filename)

# ==================== MAIN ====================

if __name__ == '__main__':
    import datetime
    db.connect()
    print("=" * 50)
    print("🚀 SMART REPORT SYSTEM BACKEND")
    print("📍 Running on http://localhost:5000")
    print("=" * 50)
    app.run(host='0.0.0.0', port=5000, debug=True)