import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_report_system',
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const patientId = formData.get('patient_id') as string;
    const reportTitle = formData.get('report_title') as string;
    const reportFile = formData.get('report_file') as File;
    
    if (!patientId || !reportTitle || !reportFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'reports');
    await mkdir(uploadDir, { recursive: true });
    
    // Save file
    const fileExtension = reportFile.name.split('.').pop();
    const fileName = `${Date.now()}_${patientId}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await reportFile.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // Save to database
    const connection = await pool.getConnection();
    const reportDate = new Date().toISOString().split('T')[0];
    
    await connection.execute(
      `INSERT INTO reports (patient_id, report_title, report_file_path, report_date, status) 
       VALUES (?, ?, ?, ?, 'pending')`,
      [patientId, reportTitle, `/uploads/reports/${fileName}`, reportDate]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: 'Report uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading report:', error);
    return NextResponse.json(
      { error: 'Failed to upload report' },
      { status: 500 }
    );
  }
}