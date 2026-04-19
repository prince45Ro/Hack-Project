import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import FlexibleDashboard from "./Components/FlexibleDashboard";
import Home from "./Components/Home";
import PlaceholderPage from "./Components/PlaceholderPage";
import Mock from "./Components/Mock";
import Technical from "./Components/Technical";
import HR from "./Components/HR";
import InterviewsHub from "./Components/InterviewsHub";

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

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<FlexibleDashboard />} />
          <Route path="/interviews" element={<InterviewsHub />} />
          <Route path="/mock" element={<Mock />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/hr-interview" element={<HR />} />
          <Route path="/candidates" element={<PlaceholderPage title="Candidates" description="Candidate database and profiles." />} />
          <Route path="/leaderboard" element={<PlaceholderPage title="Leaderboard" description="Global rankings and top performers." />} />
          <Route path="/analytics" element={<PlaceholderPage title="Analytics" description="Deep dive into hiring metrics and analytics." />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" description="Configure your AIX dashboard and account settings." />} />
          <Route path="/feature/smart-feedback" element={<PlaceholderPage title="Smart Feedback" description="AI generated smart feedback for your next round." />} />
          <Route path="/feature/restructure" element={<PlaceholderPage title="Restructure Answers" description="Turn raw answers into high-signal interview responses." />} />
          <Route path="/feature/revisit" element={<PlaceholderPage title="Revisit Sessions" description="Revisit previous interviews with AI feedback." />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
