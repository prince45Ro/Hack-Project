import { SkeletonLine, SkeletonBlock, SkeletonCard, SkeletonCircle } from "./SkeletonPulse";

/**
 * Auth page skeletons — NO sidebar/topbar shell, these are full-screen pages.
 *
 * LoginSkeleton: Centered glass card — title, subtitle, 2 inputs,
 *   checkbox row, button, divider, Google button, footer link
 *
 * RegisterSkeleton: Same card but with 5 inputs and a terms checkbox
 *
 * VerificationSkeleton: Split layout —
 *   left form (title, subtitle, OTP input, button, link)
 *   right branding panel (decorative + heading + dots)
 */

export function LoginSkeleton() {
  return (
    <div className="skel-auth-wrap">
      <div className="skel-auth-card">
        {/* Title */}
        <SkeletonLine width="200px" height={30} style={{ marginBottom: 10 }} />
        {/* Subtitle */}
        <SkeletonLine width="280px" height={14} style={{ marginBottom: 32 }} />

        {/* Email label + input */}
        <SkeletonLine width="100px" height={12} style={{ marginBottom: 8 }} />
        <SkeletonLine width="100%" height={44} style={{ borderRadius: 12, marginBottom: 20 }} />

        {/* Password label + input */}
        <SkeletonLine width="80px" height={12} style={{ marginBottom: 8 }} />
        <SkeletonLine width="100%" height={44} style={{ borderRadius: 12, marginBottom: 16 }} />

        {/* Remember me / Forgot */}
        <div className="skel-row-gap-sm" style={{ justifyContent: "space-between", marginBottom: 28 }}>
          <div className="skel-row-gap-sm">
            <SkeletonLine width="16px" height={16} style={{ borderRadius: 4 }} />
            <SkeletonLine width="90px" height={12} />
          </div>
          <SkeletonLine width="110px" height={12} />
        </div>

        {/* Login button */}
        <SkeletonLine width="100%" height={46} style={{ borderRadius: 12, marginBottom: 24 }} />

        {/* OR divider */}
        <div className="skel-row-gap-sm" style={{ marginBottom: 24 }}>
          <SkeletonLine width="100%" height={1} style={{ flex: 1 }} />
          <SkeletonLine width="28px" height={12} />
          <SkeletonLine width="100%" height={1} style={{ flex: 1 }} />
        </div>

        {/* Google button */}
        <SkeletonLine width="100%" height={46} style={{ borderRadius: 12, marginBottom: 20 }} />

        {/* Footer link */}
        <SkeletonLine width="180px" height={12} style={{ margin: "0 auto" }} />
      </div>
    </div>
  );
}

export function RegisterSkeleton() {
  return (
    <div className="skel-auth-wrap">
      <div className="skel-auth-card">
        {/* Title */}
        <SkeletonLine width="240px" height={30} style={{ marginBottom: 10 }} />
        {/* Subtitle */}
        <SkeletonLine width="320px" height={14} style={{ marginBottom: 32 }} />

        {/* 5 inputs: Name, Email, Phone, Password, Confirm */}
        {["160px", "120px", "130px", "100px", "150px"].map((labelW, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <SkeletonLine width="100%" height={44} style={{ borderRadius: 12 }} />
          </div>
        ))}

        {/* Terms checkbox */}
        <div className="skel-row-gap-sm" style={{ marginBottom: 24, marginTop: 4 }}>
          <SkeletonLine width="16px" height={16} style={{ borderRadius: 4, flexShrink: 0 }} />
          <SkeletonLine width="300px" height={12} />
        </div>

        {/* Create button */}
        <SkeletonLine width="100%" height={46} style={{ borderRadius: 12, marginBottom: 24 }} />

        {/* OR divider */}
        <div className="skel-row-gap-sm" style={{ marginBottom: 24 }}>
          <SkeletonLine width="100%" height={1} style={{ flex: 1 }} />
          <SkeletonLine width="28px" height={12} />
          <SkeletonLine width="100%" height={1} style={{ flex: 1 }} />
        </div>

        {/* Google button */}
        <SkeletonLine width="100%" height={46} style={{ borderRadius: 12, marginBottom: 20 }} />

        {/* Footer link */}
        <SkeletonLine width="200px" height={12} style={{ margin: "0 auto" }} />
      </div>
    </div>
  );
}

export function VerificationSkeleton() {
  return (
    <div className="skel-auth-wrap">
      <div className="skel-verification-card">
        {/* Left: Form side */}
        <div className="skel-verification-left">
          {/* Title */}
          <SkeletonLine width="240px" height={30} style={{ marginBottom: 10 }} />
          {/* Subtitle */}
          <SkeletonLine width="340px" height={14} style={{ marginBottom: 8 }} />
          <SkeletonLine width="200px" height={14} style={{ marginBottom: 32 }} />

          {/* Label */}
          <SkeletonLine width="130px" height={12} style={{ marginBottom: 10 }} />
          {/* OTP input */}
          <SkeletonLine width="100%" height={56} style={{ borderRadius: 8, marginBottom: 24 }} />

          {/* Verify button */}
          <SkeletonLine width="100%" height={48} style={{ borderRadius: 8, marginBottom: 24 }} />

          {/* Resend link */}
          <SkeletonLine width="200px" height={12} style={{ margin: "0 auto" }} />
        </div>

        {/* Right: Branding panel */}
        <div className="skel-verification-right">
          {/* Decorative box */}
          <SkeletonBlock height={180} style={{ borderRadius: 8, marginBottom: 40, opacity: 0.15 }} />

          {/* Spacer to push content to bottom */}
          <div style={{ flex: 1 }} />

          {/* Heading */}
          <SkeletonLine width="80%" height={32} style={{ marginBottom: 8 }} />
          <SkeletonLine width="60%" height={32} style={{ marginBottom: 16 }} />
          {/* Subtitle */}
          <SkeletonLine width="90%" height={14} style={{ marginBottom: 6 }} />
          <SkeletonLine width="70%" height={14} style={{ marginBottom: 32 }} />

          {/* Pagination dots */}
          <div className="skel-row-gap-sm" style={{ gap: 10 }}>
            <SkeletonCircle size={8} />
            <SkeletonLine width="32px" height={8} style={{ borderRadius: 4 }} />
            <SkeletonCircle size={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
