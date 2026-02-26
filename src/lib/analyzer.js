export const SKILL_CATEGORIES = {
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
  "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
  "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
  "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
  "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
  "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export function analyzeJD(company, role, jdText) {
  const text = jdText.toLowerCase();
  const extractedSkills = {};
  let categoryCount = 0;

  for (const [category, skills] of Object.entries(SKILL_CATEGORIES)) {
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

  // Add "General fresher stack" if nothing is found
  if (categoryCount === 0) {
    extractedSkills["General"] = ["General fresher stack"];
  }

  // Calculate Readiness Score
  let score = 35;
  score += Math.min(30, categoryCount * 5);
  if (company && company.trim().length > 0) score += 10;
  if (role && role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;
  score = Math.min(100, score);

  // Generate dynamic 7-day plan deeply driven by skills
  const plan = [
    { day: "Day 1-2", task: "Basics & Foundation", detail: "Review core CS fundamentals and brush up on language logic." },
    { day: "Day 3-4", task: "Core & Algorithms", detail: "Solve 10-15 medium level coding questions focusing on recent patterns." },
    { day: "Day 5", task: "Project Architecture", detail: "Update resume with relevant detected keywords. Review personal projects." },
    { day: "Day 6", task: "Mock Interviews", detail: "Practice behavioral and tech questions extracted from requirements." },
    { day: "Day 7", task: "Revision & Polish", detail: "Final tech stack revision and rest." }
  ];

  if (extractedSkills["Web"]?.some(s => ['react', 'next.js'].includes(s.toLowerCase()))) {
    plan[0].detail = "Revise React Component Lifecycle, Hooks (useState, useEffect), and Context API setups.";
    plan[2].detail = "Ensure your portfolio explicitly highlights state management and responsive UI components.";
  }
  if (extractedSkills["Data"]?.some(s => ['sql', 'mysql', 'postgresql'].includes(s.toLowerCase()))) {
    plan[1].detail = "Practice writing complex SQL Joins, Window Functions, and understand Indexing limits.";
  }
  if (extractedSkills["Cloud/DevOps"]) {
    plan[3].detail = "Include mock questions on deployment strategies, Docker containerization, and basic CI/CD pipelining.";
  }
  if (extractedSkills["Languages"]?.some(s => s.toLowerCase() === 'python')) {
    plan[0].detail = "Review Python memory management, list comprehensions, generators, and OOP paradigms.";
  } else if (extractedSkills["Languages"]?.some(s => ['java', 'c#'].includes(s.toLowerCase()))) {
    plan[0].detail = "Review Collections, Multithreading syntax, Garbage Collection, and deep OOP foundations.";
  }

  // Generate strictly mapped Questions
  const questions = [];

  if (extractedSkills["Data"]?.some(s => ['sql', 'mysql', 'postgresql'].includes(s.toLowerCase()))) {
    questions.push("What is the difference between a clustered and non-clustered index? When is each useful?");
    questions.push("Can you explain how Window Functions (like RANK or ROW_NUMBER) operate over a data set?");
  }
  if (extractedSkills["Data"]?.some(s => ['mongodb', 'redis'].includes(s.toLowerCase()))) {
    questions.push("When would you explicitly choose a NoSQL database structure over a Relational database?");
  }
  if (extractedSkills["Web"]?.some(s => ['react', 'next.js'].includes(s.toLowerCase()))) {
    questions.push("Explain the difference between Client-Side Rendering and Server-Side Rendering.");
    questions.push("Describe the rendering phases of React and how the Virtual DOM reconciles changes.");
  }
  if (extractedSkills["Web"]?.some(s => ['node.js', 'express'].includes(s.toLowerCase()))) {
    questions.push("Explain the Event Loop in Node.js. How does it handle massive concurrent I/O operations?");
  }
  if (extractedSkills["Core CS"]?.some(s => s.toLowerCase() === 'dsa') || categoryCount === 0) {
    questions.push("What is the time complexity of searching in a Hash Map versus a Binary Search Tree, and why?");
    questions.push("How would you detect a cycle in a strictly directed graph?");
  }
  if (extractedSkills["Languages"]?.some(s => ['javascript', 'typescript'].includes(s.toLowerCase()))) {
    questions.push("Explain closures in JavaScript and describe how they can unintentionally lead to memory leaks.");
    questions.push("How does prototypal inheritance differ from classical inheritance?");
  }
  if (extractedSkills["Cloud/DevOps"]) {
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
    "How do you ensure your committed code remains readable and easily maintainable?"
  ];

  while (questions.length < 10) {
    const gq = genericQuestions[questions.length % genericQuestions.length];
    if (!questions.includes(gq)) questions.push(gq);
    else break; // Prevent infinite loop if we run out of unique generics
  }

  // Generate Checklist
  let techItems = ["Deep dive into Resume Projects"];
  if (categoryCount > 0) {
    const topCategoryKey = Object.keys(extractedSkills)[0];
    techItems.push(`Discuss ${extractedSkills[topCategoryKey].join(', ')} implementation details`);
  } else {
    techItems.push("Explain core technologies used in projects");
  }

  const checklist = [
    { title: "Round 1: Aptitude / Basics", items: ["Quantitative Aptitude (Time/Work, Probability)", "Logical Reasoning", "Language Fundamentals"] },
    { title: "Round 2: DSA + Core CS", items: ["Arrays & Strings", "Trees & Graphs", "DBMS Normalization", "OS Scheduling"] },
    { title: "Round 3: Tech interview (projects + stack)", items: techItems },
    { title: "Round 4: Managerial / HR", items: ["Behavioral Scenarios (STAR method)", "Company Research", "Questions for the interviewer"] }
  ];

  // Populate skill confidence map with default 'practice'
  const skillConfidenceMap = {};
  const allSkills = Object.values(extractedSkills).flat();
  for (const skill of allSkills) {
    skillConfidenceMap[skill] = 'practice';
  }

  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: company || 'Unknown Company',
    role: role || 'General Role',
    jdText,
    extractedSkills,
    plan,
    checklist,
    questions: questions.slice(0, 10),
    baseScore: score,
    skillConfidenceMap,
    readinessScore: score // Will be superseded by dynamic calculation in UI
  };
}
