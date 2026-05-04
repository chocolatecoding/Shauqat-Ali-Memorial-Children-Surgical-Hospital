import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('MAIL_PORT', 587))
        self.username = os.getenv('MAIL_USERNAME', '')
        self.password = os.getenv('MAIL_PASSWORD', '')
    
    def send_email(self, to_email, subject, body):
        if not self.username or not self.password:
            print(f"\n📧 EMAIL (Not sent - configure email in .env):")
            print(f"   To: {to_email}")
            print(f"   Subject: {subject}")
            print(f"   Body: {body}\n")
            return True
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.username
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'plain'))
            
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)
            server.quit()
            
            print(f"✅ Email sent to {to_email}")
            return True
        except Exception as e:
            print(f"❌ Email error: {e}")
            return False
    
    def send_patient_id(self, to_email, name, patient_id):
        subject = "Your Patient ID - Smart Report System"
        body = f"""Dear {name},

Your account has been created successfully.

Patient ID: {patient_id}

You can login using your email and this Patient ID.

Login URL: http://localhost:3000/patient/login

Thank you,
Smart Report System"""
        return self.send_email(to_email, subject, body)
    
    def send_otp(self, to_email, otp):
        subject = "Your Login OTP - Smart Report System"
        body = f"""Your OTP code is: {otp}

This code will expire in 10 minutes.

Never share this code with anyone.

Thank you,
Smart Report System"""
        return self.send_email(to_email, subject, body)
    
    def send_report_uploaded(self, to_email, name, report_title):
        subject = "New Report Uploaded - Smart Report System"
        body = f"""Dear {name},

A new report has been uploaded to your account.

Report Title: {report_title}

Login to view your report: http://localhost:3000/patient/login

Thank you,
Smart Report System"""
        return self.send_email(to_email, subject, body)