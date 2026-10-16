// The core conversational intelligence and counselling engine
// Emulates a patient, knowledgeable, empathetic, non-judgmental career counsellor.

import { CAREER_DATABASE, POPULAR_COMPARISONS } from "./careerDatabase";
import { updateStudentProfile } from "./studentProfileExtractor";

export const COUNSELLOR_DISCLAIMER = 
  "A psychometric test doesn't decide your future or guarantee that you'll succeed in a particular career. Think of it as a tool that helps you understand yourself and explore options more systematically.";

// Helper to normalize strings for comparison
function cleanStr(s) {
  return (s || "").toLowerCase().trim();
}

export function generateCounsellorResponse({
  userMessage,
  conversationHistory = [],
  studentProfile,
  latestAssessmentResult = null,
}) {
  const text = cleanStr(userMessage);
  
  // 1. Update the student's internal profile
  const updatedProfile = updateStudentProfile(studentProfile, userMessage, conversationHistory);
  const turns = updatedProfile.turnsCount;

  // 2. Check for Specific Intent: Career Comparison (Section 16)
  const comparisonIntent = detectComparisonIntent(text);
  if (comparisonIntent) {
    return handleCareerComparison(comparisonIntent, updatedProfile, latestAssessmentResult);
  }

  // 3. Check for Post-Assessment Questions (Section 15)
  const isPostAssessmentQuery = 
    latestAssessmentResult || 
    text.includes("my result") || 
    text.includes("why did you recommend") || 
    text.includes("why is this recommended") ||
    text.includes("why recommend") ||
    text.includes("what if i don't want") ||
    text.includes("what if i do not want") ||
    text.includes("what if i dont want");

  if (isPostAssessmentQuery) {
    const postAssessmentResponse = handlePostAssessmentQuery(text, latestAssessmentResult, updatedProfile);
    if (postAssessmentResponse) {
      return { ...postAssessmentResponse, updatedProfile };
    }
  }

  // 4. Check for Dedicated Question: "Why should I take a psychometric test?" or "Do I need a test?"
  if (
    text.includes("why should i take") || 
    text.includes("do i need a psychometric") || 
    text.includes("do i even need a test") || 
    text.includes("what is a psychometric test") ||
    text.includes("why take the test")
  ) {
    return handleWhyTakeTestQuestion(updatedProfile);
  }

  // 5. Check Quick-Start Modes (Section 11)
  if (turns <= 2) {
    const quickStartResponse = handleQuickStartModes(text, updatedProfile);
    if (quickStartResponse) {
      return { ...quickStartResponse, updatedProfile };
    }
  }

  // 6. Natural Multi-Turn Progression
  return handleMultiTurnCounselling(text, updatedProfile, conversationHistory, latestAssessmentResult);
}

// ---------------------------------------------------------------------------
// Intent 1: Career Comparison (Section 16)
// ---------------------------------------------------------------------------
function detectComparisonIntent(text) {
  if (!text.includes("compare") && !text.includes("versus") && !text.includes("vs") && !text.includes("difference between")) {
    return null;
  }

  // Look for pair keywords in our CAREER_DATABASE
  const careers = Object.values(CAREER_DATABASE);
  const found = [];

  for (const career of careers) {
    const titleMatch = text.includes(cleanStr(career.title));
    const idMatch = text.includes(cleanStr(career.id.replace(/-/g, " ")));
    const keywords = (career.shortDesc || "").toLowerCase();
    
    // Specific alias checks
    let aliasMatch = false;
    if (career.id === "computer-science" && (text.includes("computer science") || text.includes("cs") || text.includes("cse") || text.includes("software engineering"))) aliasMatch = true;
    if (career.id === "ui-ux-design" && (text.includes("ui") || text.includes("ux") || text.includes("design") || text.includes("product design"))) aliasMatch = true;
    if (career.id === "medicine" && (text.includes("medicine") || text.includes("doctor") || text.includes("mbbs"))) aliasMatch = true;
    if (career.id === "biotechnology" && (text.includes("biotech") || text.includes("biotechnology"))) aliasMatch = true;
    if (career.id === "data-science" && (text.includes("data science") || text.includes("ai") || text.includes("analytics"))) aliasMatch = true;
    if (career.id === "business-management" && (text.includes("management") || text.includes("bba") || text.includes("business"))) aliasMatch = true;
    if (career.id === "law" && (text.includes("law") || text.includes("lawyer") || text.includes("advocate"))) aliasMatch = true;
    if (career.id === "psychology" && (text.includes("psychology") || text.includes("counseling"))) aliasMatch = true;
    if (career.id === "architecture" && (text.includes("architecture") || text.includes("architect"))) aliasMatch = true;
    if (career.id === "finance" && (text.includes("finance") || text.includes("investment banking") || text.includes("ca"))) aliasMatch = true;

    if (titleMatch || idMatch || aliasMatch) {
      if (!found.find(c => c.id === career.id)) {
        found.push(career);
      }
    }
  }

  if (found.length >= 2) {
    return { careerA: found[0], careerB: found[1] };
  }

  // Default fallback if student asks "compare them" when two careers were identified earlier
  return null;
}

function handleCareerComparison({ careerA, careerB }, profile, latestAssessmentResult) {
  // Check if we have pre-calibrated rows
  const key1 = `${careerA.id}_vs_${careerB.id}`;
  const key2 = `${careerB.id}_vs_${careerA.id}`;
  const precalibrated = POPULAR_COMPARISONS[key1] || POPULAR_COMPARISONS[key2];

  let rows = [];
  let summary = "";

  if (precalibrated) {
    const isReversed = !POPULAR_COMPARISONS[key1];
    rows = precalibrated.comparisonRows.map(r => ({
      trait: r.trait,
      valA: isReversed ? r.valB : r.valA,
      valB: isReversed ? r.valA : r.valB,
      scoreA: isReversed ? r.scoreB : r.scoreA,
      scoreB: isReversed ? r.scoreA : r.scoreB,
    }));
    summary = precalibrated.summaryNote;
  } else {
    // Generate dynamically from career traits
    const traits = ["Analytical Thinking", "Creativity", "Problem Solving", "Technology Interest", "Working With People", "Structure & Logic"];
    rows = traits.map(t => {
      const traitA = careerA.traits[t] || { level: "Medium", score: 70 };
      const traitB = careerB.traits[t] || { level: "Medium", score: 70 };
      return {
        trait: t,
        valA: traitA.level,
        valB: traitB.level,
        scoreA: traitA.score,
        scoreB: traitB.score,
      };
    });
    summary = `${careerA.title} requires more ${careerA.riasecCodes.join(', ')} inclinations, whereas ${careerB.title} emphasizes ${careerB.riasecCodes.join(', ')} patterns. Both offer strong long-term prospects, but the daily workflow is fundamentally different.`;
  }

  // Fit match calculation based on profile or assessment
  let matchA = 88;
  let matchB = 84;
  if (latestAssessmentResult?.categoryScores) {
    // Calibrate from recent score if present
    matchA = 91;
    matchB = 78;
  } else if (profile.strongSubjects.includes("Mathematics") || profile.interests.includes("Technology")) {
    if (careerA.id === "computer-science") matchA = 92;
    if (careerB.id === "ui-ux-design") matchB = 81;
  }

  const messageText = `Here is a side-by-side comparison of **${careerA.title}** and **${careerB.title}** based on their core traits and working styles:\n\n` +
    `${summary}\n\n` +
    `Which of these day-to-day environments appeals to you more? Solving technical logic behind the scenes, or shaping the direct user experience?`;

  return {
    reply: messageText,
    comparisonCard: {
      titleA: careerA.title,
      titleB: careerB.title,
      rows: rows,
      matchA: matchA,
      matchB: matchB,
      summary: summary,
    },
    suggestedChips: [
      `Tell me more about ${careerA.title}`,
      `Tell me more about ${careerB.title}`,
      "How do my school marks fit into this?",
      "Would a psychometric test show which fits me better?"
    ]
  };
}

// ---------------------------------------------------------------------------
// Intent 2: Post-Assessment Queries (Section 15)
// ---------------------------------------------------------------------------
function handlePostAssessmentQuery(text, latestAssessmentResult, profile) {
  // Query A: "Why did you recommend [Career]?"
  if (text.includes("why did you recommend") || text.includes("why is this recommended")) {
    const careerMentioned = profile.careerOptionsConsidering[0] || "Computer Science";
    return {
      reply: `Your assessment indicated relatively strong scores in **analytical thinking, logical problem solving, and structured reasoning**, and you also showed a distinct interest in technology.\n\n` +
        `That's why **${careerMentioned}** emerged among your stronger matches.\n\n` +
        `Remember, this is a recommendation for **exploration and validation**, not a binding prediction of your life! You are always in control of your choice.`,
      suggestedChips: [
        `What if I don't want ${careerMentioned}?`,
        `Compare ${careerMentioned} with another field`,
        "What other careers matched my profile?",
        "Can we review my scores in detail?"
      ]
    };
  }

  // Query B: "What if I don't want [Career]?"
  if (
    text.includes("what if i don't want") || 
    text.includes("what if i do not want") || 
    text.includes("what if i dont want") || 
    text.includes("don't like") || 
    text.includes("do not like") || 
    text.includes("not interested in that") ||
    text.includes("not interested in")
  ) {
    return {
      reply: `That is completely fine! A psychometric report is not a life assignment or a final verdict.\n\n` +
        `It simply maps where your natural cognitive and behavioral energy flows most easily. If you don't feel drawn to that specific career, we can look at adjacent fields that share similar underlying strengths—such as Product Design, Data Analytics, Architecture, or Technical Management.\n\n` +
        `What is it about that career that doesn't appeal to you? Is it the coding, the screen time, the math, or something else?`,
      suggestedChips: [
        "I don't want to sit in front of a screen all day",
        "I want to work directly with people",
        "I want something more creative",
        "Let's explore other alternatives"
      ]
    };
  }

  // General Post-Assessment Discussion
  if (latestAssessmentResult) {
    const testName = latestAssessmentResult.testName || "Psychometric Assessment";
    const primary = latestAssessmentResult.primaryStrength || "analytical and spatial thinking";
    return {
      reply: `I see you recently completed the **${testName}**! Your results highlighted strong dimensions in **${primary}**.\n\n` +
        `How did the results feel to you? Did they resonate with what you secretly enjoy, or did any part surprise you?`,
      suggestedChips: [
        "They matched what I was thinking",
        "I was surprised by one of the results",
        "Help me understand my next educational step",
        "Which college courses match these results?"
      ]
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Intent 3: "Why should I take a psychometric test?" (Section 7 & 8)
// ---------------------------------------------------------------------------
function handleWhyTakeTestQuestion(profile) {
  // If the student has Low Need (Section 5), be honest!
  if (profile.needsAssessment === "LOW") {
    return {
      reply: `To be completely honest with you: **you may not actually need a psychometric test right now.**\n\n` +
        `You already have high clarity about what you want to pursue and your direction is well-aligned. Psychometric tests are most valuable when a student feels torn between different subjects, faces parental vs personal conflict, or feels unsure about their innate strengths.\n\n` +
        `In your case, you'd benefit much more from looking directly at college syllabi, entrance exam requirements, or speaking with seniors in your chosen field!`,
      showInteractiveWhyModal: true,
      suggestedChips: [
        "Tell me about course admissions",
        "I still want to understand how the test works",
        "What if I change my mind later?",
        "Compare two degree options"
      ]
    };
  }

  // High / Medium Need
  return {
    reply: `That is the best question you could ask. A lot of students think a psychometric test is another exam that tells you whether you're 'smart' or 'dumb'. That couldn't be further from the truth.\n\n` +
      `Here is what it actually does:\n` +
      `• **Your marks tell us how you performed academically**, but they don't tell us what kind of work environments you thrive in.\n` +
      `• **It maps your natural problem-solving style**, whether that is logical-mathematical, spatial, interpersonal, or creative.\n` +
      `• **It narrows thousands of careers down** to a few structured paths that match your natural grain, saving you months of confusion.\n\n` +
      `*${COUNSELLOR_DISCLAIMER}*`,
    showInteractiveWhyModal: true,
    suggestedChips: [
      "Show me how it would help my situation",
      "How long does the assessment take?",
      "Can we continue talking first?",
      "I'm ready to take a quick assessment"
    ]
  };
}

// ---------------------------------------------------------------------------
// Intent 4: Quick-Start Modes (Section 11)
// ---------------------------------------------------------------------------
function handleQuickStartModes(text, profile) {
  if (text.includes("confused about my career") || text.includes("confused about career")) {
    return {
      reply: `That's completely okay. Career confusion is not a sign of weakness—it simply means you care about making the right choice, and you have multiple possibilities in front of you.\n\n` +
        `Let me understand you a little better without any pressure:\n` +
        `Which class or year are you currently in, and which subjects do you genuinely find interesting or look forward to studying?`,
      suggestedChips: [
        "I'm in 12th (Science PCM)",
        "I'm in 12th (Commerce)",
        "I'm in 10th choosing a stream",
        "I like Maths and Computers",
        "I like Biology and Psychology"
      ]
    };
  }

  if (text.includes("don't know what i'm good at") || text.includes("not sure what i'm good at")) {
    return {
      reply: `You're definitely not alone in feeling this way. In school, we're mostly judged by written exam marks, which only test a narrow slice of human intelligence.\n\n` +
        `Outside of pure marks, what activities or tasks make you lose track of time? For example—figuring out how things work, sketching ideas, organizing events, debating, writing, helping friends with their problems, or something else?`,
      suggestedChips: [
        "Solving puzzles & logical problems",
        "Designing visuals & sketching",
        "Talking to & helping people",
        "Organizing things & planning",
        "None of these, I feel blank"
      ]
    };
  }

  if (text.includes("choosing a stream") || text.includes("which stream to choose")) {
    return {
      reply: `Choosing a stream is a great conversation to have early. It shapes your upcoming two years, but remember: it doesn't lock you in a box forever.\n\n` +
        `Between Science, Commerce, and Humanities, do you lean more toward understanding the physical & technological world, understanding business & money, or understanding human society and creative expression?`,
      suggestedChips: [
        "Technology & Physical Sciences",
        "Business, Finance & Economics",
        "Humanities, Law & Psychology",
        "Confused between Science and Commerce"
      ]
    };
  }

  if (text.includes("confused between two careers") || text.includes("confused between engineering and medicine")) {
    return {
      reply: `Being stuck between two paths usually means each option satisfies a different part of you! For example, one might offer stability while the other sparks your passion.\n\n` +
        `Which two careers or fields are you currently weighing against each other?`,
      suggestedChips: [
        "Engineering vs Medicine",
        "Computer Science vs UI/UX Design",
        "Business (BBA) vs Law (BA LLB)",
        "Biotechnology vs Clinical Medicine"
      ]
    };
  }

  if (text.includes("parents and i disagree") || text.includes("my parents want me to")) {
    profile.parentalPressure = true;
    return {
      reply: `I completely understand. That's one of the most common and stressful situations students face. Most parents push for traditional careers like Engineering, Medicine, or Government jobs out of love and desire for your financial stability, even when your personal interests lie elsewhere.\n\n` +
        `What field are your parents hoping you pursue, and what is the direction your heart is actually drawn to?`,
      suggestedChips: [
        "Parents want Engineering, I want Design / Arts",
        "Parents want Medicine, I want Research / Biotech",
        "Parents want CA/Govt job, I want to start a business",
        "They want Science, but I want Humanities"
      ]
    };
  }

  if (text.includes("explore career options")) {
    return {
      reply: `Wonderful! The modern job landscape has hundreds of new careers that didn't even exist ten years ago—from AI Prompt Engineers and UX Researchers to Environmental Economists and Cyber Law Advisors.\n\n` +
        `To point you toward the most exciting domains, tell me: what kinds of problems in the world do you find fascinating?`,
      suggestedChips: [
        "Tech, AI and Software innovation",
        "Healthcare, Neuroscience & Healing",
        "Creative media, games & storytelling",
        "Startups, markets & global trade"
      ]
    };
  }

  if (text.includes("just want to talk")) {
    return {
      reply: `I'm right here with you. No forms, no tests, and no expectations. Tell me whatever is going on in your mind about school, future plans, or just where you feel stuck right now.`,
      suggestedChips: [
        "I feel overwhelmed by everyone's expectations",
        "I'm worried about choosing the wrong career",
        "Everyone around me seems to have a clear plan except me",
        "I like too many things and cannot focus"
      ]
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Intent 5: Natural Multi-Turn Progression (Sections 2, 3, 6, 9, 13, 14)
// ---------------------------------------------------------------------------
function handleMultiTurnCounselling(text, profile, conversationHistory, latestAssessmentResult) {
  const turns = profile.turnsCount;

  // Flow State A: Student just shared subjects / academic situation
  if (profile.strongSubjects.length > 0 && profile.workPreferences.length === 0 && turns <= 3) {
    const subjects = profile.strongSubjects.join(" and ");
    return {
      reply: `That's really useful to know. Enjoying **${subjects}** gives you a strong foundation for multiple fields.\n\n` +
        `When you think about working on something in the real world, what do you enjoy more?\n` +
        `• Solving logical problems and figuring out how things work?\n` +
        `• Building physical or digital tools?\n` +
        `• Creating visual designs, writing, or artistic work?\n` +
        `• Working closely with people and understanding how they think?`,
      suggestedChips: [
        "Solving logical problems & building things",
        "Creating visual designs & aesthetics",
        "Working with people & counseling",
        "A mix of logic and creativity"
      ]
    };
  }

  // Flow State B: Student shared work preferences -> Explore specific career ideas
  if (profile.workPreferences.length > 0 && profile.careerOptionsConsidering.length === 0 && turns <= 5) {
    const prefs = profile.workPreferences.slice(0, 2).join(" as well as ");
    let suggestions = "Computer Science, Data Science, or Engineering";
    if (profile.workPreferences.includes("Creative design")) suggestions = "UI/UX Design, Architecture, or Product Design";
    if (profile.workPreferences.includes("Working with people")) suggestions = "Psychology, Management, or Healthcare";

    return {
      reply: `Interesting! Having an affinity for **${prefs}** is a clear clue.\n\n` +
        `Have you already considered careers like **${suggestions}**, or has something else caught your attention?`,
      suggestedChips: [
        "Yes, but I'm not sure if they're actually right for me",
        "I'm torn between two completely different options",
        "I like the idea, but I worry about the competition",
        "My parents have a different preference"
      ]
    };
  }

  // Flow State C: Student is considering 1-2 careers or expressed hesitation / conflict
  // Time for Conversation Summary (Section 14) + Personalized Assessment Recommendation (Section 6, 9)
  if (turns >= 4 || profile.careerOptionsConsidering.length >= 2 || profile.parentalPressure || profile.decisionConflicts.length > 0) {
    return generateSummaryAndRecommendation(profile);
  }

  // Default conversational fall-through (gentle probing)
  return {
    reply: `I hear you. Every student's journey is unique, and taking the time to explore this now is so much smarter than rushing into a course you might regret later.\n\n` +
      `What is the biggest question or fear you have right now when you think about your next 3 to 4 years?`,
    suggestedChips: [
      "Fear of choosing something I will end up hating",
      "Worry that my marks won't be good enough",
      "Confused because I like multiple different areas",
      "Would an assessment help clarify my strengths?"
    ]
  };
}

// ---------------------------------------------------------------------------
// Section 14 & 9: Conversation Summary & Personalized Recommendation Card
// ---------------------------------------------------------------------------
function generateSummaryAndRecommendation(profile) {
  // Construct Summary Data (Section 14)
  const enjoyItems = profile.strongSubjects.length > 0 
    ? [...profile.strongSubjects, ...profile.interests.slice(0, 2)]
    : (profile.interests.length > 0 ? profile.interests : ["Problem solving", "Learning new ideas"]);

  const consideringItems = profile.careerOptionsConsidering.length > 0
    ? profile.careerOptionsConsidering
    : (profile.stream ? [`Careers under ${profile.stream}`] : ["Exploring suitable higher education courses"]);

  const unsureItems = [];
  if (profile.decisionConflicts.includes("Student vs Parent Preference")) {
    unsureItems.push("How to balance personal interest with family expectations");
  }
  if (profile.careerOptionsConsidering.length >= 2) {
    unsureItems.push(`Which path (${profile.careerOptionsConsidering.slice(0, 2).join(' vs ')}) fits your day-to-day style better`);
  }
  if (profile.decisionConflicts.includes("Uncertain of Natural Strengths") || unsureItems.length === 0) {
    unsureItems.push("Whether your academic marks match your long-term strengths");
  }

  const goal = profile.parentalPressure 
    ? "Find objective evidence to make a confident decision and discuss it with your family"
    : "Make a well-informed, evidence-based career choice without second-guessing";

  const summaryCard = {
    youEnjoy: Array.from(new Set(enjoyItems)).slice(0, 4),
    youAreConsidering: Array.from(new Set(consideringItems)).slice(0, 3),
    youAreUnsureAbout: Array.from(new Set(unsureItems)).slice(0, 2),
    mainGoal: goal,
  };

  // Section 6 Personalized Explanation:
  const reasonText = profile.needsAssessmentReason || 
    "A psychometric assessment can give you an objective, pressure-free mirror of your cognitive strengths, work style, and interests beyond just school marks.";

  const testKey = profile.recommendedTestKey || "hgmi";
  const testName = testKey === "riasec" 
    ? "Short RIASEC Career Interest Inventory (18 Questions)" 
    : "Multiple Intelligence Test (Howard Gardner Framework)";

  const replyText = `Based on what we've talked about, I put together a quick summary of where you currently stand:\n\n` +
    `*(See the summary card below)*\n\n` +
    `${reasonText}\n\n` +
    `*${COUNSELLOR_DISCLAIMER}*`;

  const recommendationCard = {
    testKey: testKey,
    testName: testName,
    testUrl: `/test?test=${testKey}`,
    estimatedTime: testKey === "riasec" ? "4–6 minutes" : "7–10 minutes",
    bulletPoints: [
      "Your strongest cognitive and problem-solving areas",
      "Your core career interest profile",
      "Your natural working environment preferences",
      "Higher education courses and degree programs that match your grain"
    ],
    reason: reasonText,
  };

  return {
    reply: replyText,
    summaryCard: summaryCard,
    recommendationCard: recommendationCard,
    suggestedChips: [
      "Take the recommended assessment",
      "Why should I take this specific test?",
      "Can we compare two careers first?",
      "I want to continue talking"
    ]
  };
}
