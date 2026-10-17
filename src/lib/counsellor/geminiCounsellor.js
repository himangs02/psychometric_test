// Dedicated Google Gemini AI Counsellor Service
// Powered by Google Gemini API Key with gemini-3.8-flash (fallback: gemini-3.5-flash) and multi-layer guardrails.
// Strictly restricted to Geeta University Psychometric Test platform and the 15 intelligence & psychometric tests.

import https from "https";
import { ALL_TESTS } from "@/components/tests/TestCardsData";
import { CAREER_DATABASE, POPULAR_COMPARISONS } from "./careerDatabase";
import { updateStudentProfile } from "./studentProfileExtractor";
import { generateCounsellorResponse as fallbackDeterministicEngine } from "./counsellorEngine";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash";

// Map of the 15 tests for instant lookup and card generation
export const PLATFORM_TESTS_MAP = ALL_TESTS.reduce((acc, test) => {
  acc[test.id] = test;
  return acc;
}, {});

// Standard polite refusal message when user asks about off-topic matters (weather, coding, trivia, etc.)
export const STANDARD_REFUSAL_MESSAGE = 
  "I am your dedicated **AI Career Counsellor** for the **Geeta University Psychometric Test platform**.\n\n" +
  "I am specifically trained and restricted to assist you with our platform features, career guidance, academic stream selection (Science, Commerce, Humanities), and our **15 standardized psychometric & intelligence assessments**.\n\n" +
  "I cannot answer questions about external topics such as weather, general coding/programming, sports, movies, or trivia.\n\n" +
  "Would you like guidance on choosing your career stream, or would you like to explore which of our 15 assessments fits your goals (like RIASEC, Howard Gardner Multiple Intelligence, MBTI, or EQ)?";

// Off-topic detection patterns (Layer 1 Guardrail)
const OFF_TOPIC_PATTERNS = [
  /\b(weather|forecast|temperature|climate|rain|humidity|monsoon)\b/i,
  /\b(write|create|generate|give me|implement|debug|solve)\s+(a\s+)?(code|python|java|c\+\+|javascript|sql|script|program|algorithm|html|css|react)\b/i,
  /\b(quicksort|mergesort|binary search|bubble sort|dijkstra|fibonacci|leetcode|hackerrank)\b/i,
  /\b(recipe|cook|bake|ingredients|dish|dinner|lunch|breakfast|pizza|burger)\b/i,
  /\b(cricket|football|fifa|ipl|world cup|match score|nba|messi|ronaldo|virat kohli)\b/i,
  /\b(movie|cinema|actor|actress|bollywood|hollywood|song|lyrics|album|netflix|trailer)\b/i,
  /\b(president|prime minister|election|parliament|bjp|congress|politics|political party|modi|trump)\b/i,
  /\b(tell me a joke|tell a story|write a poem|write an essay on|riddle|knock knock)\b/i,
  /\b(stock market today|crypto|bitcoin|ethereum price|gold rate)\b/i,
  /\b(capital of|population of|distance between|who is the king|history of rome)\b/i,
];

// Keywords indicating career / platform relevance
const ON_TOPIC_KEYWORDS = [
  "test", "career", "stream", "psychometric", "intelligence", "geeta", "university",
  "riasec", "gardner", "hgmi", "mbti", "belbin", "dweck", "mindset", "self-esteem",
  "rses", "aggression", "emotional", "eq", "wellbeing", "peer pressure", "entrepreneur",
  "achievement", "forgiveness", "mcclelland", "science", "commerce", "humanities",
  "arts", "pcm", "pcb", "engineering", "doctor", "medicine", "bba", "bca", "btech",
  "law", "design", "ui/ux", "data science", "course", "college", "confused",
  "guidance", "job", "future", "counsel", "offline", "report", "fitment",
  "score", "result", "recommend", "subject", "marks", "admission", "hello",
  "hi", "hey", "help", "who are you", "what can you do", "why take", "pricing", "fees", "cost", "free"
];

export function isQueryOffTopic(userText) {
  const text = (userText || "").toLowerCase().trim();
  if (!text) return false;

  // If text directly matches strong off-topic patterns
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(text)) {
      // Check if user is asking in a career context (e.g. "Do I need coding for Computer Science?")
      if (
        (text.includes("career") || text.includes("stream") || text.includes("course") || text.includes("test") || text.includes("job") || text.includes("study") || text.includes("field")) &&
        !text.includes("write") && !text.includes("generate") && !text.includes("quicksort")
      ) {
        return false;
      }
      return true;
    }
  }

  // Check if text has zero relevance to career, platform, or friendly greeting
  const words = text.split(/\s+/);
  if (words.length > 5) {
    const hasAnyOnTopic = ON_TOPIC_KEYWORDS.some((kw) => text.includes(kw));
    if (!hasAnyOnTopic) {
      // If none of the 40+ career/platform keywords match in a multi-word query, flag as off-topic
      return true;
    }
  }

  return false;
}

// Build comprehensive system prompt with all 15 tests and platform details
function buildSystemPrompt() {
  const testListFormatted = ALL_TESTS.map(
    (t, idx) =>
      `${idx + 1}. **${t.title}** (key: '${t.id}', category: '${t.category}', duration: '${t.duration}'): ${t.desc}`
  ).join("\n");

  return `You are the dedicated, empathetic, and knowledgeable AI Career Counsellor for the Geeta University Psychometric Test Platform.

### YOUR MANDATE & SCOPE:
Your sole and exclusive purpose is to assist students with:
1. Navigating the Geeta University Psychometric Test platform and portal features.
2. Understanding and taking the 15 scientifically calibrated psychometric & intelligence assessments available on our platform.
3. Guiding students on career paths, academic streams (Science PCM/PCB, Commerce, Humanities/Arts), degree programs, and comparing careers.
4. Interpreting test results and offering next steps, including booking 1-on-1 offline counselling at Geeta University.

### THE 15 TESTS AVAILABLE ON THE PLATFORM:
${testListFormatted}

### PLATFORM PRICING & TIERS:
- Free Insights Card (Free): Immediate preliminary summary of core strengths, interest archetypes, and broad recommendations.
- Career Fitment Report (₹595/-): Comprehensive 20+ page deep-dive report analyzing cognitive traits, personality fitment, strengths, watch-outs, and specific career role / degree alignments.
- Offline Counsellor Booking: Students who prefer face-to-face guidance can book an appointment with a senior academic counselor at Geeta University (Panipat / Delhi NCR) via the portal.

### STRICT SCOPE RESTRICTION & GUARDRAIL (CRITICAL):
- You MUST NEVER answer questions about weather, general coding/programming exercises (e.g. "write code in python", "implement quicksort"), sports, celebrities, movie reviews, current politics/elections, cooking recipes, general math homework solvers, or random trivia.
- If a user asks about ANY external topic that does not relate to our platform, our 15 tests, academic streams, or career guidance, YOU MUST POLITELY AND FIRMLY DECLINE.
- Refusal behavior: State with warmth and clarity that as the Geeta University AI Career Counsellor, you only provide guidance on the portal and the 15 assessments, and invite them back to discuss career directions, stream decisions, or taking a test.
- Do NOT provide partial answers to off-topic queries (e.g., do not say "The weather is rainy, but now let's talk about careers"). State the boundary directly and politely.

### CONVERSATIONAL STYLE:
- Warm, empathetic, non-judgmental, and structured.
- Use clean Markdown with bullet points, bold key terms, and concise paragraphs.
- Ensure every explanation is fully completed without leaving headings, sentences, or sections cut in half.
- When recommending a test, mention its exact name and why it fits the student's current confusion.
- Always conclude with an engaging question or invitation to explore a specific test or career aspect.`;
}

// Call Google Gemini generateContent REST API
async function callGeminiGenerateAPI({ contents, systemPrompt, model = PRIMARY_MODEL, temperature = 0.35, maxTokens = 3000 }) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
      timeout: 30000,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(body);
            const content = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (content) {
              resolve(content.trim());
            } else {
              reject(new Error("Empty text content in Gemini response"));
            }
          } catch (err) {
            reject(new Error(`Failed to parse Gemini response: ${err.message}`));
          }
        } else {
          reject(new Error(`Google Gemini API returned status ${res.statusCode}: ${body.slice(0, 200)}`));
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Google Gemini API request timed out"));
    });

    req.write(postData);
    req.end();
  });
}

// Helper to detect if a specific test from the 15 tests is recommended in the text
function extractRecommendedTest(text, userQuery) {
  const combined = (text + " " + userQuery).toLowerCase();
  
  if (combined.includes("riasec") || combined.includes("holland")) return "riasec";
  if (combined.includes("multiple intelligence") || combined.includes("gardner") || combined.includes("hgmi")) {
    if (combined.includes("hindi") || combined.includes("हिंदी") || combined.includes("बहु-बुद्धि")) {
      return "hgmi_hindi";
    }
    return "hgmi";
  }
  if (combined.includes("mbti") || combined.includes("myers-briggs") || combined.includes("16 personalities")) return "mbti";
  if (combined.includes("belbin") || combined.includes("team role")) return "belbin";
  if (combined.includes("dweck") || combined.includes("fixed mindset") || combined.includes("growth mindset")) return "dweck";
  if (combined.includes("rosenberg") || combined.includes("self-esteem") || combined.includes("rses")) return "rses";
  if (combined.includes("emotional intelligence") || combined.includes("eq test") || combined.includes("emotional scale")) return "emotional";
  if (combined.includes("aggression") || combined.includes("temper") || combined.includes("frustration")) return "aggression";
  if (combined.includes("well-being") || combined.includes("wellbeing") || combined.includes("mental health")) return "wellbeing";
  if (combined.includes("peer pressure") || combined.includes("social pressure")) return "peerpressure";
  if (combined.includes("entrepreneur") || combined.includes("startup") || combined.includes("business idea")) return "enterpreneurship";
  if (combined.includes("achievement motivation") || combined.includes("ambition")) return "achievement";
  if (combined.includes("forgiveness") || combined.includes("letting go") || combined.includes("resentment")) return "forgiveness";
  if (combined.includes("mcclelland") || combined.includes("power driver") || combined.includes("affiliation")) return "mcclelland";

  return null;
}

// Helper to detect career comparison intent and build comparison card
function extractCareerComparison(text) {
  const clean = text.toLowerCase();
  if (
    !clean.includes("compare") &&
    !clean.includes("versus") &&
    !clean.includes(" vs ") &&
    !clean.includes("difference between")
  ) {
    return null;
  }

  // Check popular comparisons
  for (const [key, comp] of Object.entries(POPULAR_COMPARISONS)) {
    const cardA = CAREER_DATABASE[comp.careerA];
    const cardB = CAREER_DATABASE[comp.careerB];
    if (!cardA || !cardB) continue;

    const hasA = clean.includes(cardA.title.toLowerCase()) || clean.includes(cardA.id.replace(/-/g, " "));
    const hasB = clean.includes(cardB.title.toLowerCase()) || clean.includes(cardB.id.replace(/-/g, " "));

    // Special aliases
    const csMatches = clean.includes("computer science") || clean.includes("software") || clean.includes("cs ") || clean.includes("cse");
    const uxMatches = clean.includes("ui") || clean.includes("ux") || clean.includes("design");
    const medMatches = clean.includes("medicine") || clean.includes("doctor") || clean.includes("mbbs");
    const bioMatches = clean.includes("biotech") || clean.includes("biotechnology");
    const dsMatches = clean.includes("data science") || clean.includes("ai");

    if (
      (key === "computer-science_vs_ui-ux-design" && csMatches && uxMatches) ||
      (key === "medicine_vs_biotechnology" && medMatches && bioMatches) ||
      (key === "computer-science_vs_data-science" && csMatches && dsMatches) ||
      (hasA && hasB)
    ) {
      return {
        titleA: cardA.title,
        titleB: cardB.title,
        rows: comp.comparisonRows,
        matchA: 90,
        matchB: 85,
        summary: comp.summaryNote,
      };
    }
  }

  return null;
}

// Generate contextual quick chips based on discussion
function generateSuggestedChips(testKey, comparisonCard, text) {
  if (testKey && PLATFORM_TESTS_MAP[testKey]) {
    const test = PLATFORM_TESTS_MAP[testKey];
    return [
      `🚀 Take the ${test.badge || test.title}`,
      "❓ What will this test reveal?",
      "⚖️ Compare with another test",
      "📞 Book Offline Counsellor",
    ];
  }

  if (comparisonCard) {
    return [
      "🎯 Which stream should I choose for this?",
      "🧪 Which test matches these careers?",
      "🎓 Talk about university courses",
      "💬 Ask another career question",
    ];
  }

  const clean = (text || "").toLowerCase();
  if (clean.includes("stream") || clean.includes("science") || clean.includes("commerce")) {
    return [
      "🔬 Tell me about Science (PCM vs PCB)",
      "📊 Tell me about Commerce careers",
      "🎨 Tell me about Humanities options",
      "🚀 Take the RIASEC Career Interest Test",
    ];
  }

  return [
    "🚀 Which test should I take first?",
    "🧠 Tell me about Multiple Intelligences",
    "💼 Tell me about RIASEC Career Test",
    "📞 Book 1-on-1 Offline Counsellor",
  ];
}

// Main entry point for generating AI Counsellor response via Google Gemini API
export async function generateGeminiCounsellorResponse({
  userMessage = "",
  conversationHistory = [],
  studentProfile = null,
  latestAssessmentResult = null,
}) {
  const userText = (userMessage || "").trim();
  const updatedProfile = updateStudentProfile(studentProfile, userText, conversationHistory);

  // -------------------------------------------------------------
  // GUARDRAIL LAYER 1: Pre-check for off-topic queries
  // -------------------------------------------------------------
  if (isQueryOffTopic(userText)) {
    return {
      reply: STANDARD_REFUSAL_MESSAGE,
      updatedProfile,
      summaryCard: null,
      recommendationCard: null,
      comparisonCard: null,
      suggestedChips: [
        "🚀 Which test is best for me?",
        "💼 Tell me about RIASEC test",
        "🧠 Multiple Intelligence Assessment",
        "📞 Book Offline Counsellor",
      ],
    };
  }

  // -------------------------------------------------------------
  // Build Conversation Messages for Google Gemini REST API
  // -------------------------------------------------------------
  const systemPrompt = buildSystemPrompt();
  const contents = [];

  // If there's latest assessment context, append to system prompt instructions or prepend as context
  let finalSystemPrompt = systemPrompt;
  if (latestAssessmentResult) {
    finalSystemPrompt += `\n\n### CURRENT STUDENT ASSESSMENT CONTEXT:
The student recently completed the assessment: "${latestAssessmentResult.testName || "Psychometric Test"}". 
Dominant category / score: ${latestAssessmentResult.dominantCategory || latestAssessmentResult.score || "Completed"}.
Summary of their result: ${latestAssessmentResult.summary || latestAssessmentResult.interpretation?.title || "Assessment successfully finished"}.
Keep this in mind if they ask about their results or next career steps.`;
  }

  // Inject recent conversation history (last 6 turns for prompt efficiency)
  const recentHistory = conversationHistory.slice(-6);
  for (const msg of recentHistory) {
    if (msg.sender === "student" && msg.text) {
      contents.push({ role: "user", parts: [{ text: msg.text }] });
    } else if (msg.sender === "counsellor" && msg.text) {
      contents.push({ role: "model", parts: [{ text: msg.text }] });
    }
  }

  // Add the current user query if not already the last item
  const lastContent = contents[contents.length - 1];
  if (!lastContent || lastContent.role !== "user" || lastContent.parts[0]?.text !== userText) {
    contents.push({ role: "user", parts: [{ text: userText }] });
  }

  // Consolidate consecutive turns with the same role (Gemini requires alternating roles)
  const consolidatedContents = [];
  for (const item of contents) {
    if (
      consolidatedContents.length > 0 &&
      consolidatedContents[consolidatedContents.length - 1].role === item.role
    ) {
      consolidatedContents[consolidatedContents.length - 1].parts[0].text += `\n${item.parts[0].text}`;
    } else {
      consolidatedContents.push({
        role: item.role,
        parts: [{ text: item.parts[0].text }],
      });
    }
  }

  // -------------------------------------------------------------
  // Invoke Google Gemini API with fallback model
  // -------------------------------------------------------------
  let aiReplyText = "";
  try {
    try {
      aiReplyText = await callGeminiGenerateAPI({
        contents: consolidatedContents,
        systemPrompt: finalSystemPrompt,
        model: PRIMARY_MODEL,
        temperature: 0.35,
        maxTokens: 3000,
      });
    } catch (primaryErr) {
      console.warn("[Gemini Counsellor] Primary model failed, trying fallback:", primaryErr.message);
      aiReplyText = await callGeminiGenerateAPI({
        contents: consolidatedContents,
        systemPrompt: finalSystemPrompt,
        model: FALLBACK_MODEL,
        temperature: 0.35,
        maxTokens: 3000,
      });
    }
  } catch (apiErr) {
    console.error("[Gemini Counsellor API Error]", apiErr.message);
    // Graceful fallback to deterministic engine so student never faces downtime
    const fallbackResult = fallbackDeterministicEngine({
      userMessage: userText,
      conversationHistory,
      studentProfile: updatedProfile,
      latestAssessmentResult,
    });
    return {
      ...fallbackResult,
      updatedProfile: fallbackResult.updatedProfile || updatedProfile,
    };
  }

  // -------------------------------------------------------------
  // GUARDRAIL LAYER 2: Post-generation safety verification
  // -------------------------------------------------------------
  if (
    aiReplyText.includes("```python") ||
    aiReplyText.includes("```javascript") ||
    aiReplyText.includes("```cpp") ||
    aiReplyText.includes("```java") ||
    aiReplyText.includes("```html")
  ) {
    aiReplyText = STANDARD_REFUSAL_MESSAGE;
  }

  // -------------------------------------------------------------
  // Structured Card Extractions
  // -------------------------------------------------------------
  const recommendedTestKey = extractRecommendedTest(aiReplyText, userText);
  let recommendationCard = null;

  if (recommendedTestKey && PLATFORM_TESTS_MAP[recommendedTestKey]) {
    const testInfo = PLATFORM_TESTS_MAP[recommendedTestKey];
    recommendationCard = {
      testKey: testInfo.id,
      testName: testInfo.title,
      testUrl: testInfo.href || `/test?test=${testInfo.id}`,
      estimatedTime: testInfo.duration,
      bulletPoints: [
        `Category: ${testInfo.category}`,
        `Badge: ${testInfo.badge}`,
        `Scientific Focus: ${testInfo.desc.slice(0, 90)}...`,
        "Helps you align cognitive strengths with ideal careers",
      ],
      reason: `Recommended by your AI Counsellor to clarify your strengths and options.`,
    };
  }

  const comparisonCard = extractCareerComparison(userText);
  const suggestedChips = generateSuggestedChips(recommendedTestKey, comparisonCard, userText);

  // Generate lightweight summary card after a few turns of engagement
  let summaryCard = null;
  if (updatedProfile.turnsCount >= 3 && updatedProfile.interestsIdentified.length > 0) {
    summaryCard = {
      youEnjoy: updatedProfile.interestsIdentified.slice(0, 3),
      youAreConsidering: updatedProfile.careerOptionsConsidering.slice(0, 2),
      youAreUnsureAbout: updatedProfile.decisionConflicts.slice(0, 2),
      mainGoal: "Find the career path and psychometric assessment that fits your natural strengths",
    };
  }

  return {
    reply: aiReplyText,
    updatedProfile,
    summaryCard,
    recommendationCard,
    comparisonCard,
    suggestedChips,
  };
}
