import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function POST(request) {
  try {
    const submission = await request.json();

    const newRecordForDB = {
        name: submission.name,
        dob: submission.dob,
        course: submission.course,
        married: submission.married ? 1 : 0,
        education: submission.education,
        religion: submission.religion,
        gender: submission.gender,
        email: submission.email,
        phone: submission.phone,
        occupation: submission.occupation,
        institution: submission.institution,
        rural_or_urban: submission.rural_or_urban,
        test_name: submission.test_name,
        score: submission.score,
        result: typeof submission.result === 'string' ? submission.result : JSON.stringify(submission.result)
    };

    const sql = `
        INSERT INTO submissions 
        (name, dob, course, married, education, religion, gender, email, phone, occupation, institution, rural_or_urban, test_name, score, result, timestamp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    await db.execute(sql, Object.values(newRecordForDB));

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Submission Details</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #e0e0e0;" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <h2 style="color: #841844; font-size: 20px; margin-bottom: 10px;">Your Geeta Personality Test Submission Details</h2>
          <table width="100%" cellpadding="8" cellspacing="0">
            <tr><td><strong>Name:</strong></td><td>${submission.name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${submission.email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${submission.phone}</td></tr>
            <tr><td><strong>Gender:</strong></td><td>${submission.gender}</td></tr>
            <tr><td><strong>Date of Birth:</strong></td><td>${new Date(submission.dob).toLocaleDateString()}</td></tr>
            <tr><td><strong>Test Name:</strong></td><td>${submission.test_name}</td></tr>
            <tr><td><strong>Score:</strong></td><td style="font-size: 28px; color: #16a34a; font-weight: bold;">${submission.score}</td></tr>
          </table>
          <p style="font-size: 13px; color: #888; margin-top: 20px;">Thank you for participating in the test. — Geeta Personality Portal</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

        const mailOptions = {
            from: `"Geeta Personality Portal" <${process.env.EMAIL_USER}>`,
            to: submission.email,
            subject: 'Your Geeta Personality Test Submission',
            html: htmlTemplate
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (mailError) {
            console.error('Error sending email:', mailError);
        }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error in submit-details:', error);
    return NextResponse.json({ error: 'Failed to submit details' }, { status: 500 });
  }
}
