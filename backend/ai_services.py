import openai
import os
from dotenv import load_dotenv
from gtts import gTTS

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY', '')

class AIServices:
    
    @staticmethod
    def generate_summary(report_text, report_title="Medical Report"):
        """Generate AI summary of medical report"""
        if not openai.api_key:
            return "OpenAI API key not configured. Please add your API key to enable AI summaries."
        
        try:
            prompt = f"""You are a medical assistant. Explain this medical report in simple, easy-to-understand language.

Report Title: {report_title}
Report Content: {report_text[:3000]}

Please provide:
1. A simple summary of what this report shows
2. Highlight any abnormal values or concerns
3. Explain what the patient should know

Keep the language simple and helpful. Do not provide medical advice."""
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful medical assistant. Explain medical reports in simple language."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI error: {e}")
            return f"Unable to generate summary at this time. Error: {str(e)}"
    
    @staticmethod
    def chatbot_response(question, report_text, report_title="Medical Report"):
        """Answer patient questions about their medical report"""
        if not openai.api_key:
            return "OpenAI API key not configured. Please contact hospital staff for medical questions."
        
        try:
            prompt = f"""You are a helpful medical assistant. Answer the patient's question based ONLY on their medical report.

Report Title: {report_title}
Report Content: {report_text[:2000]}

Patient Question: {question}

Instructions:
1. Answer based only on the information in the report
2. Use simple, easy-to-understand language
3. If the answer is not in the report, say so honestly
4. Be helpful but cautious - do not provide medical advice
5. Suggest consulting a doctor for serious concerns

Answer:"""
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful medical assistant. Answer questions based only on the medical report provided."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Chatbot error: {e}")
            return "I'm having trouble answering right now. Please try again later or contact hospital staff for help."
    
    @staticmethod
    def generate_voice_summary(text, report_id):
        """Generate voice summary MP3 file"""
        try:
            filename = f"summary_{report_id}.mp3"
            filepath = os.path.join('static', 'audio', filename)
            os.makedirs(os.path.join('static', 'audio'), exist_ok=True)
            
            clean_text = text.replace('*', '').replace('#', '').replace('_', '')[:500]
            tts = gTTS(text=clean_text, lang='en', slow=False)
            tts.save(filepath)
            return f"/static/audio/{filename}"
        except Exception as e:
            print(f"TTS error: {e}")
            return None