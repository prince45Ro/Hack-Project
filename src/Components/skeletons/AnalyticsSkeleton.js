import { SkeletonLine, SkeletonBlock, SkeletonCard, SkeletonCircle } from "./SkeletonPulse";

/**
 * Matches the Analytics page layout:
 *  - Header + period/role filter dropdowns
 *  - 4-col KPI stat cards (× 2 rows)
 *  - 3-col charts row (Score Distribution, Skill Averages, Round Performance)
 *  - 2-col charts row (Role Readiness, Top Candidates)
 *  - Skill Gauges row
 *  - AI Insights banner
 */
export default function AnalyticsSkeleton() {
  return (
    <div className="skel-page skel-analytics">
      {/* Header */}
      <div className="skel-dashboard-header" style={{ marginBottom: 28 }}>
        <div>
          <SkeletonLine width="160px" height={28} style={{ marginBottom: 8 }} />
          <SkeletonLine width="380px" height={13} />
        </div>
        <div className="skel-row-gap-sm">
          <SkeletonLine width="120px" height={38} style={{ borderRadius: 16 }} />
          <SkeletonLine width="150px" height={38} style={{ borderRadius: 16 }} />
          <SkeletonLine width="90px" height={38} style={{ borderRadius: 16 }} />
        </div>
      </div>

      {/* KPI Row 1 */}
      <div className="skel-grid-4" style={{ marginBottom: 24 }}>
        {[1, 2, 3, 4].map(i => (
          <SkeletonCard key={i} height={140} className="skel-stat-card">
            <div style={{ padding: 20 }}>
              <div className="skel-row-gap-sm" style={{ marginBottom: 14 }}>
                <SkeletonCircle size={40} style={{ borderRadius: 14 }} />
                <SkeletonLine width="52px" height={22} style={{ borderRadius: 12, marginLeft: "auto" }} />
              </div>
              <SkeletonLine width="80px" height={28} style={{ marginBottom: 6 }} />
              <SkeletonLine width="100px" height={12} style={{ marginBottom: 4 }} />
              <SkeletonLine width="60px" height={10} />
            </div>
          </SkeletonCard>
        ))}
      </div>

      {/* KPI Row 2 */}
      <div className="skel-grid-4" style={{ marginBottom: 24 }}>
        {[1, 2, 3, 4].map(i => (
          <SkeletonCard key={i} height={110} className="skel-stat-card">
            <div style={{ padding: 20 }}>
              <div className="skel-row-gap-sm" style={{ marginBottom: 14 }}>
                <SkeletonCircle size={40} style={{ borderRadius: 14 }} />
                <SkeletonLine width="48px" height={22} style={{ borderRadius: 12, marginLeft: "auto" }} />
              </div>
              <SkeletonLine width="60px" height={24} style={{ marginBottom: 6 }} />
              <SkeletonLine width="90px" height={12} />
            </div>
          </SkeletonCard>
        ))}
      </div>

      {/* Charts Row 1: 3-col */}
      <div className="skel-grid-3" style={{ marginBottom: 20 }}>
        {/* Score Distribution */}
        <SkeletonCard height={260}>
          <div style={{ padding: 24 }}>
            <SkeletonLine width="55%" height={14} style={{ marginBottom: 6 }} />
            <SkeletonLine width="70%" height={10} style={{ marginBottom: 20 }} />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
              {[40, 28, 60, 80, 50].map((h, i) => (
                <SkeletonBlock key={i} height={h} className="skel-flex-1" style={{ borderRadius: 4 }} />
              ))}
            </div>
            <div className="skel-row-gap-sm" style={{ marginTop: 14 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <SkeletonLine key={i} width="40px" height={10} />
              ))}
            </div>
          </div>
        </SkeletonCard>

        {/* Skill Averages */}
        <SkeletonCard height={260}>
          <div style={{ padding: 24 }}>
            <div className="skel-row-gap-sm" style={{ marginBottom: 20 }}>
              <SkeletonLine width="45%" height={14} />
              <SkeletonLine width="60px" height={22} style={{ borderRadius: 12, marginLeft: "auto" }} />
            </div>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div className="skel-row-gap-sm" style={{ marginBottom: 6 }}>
                  <SkeletonLine width="90px" height={11} />
                  <SkeletonLine width="28px" height={11} style={{ marginLeft: "auto" }} />
                </div>
                <SkeletonLine width="100%" height={8} />
              </div>
            ))}
          </div>
        </SkeletonCard>

        {/* Round Performance */}
        <SkeletonCard height={260}>
          <div style={{ padding: 24 }}>
            <SkeletonLine width="55%" height={14} style={{ marginBottom: 6 }} />
            <SkeletonLine width="70%" height={10} style={{ marginBottom: 20 }} />
            {[1, 2, 3].map(i => (
              <SkeletonCard key={i} height={72} style={{ marginBottom: 12, padding: 14 }}>
                <div className="skel-row-gap-sm" style={{ marginBottom: 8 }}>
                  <SkeletonLine width="120px" height={12} />
                  <SkeletonLine width="52px" height={18} style={{ borderRadius: 10, marginLeft: "auto" }} />
                </div>
                <SkeletonLine width="100%" height={8} />
              </SkeletonCard>
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Charts Row 2: 2-col */}
      <div className="skel-grid-2" style={{ marginBottom: 20 }}>
        {/* Role Readiness */}
        <SkeletonCard height={240}>
          <div style={{ padding: 24 }}>
            <SkeletonLine width="50%" height={14} style={{ marginBottom: 20 }} />
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div className="skel-row-gap-sm" style={{ marginBottom: 6 }}>
                  <SkeletonCircle size={8} />
                  <SkeletonLine width="140px" height={12} />
                  <SkeletonLine width="50px" height={12} style={{ marginLeft: "auto" }} />
                </div>
                <SkeletonLine width="100%" height={10} />
              </div>
            ))}
          </div>
        </SkeletonCard>

        {/* Top Candidates */}
        <SkeletonCard height={240}>
          <div style={{ padding: 24 }}>
            <SkeletonLine width="55%" height={14} style={{ marginBottom: 20 }} />
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skel-row-gap-sm" style={{ marginBottom: 12, padding: "8px 0" }}>
                <SkeletonLine width="16px" height={12} />
                <SkeletonCircle size={36} />
                <div style={{ flex: 1 }}>
                  <SkeletonLine width="100px" height={12} style={{ marginBottom: 4 }} />
                  <SkeletonLine width="130px" height={10} />
                </div>
                <div style={{ textAlign: "right" }}>
                  <SkeletonLine width="32px" height={14} style={{ marginBottom: 4 }} />
                  <SkeletonLine width="48px" height={16} style={{ borderRadius: 10 }} />
                </div>
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Skill Gauges */}
      <SkeletonCard height={140} style={{ marginBottom: 20 }}>
        <div style={{ padding: 24 }}>
          <SkeletonLine width="120px" height={14} style={{ marginBottom: 20 }} />
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <SkeletonCircle size={72} />
                <SkeletonLine width="60px" height={10} />
              </div>
            ))}
          </div>
        </div>
      </SkeletonCard>

      {/* AI Insights Banner */}
      <SkeletonCard height={80} className="skel-insights-banner">
        <div className="skel-row-gap-sm" style={{ padding: 24 }}>
          <SkeletonCircle size={48} style={{ borderRadius: 16, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <SkeletonLine width="100px" height={14} style={{ marginBottom: 6 }} />
            <SkeletonLine width="80%" height={12} />
          </div>
          <SkeletonLine width="120px" height={40} style={{ borderRadius: 16, flexShrink: 0 }} />
        </div>
      </SkeletonCard>
    </div>
  );
}
