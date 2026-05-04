from database import Database


class SettingsManager:
    def __init__(self):
        self.db = Database()
        self._ensure_settings_table()
    
    def _ensure_settings_table(self):
        query = """
            CREATE TABLE IF NOT EXISTS settings (
                id INT PRIMARY KEY AUTO_INCREMENT,
                setting_key VARCHAR(100) UNIQUE NOT NULL,
                setting_value VARCHAR(50) NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """
        self.db.execute_query(query)
        
        defaults = [
            ('ai_summary_enabled', 'true'), 
            ('chatbot_enabled', 'true'),
            ('auto_summary', 'false')
        ]
        for key, value in defaults:
            self.db.execute_query(
                "INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (%s, %s)",
                (key, value)
            )
    
    def get_all_settings(self):
        results = self.db.fetch_all("SELECT setting_key, setting_value FROM settings")
        return {row['setting_key']: row['setting_value'] for row in results}
    
    def get_setting(self, key, default='true'):
        result = self.db.fetch_one("SELECT setting_value FROM settings WHERE setting_key=%s", (key,))
        if result:
            return result['setting_value']
        return default
    
    def update_setting(self, key, value):
        self.db.execute_query(
            "UPDATE settings SET setting_value=%s WHERE setting_key=%s",
            (value, key)
        )
        return {'success': True}