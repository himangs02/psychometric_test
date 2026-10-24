import { NextResponse } from 'next/server';
import db from '@/lib/db';

let tableReady = false;

async function ensureAdminsTable() {
  if (tableReady) return;
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    tableReady = true;
  } catch (err) {
    console.warn('[Admins DB Init]', err?.message || err);
  }
}

export async function POST(req) {
  try {
    await ensureAdminsTable();

    const body = await req.json();
    const { email, password } = body || {};

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Query admin user by email from the database
    const [rows] = await db.query(
      `SELECT id, email, password, name, role FROM admins WHERE LOWER(TRIM(email)) = ? LIMIT 1`,
      [cleanEmail]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const admin = rows[0];

    // Verify password against the database record
    if (admin.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Error during admin authentication:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication service error. Please try again.' },
      { status: 500 }
    );
  }
}
