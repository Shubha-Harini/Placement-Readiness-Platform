export const SKILL_CATEGORIES = {
  coreCS: ["DSA", "OOP", "DBMS", "OS", "Networks"],
  languages: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
  web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
  data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
  cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
  testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"],
  other: []
};

export function analyzeJD(company, role, jdText) {
  const text = jdText.toLowerCase();
  const extractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  };
  let categoryCount = 0;

  for (const [category, skills] of Object.entries(SKILL_CATEGORIES)) {
    if (category === "other") continue;

    const found = skills.filter(s => {
      // Custom boundary matching to support C++, C#, Node.js properly without \b failing on special chars
      const escaped = s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9_])${escaped}([^a-zA-Z0-9_]|$)`, 'i');
      return regex.test(text);
    });

    if (found.length > 0) {
      extractedSkills[category] = found;
      categoryCount++;
    }
  }

  // 3) Default behavior if no skills detected
  if (categoryCount === 0) {
    extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
  }

  // Calculate Readiness Score
  let score = 35;
  score += Math.min(30, categoryCount * 5);
  if (company && company.trim().length > 0) score += 10;
  if (role && role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;
  score = Math.min(100, score);

  // Generate dynamic 7-day plan deeply driven by skills
  const plan7Days = [
    { day: "Day 1-2", focus: "Basics & Foundation", tasks: ["Review core CS fundamentals and brush up on language logic."] },
    { day: "Day 3-4", focus: "Core & Algorithms", tasks: ["Solve 10-15 medium level coding questions focusing on recent patterns."] },
    { day: "Day 5", focus: "Project Architecture", tasks: ["Update resume with relevant detected keywords.", "Review personal projects."] },
    { day: "Day 6", focus: "Mock Interviews", tasks: ["Practice behavioral and tech questions extracted from requirements."] },
    { day: "Day 7", focus: "Revision & Polish", tasks: ["Final tech stack revision and rest."] }
  ];

  if (categoryCount === 0) {
    plan7Days[0].tasks.push("Focus heavily on building initial project fundamentals.");
  }
  if (extractedSkills.web.some(s => ['react', 'next.js'].includes(s.toLowerCase()))) {
    plan7Days[0].tasks.push("Revise React Component Lifecycle, Hooks (useState, useEffect), and Context API setups.");
    plan7Days[2].tasks.push("Ensure your portfolio explicitly highlights state management and responsive UI components.");
  }
  if (extractedSkills.data.some(s => ['sql', 'mysql', 'postgresql'].includes(s.toLowerCase()))) {
    plan7Days[1].tasks.push("Practice writing complex SQL Joins, Window Functions, and understand Indexing limits.");
  }
  if (extractedSkills.cloud.length > 0) {
    plan7Days[3].tasks.push("Include mock questions on deployment strategies, Docker containerization, and basic CI/CD pipelining.");
  }
  if (extractedSkills.languages.some(s => s.toLowerCase() === 'python')) {
    plan7Days[0].tasks.push("Review Python memory management, list comprehensions, generators, and OOP paradigms.");
  } else if (extractedSkills.languages.some(s => ['java', 'c#'].includes(s.toLowerCase()))) {
    plan7Days[0].tasks.push("Review Collections, Multithreading syntax, Garbage Collection, and deep OOP foundations.");
  }

  // Generate strictly mapped Questions
  const questions = [];

  if (extractedSkills.data.some(s => ['sql', 'mysql', 'postgresql'].includes(s.toLowerCase()))) {
    questions.push("What is the difference between a clustered and non-clustered index? When is each useful?");
    questions.push("Can you explain how Window Functions (like RANK or ROW_NUMBER) operate over a data set?");
  }
  if (extractedSkills.data.some(s => ['mongodb', 'redis'].includes(s.toLowerCase()))) {
    questions.push("When would you explicitly choose a NoSQL database structure over a Relational database?");
  }
  if (extractedSkills.web.some(s => ['react', 'next.js'].includes(s.toLowerCase()))) {
    questions.push("Explain the difference between Client-Side Rendering and Server-Side Rendering.");
    questions.push("Describe the rendering phases of React and how the Virtual DOM reconciles changes.");
  }
  if (extractedSkills.web.some(s => ['node.js', 'express'].includes(s.toLowerCase()))) {
    questions.push("Explain the Event Loop in Node.js. How does it handle massive concurrent I/O operations?");
  }
  if (extractedSkills.coreCS.some(s => s.toLowerCase() === 'dsa') || categoryCount === 0) {
    questions.push("What is the time complexity of searching in a Hash Map versus a Binary Search Tree, and why?");
    questions.push("How would you detect a cycle in a strictly directed graph?");
  }
  if (extractedSkills.languages.some(s => ['javascript', 'typescript'].includes(s.toLowerCase()))) {
    questions.push("Explain closures in JavaScript and describe how they can unintentionally lead to memory leaks.");
    questions.push("How does prototypal inheritance differ from classical inheritance?");
  }
  if (extractedSkills.cloud.length > 0) {
    questions.push("Describe the difference between a Virtual Machine and a Docker Container.");
  }

  // Fill up to 10 questions with generic behavioral/tech ones if needed
  const genericQuestions = [
    "Describe a time you had to learn a completely new technology exceptionally fast.",
    "What is the most challenging technical system problem you've debugged?",
    "How do you handle severe disagreements during peer code reviews?",
    "Where do you see yourself technically progressing over the next 3 years?",
    "Tell me about a project that fundamentally failed and what architecture lessons you learned.",
    "Explain OOP concepts (Polymorphism, Abstraction) with real-world design examples.",
    "What's your step-by-step process for debugging a critical production outage?",
    "How do you ensure your committed code remains readable and easily maintainable?",
    "Can you describe a situation where you had to meet a tight deadline without compromising quality?",
    "What is your approach to writing unit tests and ensuring strong code coverage?"
  ];

  let gqIndex = 0;
  while (questions.length < 10 && gqIndex < genericQuestions.length) {
    const gq = genericQuestions[gqIndex++];
    if (!questions.includes(gq)) questions.push(gq);
  }

  // Generate Checklist
  let techItems = ["Deep dive into Resume Projects"];
  if (categoryCount > 0) {
    // Find first non-empty category except 'other'
    const topCategoryKey = Object.keys(extractedSkills).find(k => k !== 'other' && extractedSkills[k].length > 0);
    if (topCategoryKey) {
      techItems.push(`Discuss ${extractedSkills[topCategoryKey].join(', ')} implementation details`);
    } else {
      techItems.push("Explain core technologies used in projects");
    }
  } else {
    techItems.push("Explain core technologies used in projects");
    techItems.push("Showcase clear communication around problem solving");
  }

  const checklist = [
    { roundTitle: "Round 1: Aptitude / Basics", items: ["Quantitative Aptitude (Time/Work, Probability)", "Logical Reasoning", "Language Fundamentals"] },
    { roundTitle: "Round 2: DSA + Core CS", items: ["Arrays & Strings", "Trees & Graphs", "DBMS Normalization", "OS Scheduling"] },
    { roundTitle: "Round 3: Tech interview (projects + stack)", items: techItems },
    { roundTitle: "Round 4: Managerial / HR", items: ["Behavioral Scenarios (STAR method)", "Company Research", "Questions for the interviewer"] }
  ];

  // Populate skill confidence map with default 'practice'
  const skillConfidenceMap = {};
  const allSkills = Object.values(extractedSkills).flat();
  for (const skill of allSkills) {
    skillConfidenceMap[skill] = 'practice';
  }

  // 1) Company Intel Heuristics
  let companyIntel = null;
  let roundMapping = null;

  if (company && company.trim().length > 0) {
    const enterpriseKeywords = ['amazon', 'infosys', 'tcs', 'google', 'microsoft', 'meta', 'apple', 'netflix', 'oracle', 'ibm', 'cisco', 'wipro', 'hcl', 'cognizant', 'flipkart', 'walmart', 'accenture', 'capgemini'];

    let companySize = "Startup (<200)";
    let companyFocus = "Practical problem solving, rapid development, and stack depth.";
    const compLower = (company || '').toLowerCase();

    if (enterpriseKeywords.some(keyword => compLower.includes(keyword))) {
      companySize = "Enterprise (2000+)";
      companyFocus = "Structured DSA, System Design, and Core CS fundamentals.";
    }

    companyIntel = {
      name: company,
      industry: "Technology Services",
      size: companySize,
      focus: companyFocus
    };

    // 2) Round Mapping Engine
    roundMapping = [];
    if (companySize.includes("Enterprise")) {
      roundMapping.push({
        roundTitle: "Round 1: Online Test",
        focusAreas: ["DSA", "Aptitude"],
        whyItMatters: "Heavy focus on algorithmic problem solving and speed to filter large applicant pools."
      });
      roundMapping.push({
        roundTitle: "Round 2: Technical",
        focusAreas: extractedSkills.coreCS.length > 0 ? ["DSA", "Core CS"] : ["Advanced DSA"],
        whyItMatters: "Whiteboard coding, time complexity analysis, and defining deep computer science concepts."
      });
      roundMapping.push({
        roundTitle: "Round 3: System Design & Projects",
        focusAreas: Object.values(extractedSkills).flat().filter(k => !extractedSkills.coreCS.includes(k)).slice(0, 2),
        whyItMatters: "Architectural discussions, scalability, and deep dives into your previous resume projects."
      });
      roundMapping.push({
        roundTitle: "Round 4: HR / Behavioral",
        focusAreas: ["Leadership Principles"],
        whyItMatters: "Evaluation of culture fit and responses to behavioral STAR (Situation, Task, Action, Result) questions."
      });
    } else {
      // Startup mapping
      const mainStack = Object.values(extractedSkills).flat().find(k => !extractedSkills.coreCS.includes(k)) || "Core Stack";
      roundMapping.push({
        roundTitle: "Round 1: Practical Coding",
        focusAreas: [`Take-home assignment`, `Live Coding (${mainStack})`],
        whyItMatters: "Startups care if you can build immediately. Expect to build a simple functional app or API."
      });
      roundMapping.push({
        roundTitle: "Round 2: Technical Deep Dive",
        focusAreas: ["System Architecture", "Code Review"],
        whyItMatters: "Discussing how you structure code in the real world, optimization, and edge-case handling."
      });
      roundMapping.push({
        roundTitle: "Round 3: Culture Fit / Founder",
        focusAreas: ["Vision", "Adaptability"],
        whyItMatters: "Assessing if you align with the fast-paced startup vision and can wear multiple hats."
      });
    }
  }

  if (!roundMapping) roundMapping = [];

  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company: company || '',
    role: role || '',
    jdText,
    extractedSkills,
    companyIntel,
    roundMapping,
    checklist,
    plan7Days,
    questions: questions.slice(0, 10),
    baseScore: score,
    skillConfidenceMap,
    finalScore: score
  };
}
