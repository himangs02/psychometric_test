import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { generateGeminiCounsellorResponse } from '@/lib/counsellor/geminiCounsellor';
import { createInitialProfile } from '@/lib/counsellor/studentProfileExtractor';

// Auto-initialize tables in database if they don't exist
let tablesInitialized = false;
async function ensureTables() {
  if (tablesInitialized) return;
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS counselling_sessions (
        id VARCHAR(64) PRIMARY KEY,
        student_id VARCHAR(64) NULL,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP NULL,
        status VARCHAR(32) DEFAULT 'active',
        conversation_summary JSON NULL,
        confidence_level VARCHAR(32) NULL,
        confusion_level VARCHAR(32) NULL,
        assessment_recommended BOOLEAN DEFAULT FALSE,
        recommendation_reason TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS counselling_messages (
        id VARCHAR(64) PRIMARY KEY,
        session_id VARCHAR(64) NOT NULL,
        sender VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        metadata JSON NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    tablesInitialized = true;
  } catch (err) {
    console.warn('[Counsellor DB] Table initialization check warning:', err?.message || err);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      message = '',
      conversationHistory = [],
      studentProfile = null,
      latestAssessmentResult = null,
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      studentId = null,
    } = body;

    const currentProfile = studentProfile || createInitialProfile();

    // Generate counsellor response through Google Gemini AI engine with multi-layer guardrails
    const engineResult = await generateGeminiCounsellorResponse({
      userMessage: message,
      conversationHistory,
      studentProfile: currentProfile,
      latestAssessmentResult,
    });

    const counsellorReply = engineResult.reply || "I'm listening. Tell me more about what you're thinking.";
    const updatedProfile = engineResult.updatedProfile || currentProfile;

    // Asynchronously try to persist session & message to MySQL without blocking response
    ensureTables().then(async () => {
      try {
        const assessmentRec = updatedProfile.needsAssessment === 'HIGH' || updatedProfile.needsAssessment === 'MEDIUM';
        
        // Upsert session
        await db.execute(
          `INSERT INTO counselling_sessions 
            (id, student_id, confidence_level, confusion_level, assessment_recommended, recommendation_reason, conversation_summary)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
            confidence_level = VALUES(confidence_level),
            confusion_level = VALUES(confusion_level),
            assessment_recommended = VALUES(assessment_recommended),
            recommendation_reason = VALUES(recommendation_reason),
            conversation_summary = VALUES(conversation_summary)`,
          [
            sessionId,
            studentId,
            updatedProfile.confidenceLevel || 'UNDECIDED',
            updatedProfile.confusionLevel || 'HIGH',
            assessmentRec ? 1 : 0,
            updatedProfile.needsAssessmentReason || null,
            JSON.stringify(engineResult.summaryCard || {}),
          ]
        );

        // Record student message
        if (message) {
          const studentMsgId = `msg_${Date.now()}_std`;
          await db.execute(
            `INSERT INTO counselling_messages (id, session_id, sender, message) VALUES (?, ?, 'student', ?)`,
            [studentMsgId, sessionId, message]
          );
        }

        // Record counsellor message
        const counsellorMsgId = `msg_${Date.now()}_ai`;
        await db.execute(
          `INSERT INTO counselling_messages (id, session_id, sender, message, metadata) VALUES (?, ?, 'counsellor', ?, ?)`,
          [
            counsellorMsgId,
            sessionId,
            counsellorReply,
            JSON.stringify({
              summaryCard: engineResult.summaryCard || null,
              recommendationCard: engineResult.recommendationCard || null,
              comparisonCard: engineResult.comparisonCard || null,
            }),
          ]
        );
      } catch (dbErr) {
        // Silently log; client has full state in localStorage/React state
        console.warn('[Counsellor DB Storage Non-fatal]', dbErr?.message || dbErr);
      }
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      sessionId,
      reply: counsellorReply,
      updatedProfile,
      summaryCard: engineResult.summaryCard || null,
      recommendationCard: engineResult.recommendationCard || null,
      comparisonCard: engineResult.comparisonCard || null,
      showInteractiveWhyModal: engineResult.showInteractiveWhyModal || false,
      suggestedChips: engineResult.suggestedChips || [],
    });
  } catch (error) {
    console.error('Counsellor API Error:', error);
    return NextResponse.json(
      {
        success: false,
        reply: "I had a momentary connection hiccup. Could you please share that once more?",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
