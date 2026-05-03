import { SkeletonLine, SkeletonBlock, SkeletonCard, SkeletonCircle } from "./SkeletonPulse";

/**
 * Matches the FlexibleDashboard layout:
 *  - Title bar + filter buttons
 *  - 12-col grid with CommandCenter (7) + Leaderboard (5)
 *  - Strengths (6) + RecommendedMocks (6)
 *  - InterviewTrend (7) + SkillGraph (5)
 *  - Performance (6) + SkillBreakdown (6)
 */
export default function DashboardSkeleton() {
  return (
    <div className="skel-page skel-dashboard">
      {/* Title row */}
      <div className="skel-dashboard-header">
        <SkeletonLine width="220px" height={32} />
        <div className="skel-row-gap-sm">
          <SkeletonLine width="120px" height={40} style={{ borderRadius: 16 }} />
          <SkeletonLine width="90px" height={40} style={{ borderRadius: 16 }} />
        </div>
      </div>

      {/* Row 1: Command Center + Leaderboard */}
      <div className="skel-grid-12">
        <SkeletonCard height={320} className="skel-col-7">
          <div style={{ padding: 24 }}>
            <div className="skel-row-gap-sm" style={{ marginBottom: 20 }}>
              <SkeletonCircle size={48} />
              <div style={{ flex: 1 }}>
                <SkeletonLine width="60%" height={18} style={{ marginBottom: 8 }} />
                <SkeletonLine width="40%" height={12} />
              </div>
            </div>
            <SkeletonLine width="100%" height={14} style={{ marginBottom: 10 }} />
            <SkeletonLine width="80%" height={14} style={{ marginBottom: 24 }} />
            <div className="skel-row-gap-sm">
              <SkeletonBlock height={72} className="skel-flex-1" />
              <SkeletonBlock height={72} className="skel-flex-1" />
              <SkeletonBlock height={72} className="skel-flex-1" />
            </div>
          </div>
        </SkeletonCard>

        <SkeletonCard height={320} className="skel-col-5">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="55%" height={16} style={{ marginBottom: 20 }} />
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skel-row-gap-sm" style={{ marginBottom: 14 }}>
                <SkeletonLine width="20px" height={20} style={{ borderRadius: 8 }} />
                <SkeletonCircle size={32} />
                <SkeletonLine width="100px" height={14} style={{ flex: 1 }} />
                <SkeletonLine width="40px" height={14} />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Row 2: Strengths + Recommended */}
      <div className="skel-grid-12">
        <SkeletonCard height={200} className="skel-col-6">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="50%" height={16} style={{ marginBottom: 16 }} />
            {[1, 2, 3].map(i => (
              <div key={i} style={{ marginBottom: 14 }}>
                <SkeletonLine width={`${60 + i * 10}%`} height={12} style={{ marginBottom: 6 }} />
                <SkeletonLine width="100%" height={8} />
              </div>
            ))}
          </div>
        </SkeletonCard>
        <SkeletonCard height={200} className="skel-col-6">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="55%" height={16} style={{ marginBottom: 16 }} />
            {[1, 2, 3].map(i => (
              <div key={i} className="skel-row-gap-sm" style={{ marginBottom: 12 }}>
                <SkeletonBlock height={44} style={{ width: 44, borderRadius: 12, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <SkeletonLine width="70%" height={12} style={{ marginBottom: 6 }} />
                  <SkeletonLine width="45%" height={10} />
                </div>
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Row 3: Trend + Skill Graph */}
      <div className="skel-grid-12">
        <SkeletonCard height={240} className="skel-col-7">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="50%" height={16} style={{ marginBottom: 24 }} />
            <SkeletonBlock height={150} />
          </div>
        </SkeletonCard>
        <SkeletonCard height={240} className="skel-col-5">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="45%" height={16} style={{ marginBottom: 24 }} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SkeletonCircle size={140} />
            </div>
          </div>
        </SkeletonCard>
      </div>

      {/* Row 4: Performance + SkillBreakdown */}
      <div className="skel-grid-12">
        <SkeletonCard height={200} className="skel-col-6">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="45%" height={16} style={{ marginBottom: 18 }} />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              {[60, 80, 45, 90, 70].map((h, i) => (
                <SkeletonBlock key={i} height={h} className="skel-flex-1" style={{ borderRadius: 6 }} />
              ))}
            </div>
          </div>
        </SkeletonCard>
        <SkeletonCard height={200} className="skel-col-6">
          <div style={{ padding: 24 }}>
            <SkeletonLine width="55%" height={16} style={{ marginBottom: 16 }} />
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div className="skel-row-gap-sm" style={{ marginBottom: 4 }}>
                  <SkeletonLine width="80px" height={11} />
                  <SkeletonLine width="30px" height={11} />
                </div>
                <SkeletonLine width="100%" height={7} />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
}
