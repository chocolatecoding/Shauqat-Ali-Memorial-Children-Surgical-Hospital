import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.host = os.getenv('DB_HOST', 'localhost')
        self.user = os.getenv('DB_USER', 'root')
        self.password = os.getenv('DB_PASSWORD', '')
        self.database = os.getenv('DB_NAME', 'smart_report_system')
        self.connection = None
    
    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            print("✅ Database connected successfully")
            return self.connection
        except Error as e:
            print(f"❌ Database connection error: {e}")
            return None
    
    def execute_query(self, query, params=None):
        if not self.connection or not self.connection.is_connected():
            self.connect()
        cursor = self.connection.cursor(dictionary=True)
        cursor.execute(query, params or ())
        self.connection.commit()
        return cursor
    
    def fetch_all(self, query, params=None):
        if not self.connection or not self.connection.is_connected():
            self.connect()
        cursor = self.connection.cursor(dictionary=True)
        cursor.execute(query, params or ())
        return cursor.fetchall()
    
    def fetch_one(self, query, params=None):
        if not self.connection or not self.connection.is_connected():
            self.connect()
        cursor = self.connection.cursor(dictionary=True)
        cursor.execute(query, params or ())
        return cursor.fetchone()