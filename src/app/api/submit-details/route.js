import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

let schemaReady;

async function ensureSchema() {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS submission_responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT NOT NULL,
        question_number INT NULL,
        section_label VARCHAR(50) NULL,
        question_text TEXT NULL,
        selected_value TEXT NULL,
        score_value DECIMAL(10,2) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_submission_id (submission_id)
      )
    `);

    const [columns] = await db.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'submissions'
    `);
    const names = new Set(columns.map((c) => c.COLUMN_NAME));
    if (!names.has('responses')) await db.execute(`ALTER TABLE submissions ADD COLUMN responses LONGTEXT NULL`);
    if (!names.has('state')) await db.execute(`ALTER TABLE submissions ADD COLUMN state VARCHAR(255) NULL`);
    return true;
  })().catch((error) => {
    schemaReady = null;
    throw error;
  });
  return schemaReady;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

export async function POST(request) {
  try {
    const submission = await request.json();
    await ensureSchema();

    const resultJson = typeof submission.result === 'string' ? submission.result : JSON.stringify(submission.result ?? {});
    const responsesJson = JSON.stringify(submission.responses ?? []);

    const sql = `
      INSERT INTO submissions
      (name, dob, course, married, education, religion, gender, email, phone, occupation, institution, city, state, rural_or_urban, test_name, score, result, responses, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
      submission.name || null,
      submission.dob || null,
      submission.course || null,
      submission.married ? 1 : 0,
      submission.education || '',
      submission.religion || 'not-specified',
      submission.gender || null,
      submission.email || null,
      submission.phone || null,
      submission.occupation || '',
      submission.institution || null,
      submission.city || null,
      submission.state || null,
      submission.rural_or_urban || 'not-specified',
      submission.test_name || null,
      Number(submission.score || 0),
      resultJson,
      responsesJson,
    ];

    const [insertResult] = await db.execute(sql, values);
    const submissionId = insertResult.insertId;

    // Store every response separately as well as preserving the complete raw response payload.
    // This makes later reporting/exporting possible without reparsing the assessment result.
    const responses = submission.responses;
    const rows = [];
    if (Array.isArray(responses)) {
      if (submission.test_key === 'belbin') {
        responses.forEach((section, sectionIndex) => {
          (section || []).forEach((value, itemIndex) => {
            rows.push([submissionId, itemIndex + 1, String.fromCharCode(65 + sectionIndex), `Belbin Section ${String.fromCharCode(65 + sectionIndex)} - Statement ${itemIndex + 1}`, String(value ?? 0), Number(value ?? 0)]);
          });
        });
      } else {
        responses.forEach((value, index) => {
          rows.push([submissionId, index + 1, null, null, typeof value === 'object' ? JSON.stringify(value) : String(value ?? ''), Number(value) || null]);
        });
      }
    }
    if (rows.length) {
      await db.query(
        `INSERT INTO submission_responses (submission_id, question_number, section_label, question_text, selected_value, score_value) VALUES ?`,
        [rows]
      );
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && submission.email) {
      const result = typeof submission.result === 'object' ? submission.result : null;
      const resultTitle = result?.title || result?.typeName || submission.test_name;
      const resultDescription = result?.description || '';
      const extra = result?.type ? `<p><strong>Profile:</strong> ${escapeHtml(result.type)}${result.typeName ? ` — ${escapeHtml(result.typeName)}` : ''}</p>` :
        result?.primaryRole ? `<p><strong>Primary Team Role:</strong> ${escapeHtml(result.primaryRole.name)}<br/><strong>Secondary Team Role:</strong> ${escapeHtml(result.secondaryRole?.name)}</p>` :
        result?.dominantNeed ? `<p><strong>Dominant Motivation:</strong> ${escapeHtml(result.dominantNeed.name)}<br/><strong>Secondary Motivation:</strong> ${escapeHtml(result.secondaryNeed?.name)}</p>` : '';

      const htmlTemplate = `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;"><table style="max-width:650px;margin:auto;background:#fff;border-radius:8px;padding:20px;border:1px solid #e0e0e0" cellpadding="0" cellspacing="0"><tr><td><h2 style="color:#841844">Your Geeta Personality Test Result</h2><p>Dear ${escapeHtml(submission.name)},</p><p>Your assessment has been completed successfully.</p><table width="100%" cellpadding="8" cellspacing="0"><tr><td><strong>Test</strong></td><td>${escapeHtml(submission.test_name)}</td></tr><tr><td><strong>Score</strong></td><td style="font-size:28px;color:#841844;font-weight:bold">${escapeHtml(submission.score)}</td></tr><tr><td><strong>Result</strong></td><td>${escapeHtml(resultTitle)}</td></tr></table>${extra}<p style="line-height:1.6;color:#444">${escapeHtml(resultDescription)}</p><p style="font-size:13px;color:#888;margin-top:20px">Thank you for participating. — Geeta Personality Portal</p></td></tr></table></body></html>`;

      try {
        await transporter.sendMail({
          from: `"Geeta Personality Portal" <${process.env.EMAIL_USER}>`,
          to: submission.email,
          subject: `Your ${submission.test_name} Result`,
          html: htmlTemplate
        });
      } catch (mailError) {
        console.error('Error sending email:', mailError);
      }
    }

    return NextResponse.json({ success: true, submissionId }, { status: 201 });
  } catch (error) {
    console.error('Error in submit-details:', error);
    return NextResponse.json({ error: 'Failed to submit details', details: error.message }, { status: 500 });
  }
}
