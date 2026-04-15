import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_report_system',
  waitForConnections: true,
  connectionLimit: 10,
});

// GET settings
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    // Get AI summary setting
    const [aiRows] = await connection.execute(
      "SELECT setting_value FROM settings WHERE setting_key = 'ai_summary'"
    );
    
    // Get chatbot setting
    const [chatbotRows] = await connection.execute(
      "SELECT setting_value FROM settings WHERE setting_key = 'chatbot'"
    );
    
    connection.release();
    
    const ai_summary = (aiRows as any[])[0]?.setting_value || 'false';
    const chatbot = (chatbotRows as any[])[0]?.setting_value || 'false';
    
    return NextResponse.json({ ai_summary, chatbot });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { ai_summary: 'false', chatbot: 'false' },
      { status: 200 }
    );
  }
}

// POST update settings
export async function POST(request: Request) {
  try {
    const { ai_summary, chatbot } = await request.json();
    
    const connection = await pool.getConnection();
    
    // Update or insert AI summary setting
    await connection.execute(
      `INSERT INTO settings (setting_key, setting_value) 
       VALUES ('ai_summary', ?) 
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [ai_summary ? 'true' : 'false']
    );
    
    // Update or insert chatbot setting
    await connection.execute(
      `INSERT INTO settings (setting_key, setting_value) 
       VALUES ('chatbot', ?) 
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [chatbot ? 'true' : 'false']
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully'
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}