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
import { useLocation } from "react-router-dom";

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
          <Route path="/candidates" element={<PlaceholderPage title="Candidates" description="Candidate database and profiles." />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" description="Configure your AIX dashboard and account settings." />} />
          <Route path="/feature/smart-feedback" element={<PlaceholderPage title="Smart Feedback" description="AI generated smart feedback for your next round." />} />
          <Route path="/feature/restructure" element={<PlaceholderPage title="Restructure Answers" description="Turn raw answers into high-signal interview responses." />} />
          <Route path="/feature/revisit" element={<PlaceholderPage title="Revisit Sessions" description="Revisit previous interviews with AI feedback." />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}

function renderFatalError(error) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const stack = error instanceof Error && error.stack ? error.stack : "";

  rootElement.innerHTML = `
    <div style="min-height:100vh;padding:24px;font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:#f8fafc;color:#0f172a;">
      <div style="max-width:960px;margin:0 auto;background:white;border:1px solid #e2e8f0;border-radius:24px;padding:24px;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
        <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;">AIX failed to load</h1>
        <p style="margin:0 0 16px;color:#475569;">A startup error blocked the app from rendering. The details below should make the failure visible instead of leaving a blank page.</p>
        <pre style="margin:0;white-space:pre-wrap;word-break:break-word;background:#0f172a;color:#e2e8f0;padding:16px;border-radius:16px;overflow:auto;">${`${message}\n\n${stack}`.trim()}</pre>
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
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:#f8fafc;color:#0f172a;">
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:800;letter-spacing:-0.03em;">AIX</div>
        <div style="margin-top:8px;color:#64748b;">Loading interview workspace...</div>
      </div>
    </div>
  `;
}

try {
  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  renderFatalError(error);
}
