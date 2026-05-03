import { SkeletonLine, SkeletonBlock, SkeletonCard, SkeletonCircle } from "./SkeletonPulse";

/**
 * Matches the InterviewsHub layout:
 *  - Hero heading + subtitle
 *  - 3 large interview type cards (Mock, Technical, HR)
 *  - Company logos banner
 */
export default function InterviewsHubSkeleton() {
  return (
    <div className="skel-page skel-interviews">
      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <SkeletonLine width="240px" height={36} style={{ marginBottom: 12 }} />
        <SkeletonLine width="520px" height={16} />
      </div>

      {/* 3 Interview Cards */}
      <div className="skel-grid-3" style={{ marginBottom: 48, gap: 32 }}>
        {[1, 2, 3].map(i => (
          <SkeletonCard key={i} height={340} className="skel-interview-card">
            <div style={{ padding: 28 }}>
              {/* Icon */}
              <SkeletonBlock height={64} style={{ width: 64, borderRadius: 16, marginBottom: 24 }} />
              {/* Subtitle */}
              <SkeletonLine width="55%" height={10} style={{ marginBottom: 8 }} />
              {/* Title */}
              <SkeletonLine width="75%" height={24} style={{ marginBottom: 14 }} />
              {/* Description */}
              <SkeletonLine width="100%" height={12} style={{ marginBottom: 6 }} />
              <SkeletonLine width="90%" height={12} style={{ marginBottom: 6 }} />
              <SkeletonLine width="70%" height={12} style={{ marginBottom: 22 }} />
              {/* Tags */}
              <div className="skel-row-gap-sm" style={{ flexWrap: "wrap", marginBottom: 24 }}>
                {[48, 56, 72, 44, 60].map((w, j) => (
                  <SkeletonLine key={j} width={`${w}px`} height={24} style={{ borderRadius: 12 }} />
                ))}
              </div>
              {/* Footer */}
              <div className="skel-row-gap-sm" style={{ justifyContent: "space-between" }}>
                <SkeletonLine width="72px" height={12} />
                <SkeletonLine width="64px" height={12} />
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>

      {/* Company logos banner */}
      <SkeletonCard height={100}>
        <div style={{ padding: "24px 32px" }}>
          <SkeletonLine width="280px" height={10} style={{ margin: "0 auto 20px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <SkeletonCircle size={32} style={{ borderRadius: 8 }} />
                <SkeletonLine width="36px" height={8} />
              </div>
            ))}
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
}
