import hashlib
import random
import datetime
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv('JWT_SECRET', 'smart-report-secret-key-2026')

class Auth:
    @staticmethod
    def hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()
    
    @staticmethod
    def verify_password(password, hashed):
        return Auth.hash_password(password) == hashed
    
    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))
    
    @staticmethod
    def generate_patient_id():
        return f"PAT{random.randint(10000, 99999)}{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    @staticmethod
    def generate_jwt(user_id, user_type):
        payload = {
            'user_id': user_id,
            'user_type': user_type,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
        }
        return jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    
    @staticmethod
    def verify_jwt(token):
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            return payload
        except Exception as e:
            print(f"JWT verification error: {e}")
            return None