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

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      `SELECT patient_id, name, email, created_at 
       FROM users 
       WHERE user_type = 'patient' 
       ORDER BY created_at DESC`
    );
    
    connection.release();
    
    return NextResponse.json({ patients: rows });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}