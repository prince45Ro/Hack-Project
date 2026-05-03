import { SkeletonLine, SkeletonBlock, SkeletonCard, SkeletonCircle } from "./SkeletonPulse";

/**
 * Matches the LeaderboardPage layout:
 *  - Trophy icon + title + subtitle
 *  - Search bar + role filter dropdown
 *  - Table header (12-col grid)
 *  - 8 table body rows (rank, avatar+name, role, company, score, trend, sessions)
 */
export default function LeaderboardSkeleton() {
  return (
    <div className="skel-page skel-leaderboard">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="skel-row-gap-sm" style={{ marginBottom: 16 }}>
          <SkeletonCircle size={32} />
          <SkeletonLine width="260px" height={28} />
        </div>
        <SkeletonLine width="420px" height={14} />
      </div>

      {/* Filters */}
      <div className="skel-row-gap-sm" style={{ marginBottom: 24 }}>
        <SkeletonLine width="320px" height={44} style={{ borderRadius: 16, flex: "0 1 320px" }} />
        <SkeletonLine width="140px" height={44} style={{ borderRadius: 16 }} />
      </div>

      {/* Table Header */}
      <SkeletonCard height={48} className="skel-table-header">
        <div className="skel-table-grid" style={{ padding: "14px 24px" }}>
          <SkeletonLine width="36px" height={10} />
          <SkeletonLine width="72px" height={10} />
          <SkeletonLine width="48px" height={10} />
          <SkeletonLine width="64px" height={10} />
          <SkeletonLine width="48px" height={10} />
          <SkeletonLine width="42px" height={10} />
          <SkeletonLine width="56px" height={10} />
        </div>
      </SkeletonCard>

      {/* Table Rows */}
      <SkeletonCard height="auto" className="skel-table-body">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="skel-table-row">
            <div className="skel-table-grid" style={{ padding: "16px 24px" }}>
              {/* Rank */}
              <SkeletonCircle size={40} />
              {/* Name + streak */}
              <div className="skel-row-gap-sm" style={{ flex: 1 }}>
                <SkeletonCircle size={40} />
                <div>
                  <SkeletonLine width="110px" height={14} style={{ marginBottom: 6 }} />
                  <SkeletonLine width="70px" height={10} />
                </div>
              </div>
              {/* Role */}
              <SkeletonLine width="100px" height={28} style={{ borderRadius: 8 }} />
              {/* Company */}
              <SkeletonLine width="90px" height={28} style={{ borderRadius: 8 }} />
              {/* Score */}
              <SkeletonLine width="40px" height={20} />
              {/* Trend */}
              <SkeletonLine width="36px" height={16} />
              {/* Sessions */}
              <SkeletonLine width="24px" height={16} />
            </div>
          </div>
        ))}
      </SkeletonCard>
    </div>
  );
}
