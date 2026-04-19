import { useState } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import CommandCenterWidget from "./dashboard/widgets/CommandCenterWidget";
import StrengthsAnalysisWidget from "./dashboard/widgets/StrengthsAnalysisWidget";
import RecommendedMocksWidget from "./dashboard/widgets/RecommendedMocksWidget";
import LeaderboardWidget from "./dashboard/widgets/LeaderboardWidget";
import SkillGraphWidget from "./dashboard/widgets/SkillGraphWidget";
import SkillBreakdownWidget from "./dashboard/widgets/SkillBreakdownWidget";
import InterviewTrendWidget from "./dashboard/widgets/InterviewTrendWidget";
import PerformanceWidget from "./dashboard/widgets/PerformanceWidget";
import {
  navItems,
  aiShortcuts,
  interviewRecords,
  skillMeta,
} from "./dashboard/data";

import {
  average,
  buildLeaderboard,
  buildRoleReadiness,
  buildRoundPerformance,
} from "./dashboard/utils";
import { ChevronDownIcon, AdjustmentsIcon } from "./dashboard/Icons";

export default function FlexibleDashboard() {
  const roleOptions = [
    "All Roles",
    ...new Set(interviewRecords.map((record) => record.role)),
  ];

  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [activeRecordId, setActiveRecordId] = useState(interviewRecords[0].id);
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Filtering and sorting
  const filteredRecords =
    selectedRole === "All Roles"
      ? interviewRecords
      : interviewRecords.filter((record) => record.role === selectedRole);

  const sortedRecords = [...filteredRecords].sort(
    (left, right) => new Date(right.date) - new Date(left.date)
  );

  const activeRecord =
    sortedRecords.find((record) => record.id === activeRecordId) || sortedRecords[0];

  const candidateRecords = [...interviewRecords]
    .filter((record) => record.candidate === activeRecord.candidate)
    .sort((left, right) => new Date(left.date) - new Date(right.date));

  const skillMetrics = skillMeta.map((item) => ({
    ...item,
    value: activeRecord[item.key],
  }));

  const leaderboard = buildLeaderboard(filteredRecords);
  const roleReadiness = buildRoleReadiness(interviewRecords);
  const roundPerformance = buildRoundPerformance(filteredRecords);

  const totalSessions = filteredRecords.length;
  const averageScore = average(filteredRecords, (record) => record.score);
  const averageDuration = average(filteredRecords, (record) => record.duration);
  const strongHireRate = Math.round(
    (filteredRecords.filter((record) => record.score >= 85).length /
      Math.max(filteredRecords.length, 1)) *
      100
  );

  const firstCandidateScore = candidateRecords[0]?.score || activeRecord.score;
  const lastCandidateScore =
    candidateRecords[candidateRecords.length - 1]?.score || activeRecord.score;
  const candidateGrowth = lastCandidateScore - firstCandidateScore;

  const headerActions = (
    <button
      type="button"
      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
      onClick={() => console.log("Role Dropdown Clicked")}
    >
      {selectedRole}
      <ChevronDownIcon className="h-4 w-4 text-slate-400" />
    </button>
  );

  const handleRoleSelect = (role) => {
    const firstRecord =
      role === "All Roles"
        ? interviewRecords[0]
        : interviewRecords.find((record) => record.role === role);

    setSelectedRole(role);
    if (firstRecord) {
      setActiveRecordId(firstRecord.id);
    }
  };

  const handleCandidateSelect = (candidateName) => {
    const candidateLatest = [...interviewRecords]
      .filter((r) => r.candidate === candidateName)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (candidateLatest) {
      setActiveRecordId(candidateLatest.id);
    }
  };

  return (
    <DashboardLayout
      projectName="AIX"
      projectSubtitle="Interview AI"
      navItems={navItems}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      aiShortcuts={aiShortcuts}
      headerActions={headerActions}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between mb-6">
        <div>
          <h1 className="mt-2 text-[30px] font-bold tracking-tight text-slate-900">
            My Website Name
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
            onClick={() => console.log("Time Filter Clicked")}
          >
            Last 14 days
            <ChevronDownIcon className="h-4 w-4 text-slate-400" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
            onClick={() => console.log("Filter Clicked")}
          >
            Filter
            <AdjustmentsIcon className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <CommandCenterWidget
          activeRecord={activeRecord}
          candidateRecords={candidateRecords}
        />
        <LeaderboardWidget leaderboard={leaderboard} onMemberSelect={handleCandidateSelect} />
        
        <StrengthsAnalysisWidget candidateRecords={candidateRecords} />
        <RecommendedMocksWidget candidateRecords={candidateRecords} />

        <InterviewTrendWidget
          activeRecordCandidate={activeRecord.candidate}
          candidateRecords={candidateRecords}
        />
        <SkillGraphWidget skillMetrics={skillMetrics} />
        
        <PerformanceWidget roundPerformance={roundPerformance} />
        <SkillBreakdownWidget skillMetrics={skillMetrics} />
      </div>
    </DashboardLayout>
  );
}
