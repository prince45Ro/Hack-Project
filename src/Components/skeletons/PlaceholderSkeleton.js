import { SkeletonLine, SkeletonBlock, SkeletonCard } from "./SkeletonPulse";

/**
 * Matches the PlaceholderPage layout:
 *  - Centered content: large title + subtitle + back button
 */
export default function PlaceholderSkeleton() {
  return (
    <div className="skel-page skel-placeholder">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        gap: 16,
      }}>
        <SkeletonLine width="280px" height={36} />
        <SkeletonLine width="360px" height={16} />
        <SkeletonLine width="120px" height={44} style={{ borderRadius: 22, marginTop: 16 }} />
      </div>
    </div>
  );
}
