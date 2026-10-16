import { NextResponse } from 'next/server';
import db from '@/lib/db';

let tableReady = false;
async function ensureBookingsTable() {
  if (tableReady) return;
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS offline_counsellor_bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_ref VARCHAR(32) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        preferred_date VARCHAR(50) NULL,
        notes TEXT NULL,
        status VARCHAR(32) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    tableReady = true;
  } catch (err) {
    console.warn('[Offline Counsellor DB Init]', err?.message || err);
  }
}

export async function GET(req) {
  try {
    await ensureBookingsTable();
    const [rows] = await db.query(
      `SELECT * FROM offline_counsellor_bookings ORDER BY created_at DESC`
    );
    return NextResponse.json({
      success: true,
      bookings: rows || [],
      count: rows?.length || 0
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offline counsellor bookings', bookings: [] },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, preferredDate, notes } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and email address are required.' },
        { status: 400 }
      );
    }

    const bookingRef = `GU-OC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    await ensureBookingsTable();
    try {
      await db.execute(
        `INSERT INTO offline_counsellor_bookings (booking_ref, name, phone, email, preferred_date, notes) VALUES (?, ?, ?, ?, ?, ?)`,
        [bookingRef, name.trim(), phone.trim(), email.trim(), preferredDate || null, notes || null]
      );
    } catch (err) {
      console.warn('[Offline Counsellor Booking DB Insert]', err?.message || err);
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      message: 'Your offline counselling session has been scheduled successfully.',
      details: {
        name,
        phone,
        email,
        preferredDate: preferredDate || 'Flexible / Next Available',
        location: 'Career Advisory & Admissions Block, Geeta University Campus, Panipat-Delhi NCR',
      }
    });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing booking.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Booking ID is required' }, { status: 400 });
    }

    await ensureBookingsTable();

    const updates = [];
    const values = [];
    if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      values.push(notes);
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    await db.execute(
      `UPDATE offline_counsellor_bookings SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true, message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Update Booking Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Booking ID is required' }, { status: 400 });
    }

    await ensureBookingsTable();
    await db.execute(`DELETE FROM offline_counsellor_bookings WHERE id = ?`, [id]);

    return NextResponse.json({ success: true, message: 'Booking removed successfully' });
  } catch (error) {
    console.error('Delete Booking Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
