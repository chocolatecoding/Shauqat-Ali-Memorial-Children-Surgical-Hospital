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

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params;
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      `SELECT id, report_title, report_file_path, upload_date 
       FROM reports 
       WHERE patient_id = ? 
       ORDER BY upload_date DESC`,
      [patientId]
    );
    
    connection.release();
    
    return NextResponse.json({ reports: rows });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}