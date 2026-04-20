import { useState, useMemo } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import { navItems, aiShortcuts } from "./dashboard/data";
import { TrophyIcon, TrendUpIcon, TrendDownIcon, SearchIcon } from "./dashboard/Icons";

// Generate 100 students with realistic data
const firstNames = [
  "Aarav", "Vihaan", "Aditya", "Arjun", "Rohan", "Aryan", "Ishaan", "Nevan", "Reyansh", "Krishna",
  "Meera", "Priya", "Ananya", "Kavya", "Diya", "Aisha", "Saanvi", "Ishita", "Myra", "Zara",
  "Rahul", "Amit", "Vikram", "Raj", "Karan", "Sanjay", "Manish", "Deepak", "Siddharth", "Ashok",
  "Sneha", "Neha", "Pooja", "Ritu", "Anjali", "Kirti", "Shruti", "Divya", "Nisha", "Swati",
  "Arabella", "Charlotte", "Amelia", "Isla", "Ava", "Mia", "Isabella", "Sophia", "Emma", "Olivia",
];

const indianLastNames = [
  "Singh", "Patel", "Kumar", "Sharma", "Verma", "Gupta", "Rao", "Reddy",
  "Das", "Jain", "Bose", "Nair", "Menon", "Kapoor", "Bhatia", "Pandey",
  "Agarwal", "Mehta", "Thakur", "Joshi", "Rawat", "Bhatt", "Kulkarni",
  "Deshmukh", "Patil", "Shinde", "Sinha", "Mishra", "Tripathi", "Upadhyay"
];

const westernLastNames = [
  "Johnson", "Smith", "Williams", "Brown", "Jones", "Miller", "Davis",
  "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee",
  "Thompson", "White", "Harris", "Clark", "Lewis", "Walker", "Hall"
];

const eastAsianLastNames = [
  "Chen", "Wang", "Liu", "Zhang", "Li", "Yang", "Huang", "Zhao",
  "Wu", "Zhou", "Xu", "Sun", "Ma", "Zhu", "Hu", "Guo", "Lin",
  "Tanaka", "Suzuki", "Takahashi", "Yamamoto", "Sato", "Ito"
];

const roles = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Java Developer", "Python Developer", "DevOps Engineer",
  "Data Scientist", "ML Engineer", "iOS Developer", "Android Developer"
];

const companies = [
  "Google", "Amazon", "Microsoft", "Meta", "Apple",
  "Netflix", "Uber", "Airbnb", "Salesforce", "Adobe"
];

const generateStudentData = () => {
  const students = [];
  // Create shuffled pools for random distribution
  const shuffledFirstNames = [...firstNames].sort(() => Math.random() - 0.5);
  const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);
  const shuffledCompanies = [...companies].sort(() => Math.random() - 0.5);

  // Expand companies list for more variety
  const allCompanies = [
    ...companies,
    "Tesla", "Netflix", "Spotify", "Twitter", "LinkedIn",
    "Oracle", "IBM", "Intel", "AMD", "Nvidia",
    "SAP", "Shopify", "Stripe", "Square", "Airbnb",
    "Lyft", "Snapchat", "Pinterest", "Reddit", "Discord",
  ];
  const shuffledAllCompanies = [...allCompanies].sort(() => Math.random() - 0.5);

  for (let i = 0; i < 100; i++) {
    const firstName = shuffledFirstNames[i % shuffledFirstNames.length];
    let lastName;
    if (["Aarav","Vihaan","Aditya","Arjun","Rohan","Aryan","Ishaan","Reyansh","Krishna","Meera","Priya","Ananya","Kavya","Diya","Aisha","Saanvi","Ishita","Rahul","Amit","Vikram","Raj","Karan","Sanjay","Manish","Deepak","Siddharth","Ashok","Sneha","Neha","Pooja","Ritu","Anjali","Kirti","Shruti","Divya","Nisha","Swati"].includes(firstName)) {
      lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
    } else if (["Arabella","Charlotte","Amelia","Isla","Ava","Mia","Isabella","Sophia","Emma","Olivia"].includes(firstName)) {
      lastName = westernLastNames[Math.floor(Math.random() * westernLastNames.length)];
    } else {
      lastName = eastAsianLastNames[Math.floor(Math.random() * eastAsianLastNames.length)];
    }
    const name = `${firstName} ${lastName}`;
    const role = shuffledRoles[i % shuffledRoles.length];
    // Use expanded company pool with random distribution
    const company = shuffledAllCompanies[i % shuffledAllCompanies.length];

    // Score decreases gradually from rank 1 to 100 with some variation
    const baseScore = 98 - (i * 0.35) + (Math.random() * 6 - 3);
    const score = Math.round(Math.max(45, Math.min(98, baseScore)));

    const prevScore = score + Math.floor(Math.random() * 10 - 3);
    const delta = score - prevScore;

    const interviewsCompleted = Math.floor(20 - (i / 5) + Math.random() * 4);
    const streak = Math.floor(Math.random() * 15) + 1;

    // Skills based on role with some variation
    const skillBase = 60 + (score - 50) * 0.5;
    const skills = {
      communication: Math.round(Math.min(99, skillBase + Math.random() * 20 - 10)),
      technical: Math.round(Math.min(99, skillBase + Math.random() * 20 - 10)),
      problemSolving: Math.round(Math.min(99, skillBase + Math.random() * 20 - 10)),
      systemDesign: Math.round(Math.min(99, skillBase + Math.random() * 20 - 10)),
      confidence: Math.round(Math.min(99, skillBase + Math.random() * 20 - 10)),
    };

    const recentInterviews = Array.from({ length: 3 }, (_, j) => ({
      company: allCompanies[(i + j * 7) % allCompanies.length],
      role: roles[(i + j * 3) % roles.length],
      score: Math.round(score - 5 + j * 3 + Math.random() * 8),
      date: new Date(Date.now() - (j + 1) * 86400000 * (3 + Math.floor(Math.random() * 5))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    const strengths = [];
    const weaknesses = [];
    Object.entries(skills).forEach(([skill, val]) => {
      if (val >= 80) strengths.push(skill.replace(/([A-Z])/g, ' $1').trim());
      else if (val < 65) weaknesses.push(skill.replace(/([A-Z])/g, ' $1').trim());
    });

    students.push({
      id: i + 1,
      rank: i + 1,
      name,
      initials: `${firstName[0]}${lastName[0]}`,
      role,
      company,
      score,
      prevScore,
      delta,
      interviewsCompleted,
      streak,
      skills,
      strengths: strengths.slice(0, 2),
      weaknesses: weaknesses.slice(0, 2),
      recentInterviews,
      avatarColor: [
        "from-sky-500 to-indigo-600",
        "from-emerald-500 to-cyan-600",
        "from-fuchsia-500 to-violet-600",
        "from-amber-500 to-orange-600",
        "from-rose-500 to-pink-600",
        "from-blue-500 to-cyan-600",
        "from-purple-500 to-pink-600",
        "from-teal-500 to-emerald-600",
      ][i % 8],
    });
  }
  return students;
};

const allStudents = generateStudentData();

function getRankBadge(rank) {
  if (rank === 1) return { bg: "from-yellow-400 to-amber-500", text: "text-amber-600", icon: "🥇" };
  if (rank === 2) return { bg: "from-gray-300 to-gray-400", text: "text-gray-500", icon: "🥈" };
  if (rank === 3) return { bg: "from-amber-600 to-amber-700", text: "text-amber-700", icon: "🥉" };
  return null;
}

function getScoreColor(score) {
  if (score >= 85) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 55) return "text-amber-600";
  return "text-rose-600";
}

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [hoveredStudent, setHoveredStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return allStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "All" || student.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, filterRole]);

  const uniqueRoles = ["All", ...new Set(allStudents.map(s => s.role))];

  return (
    <DashboardLayout
      projectName="AIX"
      projectSubtitle="Interview AI"
      navItems={navItems}
      activeNav="Leaderboard"
      aiShortcuts={aiShortcuts}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrophyIcon className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-slate-900">Global Leaderboard</h1>
          </div>
          <p className="text-slate-500 text-lg">
            Top 100 performers across all mock interviews. Hover on any student to see detailed analytics.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-70 max-w-md">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:border-slate-400 cursor-pointer"
          >
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Leaderboard Table Header */}
        <div className="bg-slate-50 rounded-t-2xl border border-slate-200 px-6 py-4 grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-3">Student</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Company</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-1 text-center">Trend</div>
          <div className="col-span-1 text-center">Interviews</div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl divide-y divide-slate-100">
          {filteredStudents.map((student, index) => {
            const rankBadge = getRankBadge(student.rank);
            const isHovered = hoveredStudent?.id === student.id;

            return (
              <div
                key={student.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? "bg-linear-to-r from-blue-50 to-indigo-50 scale-[1.01] shadow-lg shadow-slate-200/50"
                    : "hover:bg-slate-50"
                }`}
                onMouseEnter={() => setHoveredStudent(student)}
                onMouseLeave={() => setHoveredStudent(null)}
              >
                {/* Rank */}
                <div className="col-span-1 flex justify-center">
                  {rankBadge ? (
                    <div className={`w-10 h-10 rounded-full bg-linear-to-br ${rankBadge.bg} flex items-center justify-center text-lg shadow-md`}>
                      {rankBadge.icon}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                      #{student.rank}
                    </div>
                  )}
                </div>

                {/* Student Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-linear-to-br ${student.avatarColor} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                    {student.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base">{student.name}</p>
                    <p className="text-xs text-slate-400">🔥 {student.streak} day streak</p>
                  </div>
                </div>

                {/* Role */}
                <div className="col-span-2">
                  <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">
                    {student.role}
                  </span>
                </div>

                {/* Company */}
                <div className="col-span-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {student.company}
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-2 text-center">
                  <span className={`text-lg font-bold ${getScoreColor(student.score)}`}>
                    {student.score}
                  </span>
                </div>

                {/* Trend */}
                <div className="col-span-1 flex justify-center">
                  {student.delta >= 0 ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendUpIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">+{student.delta}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-rose-600">
                      <TrendDownIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">{student.delta}</span>
                    </div>
                  )}
                </div>

                {/* Interviews */}
                <div className="col-span-1 text-center">
                  <span className="text-sm font-medium text-slate-600">{student.interviewsCompleted}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Detail Card */}
        {hoveredStudent && (
          <div
            className="fixed z-50 bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 w-105 pointer-events-none"
            style={{
              top: '50%',
              right: '80px',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${hoveredStudent.avatarColor} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                {hoveredStudent.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-slate-900">{hoveredStudent.name}</h3>
                  {getRankBadge(hoveredStudent.rank) && (
                    <span className="text-xl">{getRankBadge(hoveredStudent.rank).icon}</span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{hoveredStudent.role} at {hoveredStudent.company}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-2xl font-bold ${getScoreColor(hoveredStudent.score)}`}>
                    {hoveredStudent.score} pts
                  </span>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${hoveredStudent.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {hoveredStudent.delta >= 0 ? <TrendUpIcon className="w-4 h-4" /> : <TrendDownIcon className="w-4 h-4" />}
                    {hoveredStudent.delta >= 0 ? '+' : ''}{hoveredStudent.delta}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills Radar */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Skill Breakdown</h4>
              <div className="space-y-2.5">
                {Object.entries(hoveredStudent.skills).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`font-semibold ${value >= 80 ? 'text-emerald-600' : value >= 65 ? 'text-blue-600' : 'text-amber-600'}`}>
                        {value}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          value >= 80 ? 'bg-emerald-500' : value >= 65 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Strengths</h4>
                <div className="flex flex-wrap gap-1">
                  {hoveredStudent.strengths.length > 0 ? (
                    hoveredStudent.strengths.map(s => (
                      <span key={s} className="text-[10px] font-semibold bg-white text-emerald-700 px-2 py-1 rounded-lg">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-emerald-600">Well-rounded</span>
                  )}
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">To Improve</h4>
                <div className="flex flex-wrap gap-1">
                  {hoveredStudent.weaknesses.length > 0 ? (
                    hoveredStudent.weaknesses.map(w => (
                      <span key={w} className="text-[10px] font-semibold bg-white text-amber-700 px-2 py-1 rounded-lg">
                        {w}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-amber-600">No gaps</span>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Interviews */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recent Interviews</h4>
              <div className="space-y-2">
                {hoveredStudent.recentInterviews.map((interview, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {interview.company[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{interview.company}</p>
                        <p className="text-[10px] text-slate-400">{interview.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${getScoreColor(interview.score)}`}>{interview.score}</p>
                      <p className="text-[10px] text-slate-400">{interview.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interviews</p>
                <p className="text-lg font-bold text-slate-900">{hoveredStudent.interviewsCompleted}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Streak</p>
                <p className="text-lg font-bold text-slate-900">🔥 {hoveredStudent.streak}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rank</p>
                <p className="text-lg font-bold text-slate-900">#{hoveredStudent.rank}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-20">
            <TrophyIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No students found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
