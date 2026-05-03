import { SkeletonLine, SkeletonBlock, SkeletonCard, SkeletonCircle } from "./SkeletonPulse";

/**
 * Matches the Home page layout (Header + Body + Footer):
 *  - Navbar pill
 *  - Hero section (heading + subtitle + CTA)
 *  - 3 Dream Job cards
 *  - Why Choose Us section (4 alternating image+text rows)
 *  - Company logos strip
 */
export default function HomeSkeleton() {
  return (
    <div className="skel-home-wrap">
      {/* Navbar */}
      <div className="skel-home-navbar">
        <SkeletonLine width="80px" height={28} />
        <div className="skel-row-gap-sm" style={{ gap: 20 }}>
          {[56, 48, 64, 56, 72].map((w, i) => (
            <SkeletonLine key={i} width={`${w}px`} height={14} />
          ))}
        </div>
        <SkeletonLine width="100px" height={38} style={{ borderRadius: 20 }} />
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 0 60px", maxWidth: 640, margin: "0 auto" }}>
        <SkeletonLine width="70%" height={42} style={{ margin: "0 auto 16px" }} />
        <SkeletonLine width="50%" height={42} style={{ margin: "0 auto 24px" }} />
        <SkeletonLine width="80%" height={16} style={{ margin: "0 auto 8px" }} />
        <SkeletonLine width="60%" height={16} style={{ margin: "0 auto 32px" }} />
        <div className="skel-row-gap-sm" style={{ justifyContent: "center", gap: 16 }}>
          <SkeletonLine width="140px" height={46} style={{ borderRadius: 24 }} />
          <SkeletonLine width="140px" height={46} style={{ borderRadius: 24 }} />
        </div>
      </div>

      {/* 3 Dream Job Cards */}
      <div className="skel-grid-3" style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px", gap: 32 }}>
        {[1, 2, 3].map(i => (
          <SkeletonCard key={i} height={360}>
            <SkeletonBlock height={208} style={{ borderRadius: "0" }} />
            <div style={{ padding: "24px", textAlign: "center" }}>
              <SkeletonLine width="60%" height={22} style={{ margin: "0 auto 10px" }} />
              <SkeletonLine width="80%" height={12} style={{ margin: "0 auto 16px" }} />
              <SkeletonLine width="100%" height={40} style={{ borderRadius: 20 }} />
            </div>
          </SkeletonCard>
        ))}
      </div>

      {/* Why Choose Us */}
      <div style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SkeletonLine width="300px" height={36} style={{ margin: "0 auto 16px" }} />
          <SkeletonLine width="400px" height={14} style={{ margin: "0 auto" }} />
        </div>
        {[1, 2].map(i => (
          <SkeletonCard key={i} height={300} style={{ marginBottom: 40, padding: 40 }}>
            <div className="skel-grid-2" style={{ gap: 40, height: "100%" }}>
              <SkeletonBlock height={220} style={{ borderRadius: 16 }} />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <SkeletonLine width="90px" height={10} style={{ marginBottom: 12 }} />
                <SkeletonLine width="70%" height={26} style={{ marginBottom: 12 }} />
                <SkeletonLine width="100%" height={12} style={{ marginBottom: 6 }} />
                <SkeletonLine width="85%" height={12} style={{ marginBottom: 20 }} />
                {[1, 2, 3].map(j => (
                  <div key={j} className="skel-row-gap-sm" style={{ marginBottom: 10 }}>
                    <SkeletonCircle size={24} />
                    <SkeletonLine width="200px" height={12} />
                  </div>
                ))}
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>

      {/* Company logos */}
      <div style={{ padding: "0 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <SkeletonLine width="300px" height={14} style={{ margin: "0 auto 24px" }} />
        <div className="skel-row-gap-sm" style={{ justifyContent: "center", gap: 40 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <SkeletonLine key={i} width="80px" height={28} style={{ borderRadius: 6 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
