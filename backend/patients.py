from database import Database
from auth import Auth
from email_service import EmailService

class PatientManager:
    def __init__(self):
        self.db = Database()
        self.email_service = EmailService()
    
    def create_patient(self, name, email):
        patient_id = Auth.generate_patient_id()
        
        query = """
            INSERT INTO users (email, user_type, patient_id, name) 
            VALUES (%s, 'patient', %s, %s)
        """
        self.db.execute_query(query, (email, patient_id, name))
        
        # Send email with Patient ID
        self.email_service.send_patient_id(email, name, patient_id)
        
        return {
            'success': True,
            'patient_id': patient_id,
            'name': name,
            'email': email
        }
    
    def get_all_patients(self):
        query = "SELECT * FROM users WHERE user_type='patient' ORDER BY created_at DESC"
        return self.db.fetch_all(query)
    
    def get_patient_by_id(self, patient_id):
        query = "SELECT * FROM users WHERE patient_id=%s AND user_type='patient'"
        return self.db.fetch_one(query, (patient_id,))
    
    def delete_patient(self, patient_id):
        # Delete reports first
        self.db.execute_query("DELETE FROM reports WHERE patient_id=%s", (patient_id,))
        query = "DELETE FROM users WHERE patient_id=%s AND user_type='patient'"
        self.db.execute_query(query, (patient_id,))
        return {'success': True}
    
    def get_patient_reports(self, patient_id):
        query = """
            SELECT r.*, 
                   CASE WHEN a.id IS NOT NULL THEN 1 ELSE 0 END as has_summary 
            FROM reports r 
            LEFT JOIN ai_summaries a ON r.id = a.report_id 
            WHERE r.patient_id=%s 
            ORDER BY r.upload_date DESC
        """
        return self.db.fetch_all(query, (patient_id,))