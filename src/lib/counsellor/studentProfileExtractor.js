// Module to analyze student inputs and progressively build a structured student profile
// This profile is kept internal to drive deterministic recommendation logic and personalized explanations.

export function createInitialProfile() {
  return {
    academicLevel: null, // e.g. "10th", "11th", "12th", "College"
    stream: null, // e.g. "Science (PCM)", "Science (PCB)", "Commerce", "Humanities"
    strongSubjects: [],
    difficultySubjects: [],
    interests: [],
    workPreferences: [], // e.g. "solving problems", "building things", "creative design", "working with people"
    careerOptionsConsidering: [],
    confidenceLevel: "COMPLETELY_UNDECIDED", // VERY_CLEAR | MOSTLY_CLEAR | SOMEWHAT_CONFUSED | HIGHLY_CONFUSED | COMPLETELY_UNDECIDED
    confusionLevel: "HIGH", // LOW | MEDIUM | HIGH | VERY_HIGH
    parentalPressure: false,
    decisionConflicts: [], // e.g. "Student vs Parent", "Multiple Careers", "Marks vs Interest", "Unclear Strengths"
    needsAssessment: null, // HIGH | MEDIUM | LOW
    needsAssessmentReason: "",
    recommendedTestKey: "hgmi", // 'hgmi' (Multiple Intelligence) or 'riasec' (Holland Career Interest)
    turnsCount: 0,
  };
}

// Keyword & Pattern Matchers
const SUBJECT_KEYWORDS = {
  "Mathematics": ["math", "maths", "mathematics", "calculus", "algebra"],
  "Computer Science": ["computer", "computers", "coding", "programming", "cs", "software", "python", "java", "c++"],
  "Physics": ["physics", "mechanics"],
  "Chemistry": ["chemistry", "organic chemistry"],
  "Biology": ["biology", "bio", "zoology", "botany", "life sciences", "medical subjects"],
  "Economics": ["economics", "eco", "microeconomics", "macroeconomics"],
  "Accountancy": ["accounts", "accountancy", "bookkeeping", "finance"],
  "Business Studies": ["business studies", "commerce", "bst"],
  "English Literature": ["english", "literature", "writing", "reading"],
  "Psychology": ["psychology", "mental health", "behavioral science"],
  "Political Science": ["pol science", "political science", "civics", "politics"],
  "History": ["history"],
  "Fine Arts": ["arts", "drawing", "painting", "visual arts", "graphic design"]
};

const INTEREST_KEYWORDS = {
  "Technology": ["technology", "tech", "computers", "coding", "software", "ai", "artificial intelligence", "gadgets", "web"],
  "Design & Aesthetics": ["design", "ui", "ux", "ui/ux", "graphic design", "visual", "drawing", "creativity", "creative", "sketching", "art"],
  "Healthcare & Biology": ["medicine", "doctor", "treating patients", "healthcare", "pharma", "biology", "hospital", "biotech"],
  "Problem Solving & Logic": ["solving problems", "problem solving", "logical problems", "puzzles", "algorithms", "analyzing", "logic"],
  "Building & Engineering": ["building things", "hardware", "engineering", "machines", "robotics", "circuits", "construction"],
  "Business & Entrepreneurship": ["business", "startup", "entrepreneur", "marketing", "finance", "investing", "selling", "management"],
  "Law & Public Policy": ["law", "lawyer", "advocate", "justice", "debating", "rights", "constitution", "governance"],
  "People & Counseling": ["working with people", "helping people", "counseling", "teaching", "mentoring", "social work", "communication"]
};

const CAREER_KEYWORDS = {
  "Computer Science": ["computer science", "software engineer", "software development", "cs", "cse", "coder", "programmer"],
  "UI/UX Design": ["ui", "ux", "ui/ux", "product design", "graphic design", "web design", "ux designer"],
  "Medicine": ["medicine", "doctor", "mbbs", "physician", "surgeon", "neet"],
  "Biotechnology": ["biotechnology", "biotech", "researcher in biology", "genetics"],
  "Data Science": ["data science", "data scientist", "data analytics", "machine learning", "ai specialist"],
  "Business Management": ["bba", "mba", "business management", "manager", "entrepreneurship"],
  "Law": ["law", "lawyer", "advocate", "ba llb", "corporate law", "clat"],
  "Architecture": ["architecture", "architect", "b.arch", "building design"],
  "Psychology": ["psychologist", "psychology", "therapist", "counselor"],
  "Chartered Accountancy": ["ca", "chartered accountant", "auditing", "taxation"]
};

export function updateStudentProfile(currentProfile, studentMessage, allMessages = []) {
  const text = (studentMessage || "").toLowerCase();
  const initial = createInitialProfile();
  const profile = {
    ...initial,
    ...(currentProfile || {}),
  };
  
  // Ensure array safety
  profile.strongSubjects = Array.isArray(profile.strongSubjects) ? [...profile.strongSubjects] : [];
  profile.difficultySubjects = Array.isArray(profile.difficultySubjects) ? [...profile.difficultySubjects] : [];
  profile.interests = Array.isArray(profile.interests) ? [...profile.interests] : [];
  profile.workPreferences = Array.isArray(profile.workPreferences) ? [...profile.workPreferences] : [];
  profile.careerOptionsConsidering = Array.isArray(profile.careerOptionsConsidering) ? [...profile.careerOptionsConsidering] : [];
  profile.decisionConflicts = Array.isArray(profile.decisionConflicts) ? [...profile.decisionConflicts] : [];

  profile.turnsCount = (profile.turnsCount || 0) + 1;

  // 1. Academic Level Detection
  if (text.includes("10th") || text.includes("class 10") || text.includes("grade 10")) profile.academicLevel = "10th";
  else if (text.includes("11th") || text.includes("class 11") || text.includes("grade 11")) profile.academicLevel = "11th";
  else if (text.includes("12th") || text.includes("class 12") || text.includes("grade 12") || text.includes("after 12")) profile.academicLevel = "12th";
  else if (text.includes("college") || text.includes("graduation") || text.includes("degree") || text.includes("undergrad")) profile.academicLevel = "Undergraduate";

  // 2. Stream Detection
  if (text.includes("pcm") || text.includes("non-med") || (text.includes("science") && (text.includes("math") || text.includes("computer")))) {
    profile.stream = "Science (PCM)";
  } else if (text.includes("pcb") || text.includes("medical") || (text.includes("science") && text.includes("bio"))) {
    profile.stream = "Science (PCB)";
  } else if (text.includes("commerce")) {
    profile.stream = "Commerce";
  } else if (text.includes("humanities") || text.includes("arts")) {
    profile.stream = "Humanities";
  }

  // 3. Strong & Enjoyed Subjects
  for (const [subject, keywords] of Object.entries(SUBJECT_KEYWORDS)) {
    const isEnjoyed = keywords.some(k => text.includes(k));
    if (isEnjoyed) {
      if (!profile.strongSubjects.includes(subject)) {
        profile.strongSubjects.push(subject);
      }
    }
  }

  // 4. Academic Difficulties / Dislikes
  if (text.includes("hate") || text.includes("dislike") || text.includes("memorizing") || text.includes("can't stand") || text.includes("struggle with")) {
    if (text.includes("memoriz") || text.includes("theory")) profile.difficultySubjects.push("Heavy Rote Memorization");
    if (text.includes("math") && (text.includes("hate") || text.includes("struggle"))) profile.difficultySubjects.push("Advanced Mathematics");
    if (text.includes("chem") && (text.includes("hate") || text.includes("struggle"))) profile.difficultySubjects.push("Chemistry");
  }

  // 5. Interests & Work Preferences
  for (const [interest, keywords] of Object.entries(INTEREST_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) {
      if (!profile.interests.includes(interest)) {
        profile.interests.push(interest);
      }
    }
  }

  if (text.includes("solving") || text.includes("logic")) profile.workPreferences.push("Solving logical problems");
  if (text.includes("building") || text.includes("maker")) profile.workPreferences.push("Building things");
  if (text.includes("creating") || text.includes("design") || text.includes("drawing")) profile.workPreferences.push("Creative design");
  if (text.includes("people") || text.includes("helping") || text.includes("talking")) profile.workPreferences.push("Working with people");

  // Deduplicate work preferences
  profile.workPreferences = Array.from(new Set(profile.workPreferences));

  // 6. Careers Being Considered
  for (const [career, keywords] of Object.entries(CAREER_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) {
      if (!profile.careerOptionsConsidering.includes(career)) {
        profile.careerOptionsConsidering.push(career);
      }
    }
  }

  // 7. Decision Conflicts & Parental Pressure
  if (
    text.includes("parent") || text.includes("parents") || text.includes("family") || text.includes("father") || text.includes("mother") ||
    text.includes("pressure") || text.includes("dad") || text.includes("mom")
  ) {
    if (text.includes("want me to") || text.includes("forces") || text.includes("pressure") || text.includes("expect") || text.includes("disagree")) {
      profile.parentalPressure = true;
      if (!profile.decisionConflicts.includes("Student vs Parent Preference")) {
        profile.decisionConflicts.push("Student vs Parent Preference");
      }
    }
  }

  if (profile.careerOptionsConsidering.length >= 2 || text.includes("confused between") || text.includes("or") && profile.careerOptionsConsidering.length > 0) {
    if (!profile.decisionConflicts.includes("Multiple Conflicting Career Paths")) {
      profile.decisionConflicts.push("Multiple Conflicting Career Paths");
    }
  }

  if (text.includes("not sure what i'm good at") || text.includes("don't know my strengths") || text.includes("what i am actually good at")) {
    if (!profile.decisionConflicts.includes("Uncertain of Natural Strengths")) {
      profile.decisionConflicts.push("Uncertain of Natural Strengths");
    }
  }

  if (text.includes("marks") && (text.includes("interest") || text.includes("don't match") || text.includes("different"))) {
    if (!profile.decisionConflicts.includes("Academic Marks vs Personal Passion")) {
      profile.decisionConflicts.push("Academic Marks vs Personal Passion");
    }
  }

  // 8. Confidence & Confusion Levels
  if (text.includes("completely lost") || text.includes("no idea") || text.includes("no clue") || text.includes("blank")) {
    profile.confidenceLevel = "COMPLETELY_UNDECIDED";
    profile.confusionLevel = "VERY_HIGH";
  } else if (text.includes("confused") || text.includes("stuck") || text.includes("not sure") || text.includes("doubt")) {
    profile.confidenceLevel = "HIGHLY_CONFUSED";
    profile.confusionLevel = "HIGH";
  } else if (text.includes("somewhat clear") || text.includes("leaning towards") || text.includes("thinking about")) {
    profile.confidenceLevel = "SOMEWHAT_CONFUSED";
    profile.confusionLevel = "MEDIUM";
  } else if (text.includes("i have already decided") || text.includes("i am certain") || text.includes("i just want syllabus") || text.includes("just want college info")) {
    profile.confidenceLevel = "VERY_CLEAR";
    profile.confusionLevel = "LOW";
  }

  // 9. Deterministic Assessment Need Evaluator (Section 5)
  evaluateAssessmentNeed(profile);

  return profile;
}

// Section 5 Deterministic Logic:
// High Need:
// - Multiple conflicting career interests
// - Cannot identify their strengths
// - Choosing mainly because of external / parental pressure
// - Interests != academic performance
// - Completely undecided
// Medium Need:
// - 1-2 possible paths, wants objective validation
// - Knows interests but not suitable careers
// Low Need:
// - Already made well-informed decision
// - Asking only factual/admission question
function evaluateAssessmentNeed(profile) {
  // Low Need checks
  if (profile.confidenceLevel === "VERY_CLEAR" && profile.decisionConflicts.length === 0) {
    profile.needsAssessment = "LOW";
    profile.needsAssessmentReason = "You seem quite clear on your chosen direction and only need factual college or syllabus information rather than self-discovery.";
    return;
  }

  // High Need checks
  const hasMultipleCareers = profile.careerOptionsConsidering.length >= 2;
  const hasParentalPressure = profile.parentalPressure;
  const hasUnclearStrengths = profile.decisionConflicts.includes("Uncertain of Natural Strengths");
  const isCompletelyUndecided = profile.confidenceLevel === "COMPLETELY_UNDECIDED" || profile.confusionLevel === "VERY_HIGH";
  const hasInterestMismatch = profile.decisionConflicts.includes("Academic Marks vs Personal Passion");

  if (hasMultipleCareers || hasParentalPressure || hasUnclearStrengths || isCompletelyUndecided || hasInterestMismatch) {
    profile.needsAssessment = "HIGH";

    // Tailor specific reason based on their actual situation (Section 6)
    if (hasParentalPressure && profile.careerOptionsConsidering.length > 0) {
      profile.needsAssessmentReason = `You mentioned that there's a difference between what your family envisions and what you naturally gravitate toward (${profile.interests.slice(0, 2).join(' & ') || 'your personal interests'}). An objective psychometric assessment gives you a structured, evidence-based mirror of your strengths so you can have a constructive, grounded conversation with your parents.`;
    } else if (hasMultipleCareers) {
      profile.needsAssessmentReason = `You're weighing distinct paths (${profile.careerOptionsConsidering.join(' vs ')}). Rather than guessing which one will suit you 5 years down the line, an assessment maps your underlying cognitive and interest patterns so you can see which path aligns with your natural way of thinking.`;
    } else if (hasUnclearStrengths) {
      profile.needsAssessmentReason = `You feel unsure about what your strongest areas really are. School marks only measure exam performance on a given day—an assessment identifies your problem-solving style, multiple intelligences, and natural affinities.`;
    } else {
      profile.needsAssessmentReason = `You're at a pivotal juncture where you want structured clarity. A quick calibrated assessment looks across multiple dimensions—interests, cognitive strengths, and work environments—to provide a reliable baseline for exploration.`;
    }

    // Recommend the most fitting instrument:
    // If student is interested in cognitive capabilities / multiple skills -> HGMI (Gardner)
    // If student is interested in career environments and interests -> RIASEC
    if (profile.interests.includes("Design & Aesthetics") || profile.interests.includes("Healthcare & Biology") || hasMultipleCareers) {
      profile.recommendedTestKey = "hgmi";
    } else {
      profile.recommendedTestKey = "riasec";
    }
    return;
  }

  // Medium Need
  if (profile.confidenceLevel === "SOMEWHAT_CONFUSED" || profile.careerOptionsConsidering.length === 1 || profile.interests.length > 0) {
    profile.needsAssessment = "MEDIUM";
    profile.needsAssessmentReason = "You already have some good clues about what you like, but taking an assessment can serve as valuable confirmation before making a major academic investment.";
    profile.recommendedTestKey = "riasec";
    return;
  }

  // Default to High if they are still exploring
  profile.needsAssessment = "HIGH";
  profile.needsAssessmentReason = "Exploring your core cognitive traits and interest code will give you an objective map of matching degrees and career clusters.";
  profile.recommendedTestKey = "hgmi";
}
