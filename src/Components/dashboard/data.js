import {
  GridIcon,
  FileIcon,
  UsersIcon,
  TrophyIcon,
  StatsIcon,
  SettingsIcon,
  LightningIcon,
  WandIcon,
  ReplayIcon,
  HomeIcon,
} from "./Icons";

export const navItems = [
  { label: "Home", icon: HomeIcon, active: false, path: "/" },
  { label: "Dashboard", icon: GridIcon, active: true, path: "/dashboard" },
  { label: "Interviews", icon: FileIcon, active: false, path: "/interviews" },
  { label: "Candidates", icon: UsersIcon, active: false, path: "/candidates" },
  { label: "Leaderboard", icon: TrophyIcon, active: false, path: "/leaderboard" },
  { label: "Analytics", icon: StatsIcon, active: false, path: "/analytics" },
  { label: "Settings", icon: SettingsIcon, active: false, path: "/settings" },
];

export const aiShortcuts = [
  {
    title: "Smart feedback for your next round",
    detail: "Surface the one response pattern that needs attention before the next mock.",
    icon: LightningIcon,
    path: "/feature/smart-feedback",
  },
  {
    title: "Turn raw answers into high-signal interview responses",
    detail: "Restructure vague answers into concise, recruiter-friendly talking points.",
    icon: WandIcon,
    path: "/feature/restructure",
  },
  {
    title: "Revisit previous interviews with AI feedback",
    detail: "Compare older sessions with current scores and see if the coaching is working.",
    icon: ReplayIcon,
    path: "/feature/revisit",
  },
];

// Helper functions for mock data generation
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDateInPastYear = () => {
  const d = new Date();
  d.setDate(d.getDate() - randomInt(0, 365));
  return d.toISOString().split("T")[0];
};

// Generate 100 unique Indian names
const firstNames = ["Aarav", "Meera", "Rohan", "Kavya", "Dev", "Priya", "Aditya", "Neha", "Vikram", "Ananya", "Rahul", "Sneha", "Amit", "Pooja", "Raj", "Riya", "Sanjay", "Anjali", "Karan", "Kirti", "Arjun", "Simran", "Vikas", "Tanvi", "Siddharth", "Aisha", "Gaurav", "Nisha", "Manish", "Divya", "Saurabh", "Ritu", "Deepak", "Shruti", "Tarun", "Aarti", "Nitin", "Payal", "Prashant", "Shikha", "Alok", "Monika", "Yash", "Swati", "Naveen", "Jyoti", "Harish", "Richa", "Vishal", "Sonam"];
const lastNames = ["Singh", "Patel", "Das", "Iyer", "Malhotra", "Sharma", "Rao", "Gupta", "Verma", "Reddy", "Kumar", "Mehta", "Bose", "Jain", "Nair", "Yadav", "Chauhan", "Bhatia", "Kapoor", "Chatterjee", "Menon", "Joshi", "Saxena", "Desai", "Pandey"];

const mockCandidates = [];
for(let i=0; i<100; i++) {
  const f = firstNames[i % firstNames.length];
  const l = lastNames[i % lastNames.length];
  mockCandidates.push(`${f} ${l}`);
}
const mockRoles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Java Developer", "Python Developer"];
const mockRounds = ["Mock Interview", "HR Interview", "Technical Interview"];
const mockInterviewers = ["AIX Recruiter Bot", "AIX UI Panel", "AIX Senior Engineer", "AIX Platform Panel", "AIX Architecture Board"];

const generateMockRecords = (count) => {
  const records = [];
  for (let i = 1; i <= count; i++) {
    const baseScore = randomInt(55, 95);
    records.push({
      id: `aix-${i.toString().padStart(4, "0")}`,
      candidate: randomElement(mockCandidates),
      role: randomElement(mockRoles),
      round: randomElement(mockRounds),
      interviewer: randomElement(mockInterviewers),
      date: randomDateInPastYear(),
      duration: randomInt(15, 60),
      score: baseScore,
      communication: Math.min(100, baseScore + randomInt(-5, 10)),
      technical: Math.min(100, baseScore + randomInt(-10, 10)),
      confidence: Math.min(100, baseScore + randomInt(-8, 8)),
      problemSolving: Math.min(100, baseScore + randomInt(-5, 5)),
      systemDesign: Math.min(100, baseScore + randomInt(-15, 10)),
      delivery: Math.min(100, baseScore + randomInt(-5, 5)),
      feedback: "Generated feedback for mock session tracking.",
      nextStep: "Generated next steps based on AI analysis.",
      focusTags: ["React", "System Design", "Communication"].slice(0, randomInt(1, 3)),
    });
  }
  return records;
};

export const interviewRecords = generateMockRecords(1000);

export const skillMeta = [
  {
    key: "communication",
    label: "Communication",
    note: "How clearly the answer is structured and paced.",
    tone: "bg-sky-500",
  },
  {
    key: "technical",
    label: "Technical Depth",
    note: "Correctness and role-specific implementation detail.",
    tone: "bg-indigo-600",
  },
  {
    key: "confidence",
    label: "Confidence",
    note: "Calm delivery under time pressure.",
    tone: "bg-cyan-500",
  },
  {
    key: "problemSolving",
    label: "Problem Solving",
    note: "Breakdown quality and logical sequencing.",
    tone: "bg-emerald-500",
  },
  {
    key: "systemDesign",
    label: "System Design",
    note: "Architecture framing and tradeoff awareness.",
    tone: "bg-fuchsia-500",
  },
  {
    key: "delivery",
    label: "Delivery",
    note: "Examples, close, and follow-up handling.",
    tone: "bg-amber-500",
  },
];

import { roleStyles, getInitials } from "./utils";

// Dynamically compute the leaderboard (top 100)
const candidateScores = {};
interviewRecords.forEach(record => {
  if (!candidateScores[record.candidate]) {
    candidateScores[record.candidate] = {
      name: record.candidate,
      role: record.role,
      totalScore: 0,
      count: 0,
      initials: getInitials(record.candidate),
      avatarClass: roleStyles[record.role]?.avatarClass || "from-slate-400 to-slate-500",
      delta: randomInt(-5, 12),
    };
  }
  candidateScores[record.candidate].totalScore += record.score;
  candidateScores[record.candidate].count += 1;
});

export const leaderboard = Object.values(candidateScores)
  .map(c => ({
    ...c,
    score: Math.round(c.totalScore / c.count)
  }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 100)
  .map((c, index) => ({
    ...c,
    rank: index + 1
  }));
