import os
import datetime
from werkzeug.utils import secure_filename
from database import Database
from ai_services import AIServices
from config import Config

class ReportManager:
    def __init__(self):
        self.db = Database()
        self.upload_folder = 'uploads'
    
    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf', 'png', 'jpg', 'jpeg'}
    
    def upload_report(self, patient_id, report_title, file):
        if not file or not self.allowed_file(file.filename):
            return {'error': 'Invalid file type'}
        
        os.makedirs(self.upload_folder, exist_ok=True)
        
        filename = secure_filename(file.filename)
        unique_filename = f"{patient_id}_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
        filepath = os.path.join(self.upload_folder, unique_filename)
        file.save(filepath)
        
        query = """
            INSERT INTO reports (patient_id, report_title, report_file_path, report_date) 
            VALUES (%s, %s, %s, %s)
        """
        self.db.execute_query(query, (patient_id, report_title, unique_filename, datetime.datetime.now().date()))
        
        report = self.db.fetch_one(
            "SELECT id FROM reports WHERE patient_id=%s ORDER BY upload_date DESC LIMIT 1",
            (patient_id,)
        )
        
        return {'success': True, 'report_id': report['id'] if report else None}
    
    def get_report(self, report_id):
        return self.db.fetch_one("SELECT * FROM reports WHERE id=%s", (report_id,))
    
    def delete_report(self, report_id):
        report = self.db.fetch_one("SELECT report_file_path FROM reports WHERE id=%s", (report_id,))
        if report and report['report_file_path']:
            filepath = os.path.join(self.upload_folder, report['report_file_path'])
            if os.path.exists(filepath):
                os.remove(filepath)
        
        self.db.execute_query("DELETE FROM reports WHERE id=%s", (report_id,))
        return {'success': True}
    
    def get_patient_reports(self, patient_id):
        return self.db.fetch_all("SELECT * FROM reports WHERE patient_id=%s ORDER BY upload_date DESC", (patient_id,))