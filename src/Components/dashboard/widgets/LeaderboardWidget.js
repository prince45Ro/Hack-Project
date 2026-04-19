import { TrophyIcon, TrendUpIcon, TrendDownIcon } from "../Icons";

export default function LeaderboardWidget({ leaderboard = [], onMemberSelect }) {
  // Rank colors
  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-amber-100 text-amber-600 ring-amber-200";
    if (rank === 2) return "bg-slate-100 text-slate-500 ring-slate-200";
    if (rank === 3) return "bg-orange-50 text-orange-600 ring-orange-200";
    return "bg-white text-slate-400 ring-slate-100";
  };

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4 flex flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-slate-900">Leaderboard</h2>
          <p className="mt-0.5 text-[13px] text-slate-400">Top performers across all tracks</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50">
          <TrophyIcon className="h-5 w-5 text-amber-500" />
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
        {leaderboard.map((member) => (
          <button
            key={member.name}
            onClick={() => onMemberSelect && onMemberSelect(member.name)}
            className={`w-full group flex items-center justify-between rounded-2xl p-3 text-left transition hover:bg-slate-50 ${
              member.rank <= 3 ? "border border-slate-100 shadow-sm bg-white" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ring-1 ${getRankStyle(
                  member.rank
                )}`}
              >
                {member.rank}
              </div>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${member.avatarClass} text-xs font-bold text-white shadow-sm`}
              >
                {member.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition">
                  {member.name}
                </p>
                <p className="text-[11px] font-medium text-slate-400">{member.role}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[17px] font-black tracking-tight text-slate-900">
                {member.score}
              </span>
              <div
                className={`mt-0.5 flex items-center justify-end gap-1 text-[11px] font-bold ${
                  member.delta >= 0 ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {member.delta >= 0 ? <TrendUpIcon className="h-3 w-3" /> : <TrendDownIcon className="h-3 w-3" />}
                {Math.abs(member.delta)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
