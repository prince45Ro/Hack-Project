import { useState } from "react";
import { SparkIcon } from "../Icons";
import { formatShortDate, getOutcomeClass } from "../utils";

export default function CommandCenterWidget({
  activeRecord,
  candidateRecords = [],
}) {
  const [activeTab, setActiveTab] = useState("All");
  const interviewTypes = ["All", "Mock Interview", "HR Interview", "Technical Interview"];

  // Sort and filter records for display
  const recentSessions = [...candidateRecords]
    .filter((record) => activeTab === "All" || record.round === activeTab)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="rounded-[30px] bg-linear-to-br from-[#0f172a] via-[#1d4ed8] to-[#06b6d4] p-7 text-white shadow-[0_28px_70px_rgba(29,78,216,0.25)] xl:col-span-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
            AIX Command Center
          </p>
          <h2 className="mt-4 text-[26px] font-bold leading-tight">
            Live Session Tracking
          </h2>
          <p className="mt-2 text-sm text-sky-100">
            Recent interview sessions for {activeRecord?.candidate || "Candidate"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <SparkIcon className="h-6 w-6" />
          </div>
          <div className="flex gap-2 bg-white/10 p-1 rounded-full border border-white/5">
            {interviewTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === type
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-sky-100 hover:bg-white/20 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentSessions.slice(0, 3).map((record) => (
          <div
            key={record.id}
            className={`relative rounded-3xl border ${
              record.id === activeRecord?.id
                ? "border-sky-300 bg-white/20 shadow-lg"
                : "border-white/10 bg-white/10"
            } p-5 transition-all`}
          >
            {record.id === activeRecord?.id && (
              <span className="absolute -top-3 -right-3 flex h-6 px-3 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black uppercase text-slate-900 shadow-md">
                Active
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-black/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {record.role}
              </span>
              <span className="text-[11px] font-medium text-sky-100">
                {formatShortDate(record.date)}
              </span>
            </div>
            
            <h3 className="mt-4 text-lg font-bold text-white">
              {record.round}
            </h3>
            
            <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-200">
                  Interviewer
                </p>
                <p className="mt-1 text-xs font-medium text-white truncate max-w-[120px]">
                  {record.interviewer}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-lg font-black shadow-inner ${getOutcomeClass(
                    record.score
                  )}`}
                >
                  {record.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {recentSessions.length > 3 && (
        <p className="mt-4 text-center text-xs font-medium text-sky-200">
          + {recentSessions.length - 3} more sessions in history
        </p>
      )}
    </section>
  );
}
