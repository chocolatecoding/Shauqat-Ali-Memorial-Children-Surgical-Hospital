import pytesseract
from PIL import Image
import openai
from gtts import gTTS
import os
import PyPDF2
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class AIServices:
    def __init__(self):
        self.api_key = None
        print("✅ AI Services Initialized")
    
    def set_openai_key(self, key):
        self.api_key = key
        openai.api_key = key
        print(f"✅ OpenAI API Key Set!")
        return True
    
    def extract_text_from_pdf(self, pdf_path):
        try:
            text = ""
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            return text
        except Exception as e:
            print(f"PDF Error: {e}")
            return ""
    
    def generate_summary(self, text, report_title="Medical Report"):
        if not self.api_key:
            return "OpenAI API key not configured."
        
        prompt = f"""Summarize this medical report in simple language:

Report: {text[:2000]}

Provide a clear, easy-to-understand summary."""
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a medical assistant explaining reports simply."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI Error: {e}")
            return "Unable to generate summary."
    
    def generate_voice_summary(self, text, report_id):
        try:
            filename = f"summary_{report_id}.mp3"
            filepath = os.path.join('frontend', 'static', 'audio', filename)
            os.makedirs(os.path.join('frontend', 'static', 'audio'), exist_ok=True)
            tts = gTTS(text=text[:500], lang='en', slow=False)
            tts.save(filepath)
            return filename
        except Exception as e:
            print(f"TTS Error: {e}")
            return None