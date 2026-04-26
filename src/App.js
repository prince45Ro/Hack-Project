import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import FlexibleDashboard from "./Components/FlexibleDashboard";
import Home from "./Components/Home";
import PlaceholderPage from "./Components/PlaceholderPage";
import Mock from "./Components/Mock";
import Technical from "./Components/Technical";
import HR from "./Components/HR";
import InterviewsHub from "./Components/InterviewsHub";
import Analytics from "./Components/Analytics";
import Pricing from "./Components/Pricing";
import Login from "./Components/login/login.js";
import Register from "./Components/login/Register.js";
import Verification from "./Components/login/Verification.js";
import LeaderboardPage from "./Components/LeaderboardPage";
import InterviewSession from "./Components/InterviewSession";
import { BRAND_LOGO_URL } from "./brandAssets";


import { useLocation } from "react-router-dom";

function hideSplineBrandingInRoot(root) {
  if (!root?.querySelectorAll) return;

  const selectors = [
    "a[href*='spline.design']",
    "a[aria-label*='Spline']",
    "a[title*='Spline']",
    "[part='logo']",
    "[part='watermark']",
    "[part='badge']",
    "[part='branding']",
    "[id*='logo']",
    "[id*='watermark']",
    "[class*='logo']",
    "[class*='watermark']",
  ];

  root.querySelectorAll(selectors.join(", ")).forEach((node) => {
    const signature = [
      node.textContent,
      node.getAttribute?.("href"),
      node.getAttribute?.("aria-label"),
      node.getAttribute?.("title"),
      node.id,
      typeof node.className === "string" ? node.className : "",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (!signature.includes("spline") && !signature.includes("logo") && !signature.includes("watermark")) {
      return;
    }

    node.setAttribute("hidden", "");
    node.style.setProperty("display", "none", "important");
    node.style.setProperty("visibility", "hidden", "important");
    node.style.setProperty("opacity", "0", "important");
    node.style.setProperty("pointer-events", "none", "important");
  });
}

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Disable smooth scrolling temporarily for instant snap to top
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Restore smooth scrolling if needed by other components
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 0);
  }, [pathname]);

  return null;
}

function AppBackground() {
  const splineRef = React.useRef(null);

  React.useEffect(() => {
    const viewer = splineRef.current;
    if (!viewer) return undefined;

    let hostObserver;
    let shadowObserver;
    let attempts = 0;

    const syncBranding = () => {
      hideSplineBrandingInRoot(viewer);

      if (viewer.shadowRoot) {
        hideSplineBrandingInRoot(viewer.shadowRoot);

        if (!shadowObserver) {
          shadowObserver = new MutationObserver(() => hideSplineBrandingInRoot(viewer.shadowRoot));
          shadowObserver.observe(viewer.shadowRoot, { childList: true, subtree: true });
        }
      }
    };

    hostObserver = new MutationObserver(syncBranding);
    hostObserver.observe(viewer, { childList: true, subtree: true });

    syncBranding();

    const intervalId = window.setInterval(() => {
      attempts += 1;
      syncBranding();

      if (viewer.shadowRoot && attempts >= 8) {
        window.clearInterval(intervalId);
      }
    }, 500);

    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 12000);

    return () => {
      hostObserver?.disconnect();
      shadowObserver?.disconnect();
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="app-background" aria-hidden="true">
      <div className="app-spline-wrap">
        <spline-viewer
          ref={splineRef}
          url="https://prod.spline.design/wirNeRsZznH8IDOm/scene.splinecode"
          className="app-spline-viewer"
        ></spline-viewer>
      </div>
      <div className="app-spline-badge-mask" />
    </div>
  );
}

function RouteSkeletonOverlay() {
  const { pathname } = useLocation();
  const [visible, setVisible] = React.useState(false);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVisible(true);
    const timeoutId = window.setTimeout(() => setVisible(false), 420);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <div className={`route-skeleton-overlay ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <div className="route-skeleton-shell">
        <div className="route-skeleton-sidebar">
          <div className="route-skeleton-line route-skeleton-logo"></div>
          <div className="route-skeleton-line route-skeleton-menu"></div>
          <div className="route-skeleton-line route-skeleton-menu"></div>
          <div className="route-skeleton-line route-skeleton-menu"></div>
          <div className="route-skeleton-line route-skeleton-menu"></div>
          <div className="route-skeleton-line route-skeleton-menu"></div>
        </div>
        <div className="route-skeleton-main">
          <div className="route-skeleton-row top">
            <div className="route-skeleton-block tall"></div>
            <div className="route-skeleton-block"></div>
            <div className="route-skeleton-block"></div>
          </div>
          <div className="route-skeleton-row bottom">
            <div className="route-skeleton-block"></div>
            <div className="route-skeleton-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppFrame() {
  return (
    <div className="app-shell site-theme">
      <AppBackground />
      <div className="app-content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<FlexibleDashboard />} />
          <Route path="/interviews" element={<InterviewsHub />} />
          <Route path="/mock" element={<Mock />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/hr-interview" element={<HR />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/start" element={<Navigate to="/interviews" replace />} />
          <Route path="/mock-session" element={<InterviewSession mode="mock" />} />
          <Route path="/technical-session" element={<InterviewSession mode="technical" />} />
          <Route path="/hr-session" element={<InterviewSession mode="hr" />} />
          <Route path="/candidates" element={<PlaceholderPage title="Candidates" description="Candidate database and profiles." />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" description="Configure your AIX dashboard and account settings." />} />
          <Route path="/feature/smart-feedback" element={<PlaceholderPage title="Smart Feedback" description="AI generated smart feedback for your next round." />} />
          <Route path="/feature/restructure" element={<PlaceholderPage title="Restructure Answers" description="Turn raw answers into high-signal interview responses." />} />
          <Route path="/feature/revisit" element={<PlaceholderPage title="Revisit Sessions" description="Revisit previous interviews with AI feedback." />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <RouteSkeletonOverlay />
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red" }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppFrame />
      </HashRouter>
    </ErrorBoundary>
  );
}

const brandLogoMarkup = `
  <img
    src="${BRAND_LOGO_URL}"
    alt="Blackhole logo"
    class="brand-logo-image brand-logo-image--loading"
    referrerpolicy="no-referrer"
    draggable="false"
  />
`;

function renderFatalError(error) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const stack = error instanceof Error && error.stack ? error.stack : "";

  rootElement.innerHTML = `
    <div style="min-height:100vh;padding:24px;font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:#020617;color:#e2e8f0;">
      <div style="max-width:960px;margin:0 auto;background:linear-gradient(180deg, rgba(15,23,42,0.86), rgba(15,23,42,0.62));border:1px solid rgba(148,163,184,0.24);border-radius:24px;padding:24px;box-shadow:0 24px 80px rgba(2,6,23,0.42);backdrop-filter:blur(20px);">
        <div style="display:flex;align-items:center;gap:16px;margin:0 0 12px;">
          ${brandLogoMarkup}
          <h1 style="margin:0;font-size:28px;font-weight:800;color:#f8fafc;">Interview workspace failed to load</h1>
        </div>
        <p style="margin:0 0 16px;color:#94a3b8;">A startup error blocked the app from rendering. The details below should make the failure visible instead of leaving a blank page.</p>
        <pre style="margin:0;white-space:pre-wrap;word-break:break-word;background:#020814;color:#e2e8f0;padding:16px;border-radius:16px;overflow:auto;border:1px solid rgba(148,163,184,0.18);">${`${message}\n\n${stack}`.trim()}</pre>
      </div>
    </div>
  `;
}

window.addEventListener("error", (event) => {
  if (event.error) {
    renderFatalError(event.error);
  }
});

window.addEventListener("unhandledrejection", (event) => {
  renderFatalError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
});

const rootElement = document.getElementById("root");

if (rootElement) {
  rootElement.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:#020617;color:#e2e8f0;">
      <div style="text-align:center;padding:28px 32px;border-radius:28px;border:1px solid rgba(148,163,184,0.22);background:linear-gradient(180deg, rgba(15,23,42,0.78), rgba(15,23,42,0.52));box-shadow:0 24px 80px rgba(2,6,23,0.42);backdrop-filter:blur(18px);">
        <div style="display:flex;justify-content:center;">${brandLogoMarkup}</div>
        <div style="margin-top:8px;color:#94a3b8;">Loading interview workspace...</div>
      </div>
    </div>
  `;
}

try {
  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  renderFatalError(error);
}
