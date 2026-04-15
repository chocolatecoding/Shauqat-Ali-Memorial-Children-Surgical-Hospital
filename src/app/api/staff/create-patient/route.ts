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

// Generate unique patient ID
function generatePatientId(): string {
  const prefix = 'PAT';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    const patientId = generatePatientId();
    const connection = await pool.getConnection();
    
    // Check if email already exists
    const [existing] = await connection.execute(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );
    
    if ((existing as any[]).length > 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    // Insert new patient
    await connection.execute(
      `INSERT INTO users (email, user_type, patient_id, name) 
       VALUES (?, 'patient', ?, ?)`,
      [email, patientId, name]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      patient_id: patientId,
      message: 'Patient created successfully'
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}