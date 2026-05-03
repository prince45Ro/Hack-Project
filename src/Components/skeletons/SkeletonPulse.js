/**
 * Shared skeleton primitives.
 * Every skeleton element uses the `.skel` base class (shimmer),
 * then a shape modifier for sizing.
 */

export function SkeletonLine({ width = "100%", height = 16, className = "", style = {} }) {
  return (
    <div
      className={`skel skel-line ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonBlock({ height = 160, className = "", style = {} }) {
  return (
    <div
      className={`skel skel-block ${className}`}
      style={{ minHeight: height, ...style }}
    />
  );
}

export function SkeletonCircle({ size = 40, className = "", style = {} }) {
  return (
    <div
      className={`skel skel-circle ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}

export function SkeletonCard({ height = 160, className = "", children, style = {} }) {
  return (
    <div
      className={`skel-card ${className}`}
      style={{ minHeight: height, ...style }}
    >
      {children}
    </div>
  );
}
