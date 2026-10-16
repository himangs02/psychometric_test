// Knowledge base for careers, streams, subject mappings, and psychometric instruments

export const CAREER_DATABASE = {
  "computer-science": {
    id: "computer-science",
    title: "Computer Science & Engineering",
    category: "Technology",
    shortDesc: "Designing software, algorithms, systems, and intelligent applications.",
    stream: "Science (PCM)",
    suitableCourses: ["B.Tech CSE (AI & ML)", "B.Tech CSE (Data Science)", "BCA", "B.Tech CSE (Cyber Security)"],
    traits: {
      "Analytical Thinking": { score: 92, level: "High" },
      "Creativity": { score: 68, level: "Medium" },
      "Problem Solving": { score: 95, level: "High" },
      "Technology Interest": { score: 96, level: "High" },
      "Working With People": { score: 55, level: "Medium" },
      "Structure & Logic": { score: 90, level: "High" }
    },
    riasecCodes: ["Investigative", "Conventional", "Realistic"],
    gardnerIntelligences: ["Logical-Mathematical", "Spatial"],
    dayInLife: "Writing clean code, designing application logic, debugging software errors, reviewing system architecture, collaborating with product managers.",
    keyStrengthsNeeded: "Logical reasoning, persistent problem solving, abstract thinking, mathematical aptitude.",
    commonDoubts: "Do I have to be a math genius? (No, but logical problem solving and patience are essential).",
  },
  "ui-ux-design": {
    id: "ui-ux-design",
    title: "UI/UX & Product Design",
    category: "Design & Technology",
    shortDesc: "Crafting intuitive digital experiences, user interfaces, workflows, and visual design systems.",
    stream: "Any stream (Science, Commerce, Arts)",
    suitableCourses: ["B.Des (User Experience / Interaction Design)", "BCA with UX Specialization", "BA in Design & Visual Communication"],
    traits: {
      "Analytical Thinking": { score: 72, level: "Medium" },
      "Creativity": { score: 94, level: "High" },
      "Problem Solving": { score: 86, level: "High" },
      "Technology Interest": { score: 88, level: "High" },
      "Working With People": { score: 85, level: "High" },
      "Structure & Logic": { score: 74, level: "Medium" }
    },
    riasecCodes: ["Artistic", "Investigative", "Social"],
    gardnerIntelligences: ["Spatial", "Interpersonal", "Intrapersonal"],
    dayInLife: "Conducting user interviews, wireframing user journeys, building Figma prototypes, usability testing, collaborating with developers.",
    keyStrengthsNeeded: "Empathy, visual aesthetics, human psychology understanding, iterative prototyping.",
    commonDoubts: "Do I need to know coding? (Basic understanding helps, but design, empathy, and usability come first).",
  },
  "medicine": {
    id: "medicine",
    title: "Medicine & Clinical Healthcare (MBBS / BDS)",
    category: "Healthcare",
    shortDesc: "Diagnosing illnesses, treating patients, clinical procedures, and saving lives.",
    stream: "Science (PCB)",
    suitableCourses: ["MBBS", "BDS", "BAMS", "B.Sc Nursing"],
    traits: {
      "Analytical Thinking": { score: 90, level: "High" },
      "Creativity": { score: 55, level: "Medium" },
      "Problem Solving": { score: 94, level: "High" },
      "Technology Interest": { score: 70, level: "Medium" },
      "Working With People": { score: 95, level: "High" },
      "Structure & Logic": { score: 88, level: "High" }
    },
    riasecCodes: ["Investigative", "Social", "Realistic"],
    gardnerIntelligences: ["Logical-Mathematical", "Interpersonal", "Bodily-Kinesthetic"],
    dayInLife: "Examining patients, analyzing diagnostic labs, formulating treatment protocols, emergency procedures, continuous patient counseling.",
    keyStrengthsNeeded: "High emotional resilience, stamina, deep biological curiosity, interpersonal empathy.",
    commonDoubts: "Can I do medicine if I dislike memorizing? (Medicine requires substantial memory retention, alongside strong clinical diagnostic reasoning).",
  },
  "biotechnology": {
    id: "biotechnology",
    title: "Biotechnology & Biomedical Research",
    category: "Healthcare & Science",
    shortDesc: "Applying cellular and biomolecular processes to develop therapies, vaccines, and sustainable solutions.",
    stream: "Science (PCB / PCMB)",
    suitableCourses: ["B.Tech Biotechnology", "B.Sc Biotechnology", "B.Pharm", "M.Sc Forensic Science"],
    traits: {
      "Analytical Thinking": { score: 92, level: "High" },
      "Creativity": { score: 78, level: "Medium" },
      "Problem Solving": { score: 90, level: "High" },
      "Technology Interest": { score: 86, level: "High" },
      "Working With People": { score: 50, level: "Medium" },
      "Structure & Logic": { score: 85, level: "High" }
    },
    riasecCodes: ["Investigative", "Realistic"],
    gardnerIntelligences: ["Logical-Mathematical", "Naturalist"],
    dayInLife: "Running laboratory experiments, genetic sequencing, biochemical assays, analyzing trial data, publishing scientific papers.",
    keyStrengthsNeeded: "Precision, curiosity, laboratory technique, patience with long research cycles.",
    commonDoubts: "Is it clinical or research? (Primarily research and industry laboratory oriented; minimal direct patient contact).",
  },
  "data-science": {
    id: "data-science",
    title: "Data Science & Artificial Intelligence",
    category: "Technology & Mathematics",
    shortDesc: "Extracting actionable insights, training machine learning models, and building data infrastructure.",
    stream: "Science (PCM) or Commerce with Mathematics",
    suitableCourses: ["B.Tech CSE (Data Science)", "BCA (Data Science)", "B.Sc Data Analytics", "B.Sc Statistics"],
    traits: {
      "Analytical Thinking": { score: 98, level: "High" },
      "Creativity": { score: 65, level: "Medium" },
      "Problem Solving": { score: 96, level: "High" },
      "Technology Interest": { score: 94, level: "High" },
      "Working With People": { score: 60, level: "Medium" },
      "Structure & Logic": { score: 95, level: "High" }
    },
    riasecCodes: ["Investigative", "Conventional"],
    gardnerIntelligences: ["Logical-Mathematical"],
    dayInLife: "Exploratory data analysis, statistical modeling, training ML pipelines, creating dashboards, translating business questions to algorithms.",
    keyStrengthsNeeded: "Advanced mathematics/statistics, algorithmic thinking, Python/R, curiosity about hidden patterns.",
    commonDoubts: "How is it different from software engineering? (Focus is on mathematical data patterns, modeling, and insights rather than building app frontends or systems).",
  },
  "business-management": {
    id: "business-management",
    title: "Business Management & Entrepreneurship",
    category: "Business",
    shortDesc: "Leading operations, launching ventures, strategizing growth, and managing cross-functional teams.",
    stream: "Any stream (Commerce, Science, Humanities)",
    suitableCourses: ["BBA (Hons)", "BBA - Entrepreneurship & Family Business", "BBA-MBA Integrated", "B.Com (Hons)"],
    traits: {
      "Analytical Thinking": { score: 80, level: "High" },
      "Creativity": { score: 75, level: "Medium" },
      "Problem Solving": { score: 88, level: "High" },
      "Technology Interest": { score: 70, level: "Medium" },
      "Working With People": { score: 94, level: "High" },
      "Structure & Logic": { score: 82, level: "High" }
    },
    riasecCodes: ["Enterprising", "Conventional", "Social"],
    gardnerIntelligences: ["Interpersonal", "Intrapersonal", "Logical-Mathematical"],
    dayInLife: "Negotiating contracts, team planning meetings, analyzing financial runway, pitching to investors/clients, setting quarterly OKRs.",
    keyStrengthsNeeded: "Persuasion, high initiative, leadership under uncertainty, financial literacy.",
    commonDoubts: "Can science students do BBA? (Absolutely, many science students thrive in business with their analytical background).",
  },
  "law": {
    id: "law",
    title: "Law & Corporate Legal Advisory",
    category: "Law & Governance",
    shortDesc: "Interpreting statutes, advocating before courts, structuring contracts, and ensuring compliance.",
    stream: "Any stream (Humanities, Commerce, Science)",
    suitableCourses: ["BA LL.B (5-Year Integrated)", "BBA LL.B", "LL.B (3-Year)", "LL.M"],
    traits: {
      "Analytical Thinking": { score: 95, level: "High" },
      "Creativity": { score: 70, level: "Medium" },
      "Problem Solving": { score: 92, level: "High" },
      "Technology Interest": { score: 50, level: "Medium" },
      "Working With People": { score: 90, level: "High" },
      "Structure & Logic": { score: 96, level: "High" }
    },
    riasecCodes: ["Enterprising", "Investigative", "Conventional"],
    gardnerIntelligences: ["Linguistic", "Logical-Mathematical", "Interpersonal"],
    dayInLife: "Reading precedent cases, drafting pleadings and commercial contracts, client counseling, courtroom argument, regulatory research.",
    keyStrengthsNeeded: "Articulate communication, meticulous text analysis, ethical judgement, argument deconstruction.",
    commonDoubts: "Is law only for court arguments? (No! Corporate law, IP law, cyber law, and policy advising take place in boardroom offices).",
  },
  "psychology": {
    id: "psychology",
    title: "Psychology & Behavioral Counseling",
    category: "Social Sciences & Healthcare",
    shortDesc: "Understanding human behavior, cognitive processes, emotional health, and therapeutic counseling.",
    stream: "Any stream (Humanities, Science, Commerce)",
    suitableCourses: ["BA (Hons) Psychology", "B.Sc Clinical Psychology", "MA Psychology", "MSW"],
    traits: {
      "Analytical Thinking": { score: 84, level: "High" },
      "Creativity": { score: 76, level: "Medium" },
      "Problem Solving": { score: 88, level: "High" },
      "Technology Interest": { score: 55, level: "Medium" },
      "Working With People": { score: 98, level: "High" },
      "Structure & Logic": { score: 75, level: "Medium" }
    },
    riasecCodes: ["Social", "Investigative"],
    gardnerIntelligences: ["Interpersonal", "Intrapersonal", "Linguistic"],
    dayInLife: "One-on-one therapy sessions, administering psychological tests, behavioral observation, clinical case formulation, student or workplace counseling.",
    keyStrengthsNeeded: "Deep active listening, non-judgmental stance, empathy, objective psychological evaluation.",
    commonDoubts: "Is psychiatry the same as psychology? (Psychiatrists are medical doctors who prescribe medicine; psychologists focus on therapy and behavioral assessment).",
  },
  "architecture": {
    id: "architecture",
    title: "Architecture & Spatial Design",
    category: "Design & Engineering",
    shortDesc: "Synthesizing aesthetics, physics, and human needs to design physical buildings and urban spaces.",
    stream: "Science (PCM)",
    suitableCourses: ["B.Arch (5-Year)", "B.Des (Interior Architecture)", "B.Plan"],
    traits: {
      "Analytical Thinking": { score: 86, level: "High" },
      "Creativity": { score: 96, level: "High" },
      "Problem Solving": { score: 92, level: "High" },
      "Technology Interest": { score: 82, level: "High" },
      "Working With People": { score: 75, level: "Medium" },
      "Structure & Logic": { score: 88, level: "High" }
    },
    riasecCodes: ["Artistic", "Realistic", "Investigative"],
    gardnerIntelligences: ["Spatial", "Logical-Mathematical"],
    dayInLife: "Sketching site concepts, 3D CAD modeling, structural client meetings, site inspection, zoning compliance reviews.",
    keyStrengthsNeeded: "Visual-spatial thinking, design sensitivity, structural awareness, drafting mastery.",
    commonDoubts: "Do I have to draw like a master painter? (You need technical visual communication and spatial reasoning, which are taught systematically).",
  },
  "finance": {
    id: "finance",
    title: "Finance & Investment Banking",
    category: "Commerce & Business",
    shortDesc: "Managing capital allocations, risk analysis, portfolio strategies, and corporate valuation.",
    stream: "Commerce with Maths or Science (PCM)",
    suitableCourses: ["B.Com (Finance & Accounting)", "BBA (Finance)", "Chartered Accountancy (CA)", "CFA"],
    traits: {
      "Analytical Thinking": { score: 95, level: "High" },
      "Creativity": { score: 58, level: "Medium" },
      "Problem Solving": { score: 90, level: "High" },
      "Technology Interest": { score: 80, level: "High" },
      "Working With People": { score: 70, level: "Medium" },
      "Structure & Logic": { score: 96, level: "High" }
    },
    riasecCodes: ["Conventional", "Enterprising", "Investigative"],
    gardnerIntelligences: ["Logical-Mathematical"],
    dayInLife: "Financial modeling in Excel, corporate balance sheet evaluation, equity market research, portfolio balancing, client presentations.",
    keyStrengthsNeeded: "Quantitative precision, financial market awareness, disciplined analytical rigor.",
    commonDoubts: "Is it only accounting? (Accounting tracks past money; finance models future risk, valuation, and capital decisions).",
  }
};

// Stream options and associated subject clusters
export const ACADEMIC_STREAMS = {
  "science_pcm": {
    name: "Science (PCM - Physics, Chemistry, Math)",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"],
    popularCareers: ["Computer Science", "Data Science", "Mechanical Engineering", "Architecture", "Commercial Pilot", "Defense"]
  },
  "science_pcb": {
    name: "Science (PCB - Physics, Chemistry, Biology)",
    subjects: ["Physics", "Chemistry", "Biology", "Psychology", "English"],
    popularCareers: ["Medicine (MBBS)", "Dental (BDS)", "Biotechnology", "Pharmacy", "Nursing", "Forensic Science", "Clinical Psychology"]
  },
  "commerce": {
    name: "Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics / Informatics Practices", "English"],
    popularCareers: ["Chartered Accountancy", "Investment Banking", "Corporate Finance", "BBA / Management", "Marketing", "Entrepreneurship"]
  },
  "humanities": {
    name: "Humanities / Arts",
    subjects: ["Psychology", "Political Science", "History", "Sociology", "Economics", "English Literature"],
    popularCareers: ["Law (BA LLB)", "Civil Services (UPSC)", "Psychology & Counseling", "Journalism & Media", "Product & UI/UX Design", "Public Policy"]
  }
};

// Standard comparison mappings between popular conflicting career choices
export const POPULAR_COMPARISONS = {
  "computer-science_vs_ui-ux-design": {
    careerA: "computer-science",
    careerB: "ui-ux-design",
    comparisonRows: [
      { trait: "Analytical Thinking", valA: "High", valB: "Medium", scoreA: 92, scoreB: 72 },
      { trait: "Creativity & Visual Art", valA: "Medium", valB: "High", scoreA: 68, scoreB: 94 },
      { trait: "Problem Solving", valA: "High", valB: "High", scoreA: 95, scoreB: 86 },
      { trait: "Technology Interest", valA: "High", valB: "High", scoreA: 96, scoreB: 88 },
      { trait: "People & User Empathy", valA: "Medium", valB: "High", scoreA: 55, scoreB: 85 }
    ],
    summaryNote: "Computer Science focuses on *how systems work technically* (code, data structures, algorithms). UI/UX Design focuses on *how people feel and interact* with the product (workflows, ergonomics, visual psychology). If you love logic and code, CS is ideal. If you love aesthetics, human behavior, and visual solutions, UI/UX is your sweet spot."
  },
  "medicine_vs_biotechnology": {
    careerA: "medicine",
    careerB: "biotechnology",
    comparisonRows: [
      { trait: "Clinical Patient Care", valA: "Very High", valB: "Low / None", scoreA: 96, scoreB: 35 },
      { trait: "Laboratory & R&D Focus", valA: "Medium", valB: "Very High", scoreA: 65, scoreB: 95 },
      { trait: "Analytical Thinking", valA: "High", valB: "High", scoreA: 90, scoreB: 92 },
      { trait: "Emotional Stamina for Distress", valA: "High", valB: "Low-Medium", scoreA: 95, scoreB: 50 },
      { trait: "Technology & Genetic Tools", valA: "Medium", valB: "High", scoreA: 70, scoreB: 88 }
    ],
    summaryNote: "Medicine is a frontline, clinical vocation where you directly diagnose and treat human patients, requiring high emotional stamina and bedside empathy. Biotechnology is an R&D laboratory science where you engineer therapies, genetic tools, and vaccines without direct patient interaction."
  },
  "computer-science_vs_data-science": {
    careerA: "computer-science",
    careerB: "data-science",
    comparisonRows: [
      { trait: "Software Engineering & Systems", valA: "Very High", valB: "Medium-High", scoreA: 96, scoreB: 78 },
      { trait: "Statistics & Math Modeling", valA: "Medium-High", valB: "Very High", scoreA: 78, scoreB: 98 },
      { trait: "Business Insights & Analytics", valA: "Medium", valB: "High", scoreA: 60, scoreB: 90 },
      { trait: "Problem Solving", valA: "High", valB: "High", scoreA: 94, scoreB: 96 },
      { trait: "Technology Interest", valA: "High", valB: "High", scoreA: 95, scoreB: 94 }
    ],
    summaryNote: "Computer Science creates software architectures, web/mobile systems, and applications. Data Science uses math, statistics, and machine learning to find hidden patterns in data and inform business decisions."
  },
  "business-management_vs_law": {
    careerA: "business-management",
    careerB: "law",
    comparisonRows: [
      { trait: "Verbal & Written Argument", valA: "Medium-High", valB: "Very High", scoreA: 78, scoreB: 96 },
      { trait: "Commercial Risk & Operations", valA: "Very High", valB: "High", scoreA: 94, scoreB: 82 },
      { trait: "Statutory & Rule Analysis", valA: "Medium", valB: "Very High", scoreA: 65, scoreB: 95 },
      { trait: "Interpersonal & Leadership", valA: "Very High", valB: "High", scoreA: 95, scoreB: 90 },
      { trait: "Creative Strategy", valA: "High", valB: "Medium", scoreA: 82, scoreB: 68 }
    ],
    summaryNote: "Business Management focuses on building, scaling, and leading commercial enterprises. Law focuses on protecting rights, negotiating contracts, and ensuring compliance with regulatory and judicial frameworks."
  }
};
