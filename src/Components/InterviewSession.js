import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { INTERVIEW_QUESTION_BANK, inferInterviewScenario } from "../data/interviewQuestionBank";

const MODE_META = {
  mock: { label: "Mock Interview", track: "MOCK", icon: "🎯" },
  technical: { label: "Technical Interview", track: "TECHNICAL", icon: "💻" },
  hr: { label: "HR Interview", track: "HR", icon: "🤝" },
};

const HISTORY_KEY = "aix_session_history_";
function loadHistory(m) { try { return JSON.parse(localStorage.getItem(HISTORY_KEY + m)) || []; } catch { return []; } }
function saveHistory(m, h) { try { localStorage.setItem(HISTORY_KEY + m, JSON.stringify(h.slice(-50))); } catch {} }

const AI_INTERVIEWER_SPLINE_URL = "https://prod.spline.design/90lsZuOZPb5BzOOC/scene.splinecode";

/* TTS */
function pickNaturalVoice() {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices?.length) return null;
  const indianMaleHints = [
    /Ravi/i,
    /Prabhat/i,
    /Aarav/i,
    /Karan/i,
    /Male/i,
    /Man/i,
    /Google English India/i,
    /Microsoft.*India/i,
  ];
  const naturalHints = [/Neural/i, /Natural/i, /Premium/i, /Enhanced/i];

  const indianLocalMale = voices.find(
    (v) =>
      v.localService &&
      v.lang?.toLowerCase().startsWith("en-in") &&
      indianMaleHints.some((pattern) => pattern.test(v.name))
  );
  if (indianLocalMale) return indianLocalMale;

  const indianMaleNatural = voices.find(
    (v) =>
      v.localService &&
      v.lang?.toLowerCase().startsWith("en-in") &&
      indianMaleHints.some((pattern) => pattern.test(v.name)) &&
      naturalHints.some((pattern) => pattern.test(v.name))
  );
  if (indianMaleNatural) return indianMaleNatural;

  const indianMaleAny = voices.find(
    (v) =>
      v.lang?.toLowerCase().startsWith("en-in") &&
      indianMaleHints.some((pattern) => pattern.test(v.name))
  );
  if (indianMaleAny) return indianMaleAny;

  const indianAny = voices.find((v) => v.lang?.toLowerCase().startsWith("en-in"));
  if (indianAny) return indianAny;

  const enUS = voices.find((v) => v.lang?.toLowerCase().startsWith("en-us"));
  const enAny = voices.find((v) => v.lang?.toLowerCase().startsWith("en"));
  return enUS || enAny || voices[0];
}

function toNaturalSpeechText(text) {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ")
    .replace(/\s*[:;]\s*/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getVoiceLockLabel() {
  const selected = pickNaturalVoice();
  return selected?.name ? `${selected.name} (${selected.lang || "unknown"})` : "No voice detected";
}

function speakText(text, onEnd) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(toNaturalSpeechText(text));
  const selectedVoice = pickNaturalVoice();
  u.voice = selectedVoice;
  u.rate = 0.9;
  u.pitch = 0.9;
  u.volume = 1;
  u.lang = "en-IN";
  u.voiceURI = u.voice?.voiceURI || "";
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
  return selectedVoice;
}
function stopSpeaking() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }

/* STT */
const SpeechRecognition = typeof window !== "undefined" ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

function hideSplineBranding(root) {
  if (!root?.querySelectorAll) return;
  const selectors = [
    "a[href*='spline.design']", "a[aria-label*='Spline']", "a[title*='Spline']",
    "[part='logo']", "[part='watermark']", "[part='badge']", "[part='branding']",
    "[id*='logo']", "[id*='watermark']", "[class*='logo']", "[class*='watermark']",
  ];
  root.querySelectorAll(selectors.join(", ")).forEach((node) => {
    const sig = [node.textContent, node.getAttribute?.("href"), node.getAttribute?.("aria-label"),
      node.getAttribute?.("title"), node.id, typeof node.className === "string" ? node.className : ""]
      .filter(Boolean).join(" ").toLowerCase();
    if (!sig.includes("spline") && !sig.includes("logo") && !sig.includes("watermark")) return;
    node.setAttribute("hidden", "");
    node.style.setProperty("display", "none", "important");
    node.style.setProperty("visibility", "hidden", "important");
    node.style.setProperty("opacity", "0", "important");
    node.style.setProperty("pointer-events", "none", "important");
  });
}

/* ── Spline 3D Orb ── */
function SplineOrb() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    let ho, so, a = 0;
    const sync = () => { hideSplineBranding(v); if (v.shadowRoot) { hideSplineBranding(v.shadowRoot); if (!so) { so = new MutationObserver(() => hideSplineBranding(v.shadowRoot)); so.observe(v.shadowRoot, { childList: true, subtree: true }); } } };
    ho = new MutationObserver(sync); ho.observe(v, { childList: true, subtree: true }); sync();
    const iv = setInterval(() => { a++; sync(); if (v.shadowRoot && a >= 8) clearInterval(iv); }, 500);
    const to = setTimeout(() => clearInterval(iv), 12000);
    return () => { ho?.disconnect(); so?.disconnect(); clearInterval(iv); clearTimeout(to); };
  }, []);
  return <spline-viewer ref={ref} url={AI_INTERVIEWER_SPLINE_URL} className="arena-spline-viewer" />;
}

/* ── Timer Hook ── */
function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const running = useRef(true);
  useEffect(() => {
    const id = setInterval(() => { if (running.current) setSeconds(s => s + 1); }, 1000);
    return () => clearInterval(id);
  }, []);
  const pause = () => { running.current = false; };
  const resume = () => { running.current = true; };
  const reset = () => setSeconds(0);
  const fmt = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return { seconds, fmt, pause, resume, reset };
}

/* ── Fake live metrics ── */
function useMetrics(answer) {
  const words = (answer || "").trim().split(/\s+/).filter(Boolean).length;
  const clarity = Math.min(99, 60 + Math.floor(words * 1.2));
  const pace = Math.min(99, 55 + Math.floor(words * 0.8));
  const signal = Math.min(99, 45 + Math.floor(words * 1.5));
  return { clarity, pace, signal, words };
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════ */
export default function InterviewSession({ mode = "mock" }) {
  const meta = MODE_META[mode] || MODE_META.mock;
  const navigate = useNavigate();
  const location = useLocation();
  const interview = location.state?.interview;
  const userProfileImage = location.state?.user?.photoURL || "";
  const userDisplayName = location.state?.user?.name || "User";
  const iv = interview || { title: meta.label, duration: "45 mins", questions: 12, difficulty: "Intermediate", description: "AI-guided interview practice.", category: mode === "hr" ? "HR" : mode === "technical" ? "Technical" : "Mock" };

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState("prep");
  const [userAnswers, setUserAnswers] = useState([]);
  const [history, setHistory] = useState(() => loadHistory(mode));
  const [expandedReview, setExpandedReview] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isSplineExpanded, setIsSplineExpanded] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [voiceLockLabel, setVoiceLockLabel] = useState("Detecting voice...");
  const [resumeFileName, setResumeFileName] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const recognitionRef = useRef(null);
  const manualStopRef = useRef(false);
  const restartTimeoutRef = useRef(null);
  const userVideoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const timer = useTimer();
  const userInitial = (userDisplayName || "U").trim().charAt(0).toUpperCase();

  useEffect(() => {
    const scenarioKey = inferInterviewScenario(iv);
    const pool = INTERVIEW_QUESTION_BANK.filter(q => q.scenarioKey === scenarioKey);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(iv.questions || 12, shuffled.length));
    setQuestions(picked);
    setUserAnswers(Array(picked.length).fill(""));
    setCurrentIdx(0);
    setPhase("prep");
  }, [iv.title, iv.category]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      if (recognitionRef.current) recognitionRef.current.abort();
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
        cameraStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setVoiceLockLabel("Speech synthesis not supported");
      return;
    }
    const syncVoice = () => setVoiceLockLabel(getVoiceLockLabel());
    syncVoice();
    window.speechSynthesis.onvoiceschanged = syncVoice;
    return () => {
      if (window.speechSynthesis.onvoiceschanged === syncVoice) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function startCameraPreview() {
      if (!isSplineExpanded || !cameraEnabled || !navigator.mediaDevices?.getUserMedia) {
        if (cameraStreamRef.current) {
          cameraStreamRef.current.getTracks().forEach((track) => track.stop());
          cameraStreamRef.current = null;
        }
        if (userVideoRef.current) userVideoRef.current.srcObject = null;
        setCameraReady(false);
        setCameraError("");
        return;
      }
      try {
        if (cameraStreamRef.current) {
          cameraStreamRef.current.getTracks().forEach((track) => track.stop());
          cameraStreamRef.current = null;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        cameraStreamRef.current = stream;
        const videoEl = userVideoRef.current;
        if (videoEl) {
          videoEl.srcObject = stream;
          await videoEl.play().catch(() => {});
        }
        setCameraReady(stream.getVideoTracks().some((track) => track.readyState === "live"));
        setCameraError("");
      } catch {
        setCameraReady(false);
        setCameraError("Camera unavailable");
      }
    }
    startCameraPreview();
    return () => { mounted = false; };
  }, [isSplineExpanded, cameraEnabled]);

  const currentQ = questions[currentIdx] || null;
  const progress = questions.length ? ((currentIdx + 1) / questions.length) * 100 : 0;
  const metrics = useMetrics(userAnswers[currentIdx]);

  const startRecording = () => {
    if (!micEnabled) { alert("Mic is turned off. Enable mic first."); return; }
    if (!SpeechRecognition) { alert("Speech recognition not supported. Please use Chrome."); return; }
    if (isRecording) return;
    manualStopRef.current = false;
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true; recognition.interimResults = true; recognition.lang = "en-IN";
    let finalTranscript = userAnswers[currentIdx] || "";
    recognition.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript + " ";
        else interim += e.results[i][0].transcript;
      }
      setCurrentTranscript(finalTranscript + interim);
      setUserAnswers(prev => {
        const n = [...prev];
        n[currentIdx] = (finalTranscript + interim).trim();
        return n;
      });
    };
    recognition.onerror = (event) => {
      setIsRecording(false);
      recognitionRef.current = null;
      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        manualStopRef.current = true;
      }
    };
    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
      if (!manualStopRef.current && micEnabled && phase === "interview") {
        restartTimeoutRef.current = setTimeout(() => {
          if (!manualStopRef.current && micEnabled && phase === "interview") startRecording();
        }, 250);
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setCurrentTranscript(userAnswers[currentIdx] || "");
  };

  const stopRecording = () => {
    manualStopRef.current = true;
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    setUserAnswers(prev => {
      const n = [...prev];
      n[currentIdx] = (currentTranscript || n[currentIdx] || "").trim();
      return n;
    });
    if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current = null; }
    setIsRecording(false);
  };

  const speakQuestion = useCallback(() => {
    if (!currentQ) return;
    setIsSpeaking(true);
    const activeVoice = speakText(currentQ.question, () => {
      setIsSpeaking(false);
    });
    if (activeVoice?.name) {
      setVoiceLockLabel(`${activeVoice.name} (${activeVoice.lang || "unknown"})`);
    }
  }, [currentQ]);

  useEffect(() => { if (phase === "interview" && currentQ) speakQuestion(); }, [currentIdx, phase]);

  const goNext = () => {
    stopSpeaking(); stopRecording(); timer.reset();
    if (currentIdx < questions.length - 1) { setCurrentIdx(i => i + 1); setCurrentTranscript(""); }
  };

  const goPrev = () => {
    stopSpeaking(); stopRecording(); timer.reset();
    if (currentIdx > 0) { setCurrentIdx(i => i - 1); setCurrentTranscript(""); }
  };

  const finishInterview = () => {
    stopSpeaking(); stopRecording(); timer.pause();
    const sessionEntry = questions.map((q, i) => ({ ...q, userAnswer: userAnswers[i] || "", timestamp: Date.now() }));
    setHistory(prev => { const next = [...prev, ...sessionEntry]; saveHistory(mode, next); return next; });
    setPhase("review");
  };

  /* ─── REVIEW PHASE ─── */
  if (phase === "review") {
    return (
      <div className="arena-shell">
        {/* Top bar */}
        <div className="arena-topbar">
          <div className="arena-breadcrumb">
            <span>ARENA</span><span className="arena-bc-sep">›</span>
            <span className="arena-bc-track">{meta.track}</span><span className="arena-bc-sep">•</span>
            <span className="arena-bc-mode">REVIEW</span>
          </div>
          <button className="arena-end-btn" onClick={() => navigate(-1)}>
            BACK TO INTERVIEWS <span style={{ fontSize: 16 }}>×</span>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, textTransform: "uppercase", margin: "0 0 24px", color: "#fff" }}>
            Session Review
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {questions.map((q, i) => {
              const open = expandedReview === i;
              return (
                <div key={q.id} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, background: open ? "rgba(255,85,0,0.06)" : "rgba(255,255,255,0.02)", transition: "all 0.2s" }}>
                  <button onClick={() => setExpandedReview(open ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 20px", background: "none", border: "none", color: "#fff", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, background: open ? "#FF5500" : "rgba(255,255,255,0.08)", color: "#fff" }}>{i + 1}</span>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.question}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: userAnswers[i]?.trim() ? "rgba(34,197,94,0.15)" : "rgba(255,170,0,0.15)", color: userAnswers[i]?.trim() ? "#4ade80" : "#fbbf24" }}>
                        {userAnswers[i]?.trim() ? "Answered" : "Skipped"}
                      </span>
                      <svg style={{ width: 16, height: 16, color: "rgba(255,255,255,0.3)", transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "0 20px 20px", display: "grid", gap: 12 }}>
                      <div style={{ borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: 16 }}>
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", margin: "0 0 8px" }}>Your Answer</p>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>{userAnswers[i]?.trim() || <em style={{ color: "rgba(255,255,255,0.25)" }}>No answer recorded</em>}</p>
                      </div>
                      <div style={{ borderRadius: 8, border: "1px solid rgba(255,85,0,0.2)", background: "rgba(255,85,0,0.04)", padding: 16 }}>
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", color: "#FF5500", textTransform: "uppercase", margin: "0 0 8px" }}>✦ AI Model Answer</p>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>{q.bestAnswer}</p>
                        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(255,85,0,0.12)", color: "#FF5500" }}>{q.framework}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>{q.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ─── PREP PHASE ─── */
  if (phase === "prep") {
    const guidelines = [
      { icon: "🎤", title: "Voice-Based Answers", desc: "The AI asks questions aloud. Click Voice and speak naturally." },
      { icon: "⏱️", title: `${iv.questions || 12} Questions · ${iv.duration}`, desc: "Take your time. Navigate freely between questions." },
      { icon: "🧠", title: "AI Model Answers", desc: "After finishing, compare your answers with AI recommendations." },
      { icon: "📊", title: "Live Metrics", desc: "Track clarity, pace, and signal strength in real-time." },
    ];

    return (
      <div className="arena-shell">
        <div className="arena-topbar">
          <div className="arena-breadcrumb">
            <span>ARENA</span><span className="arena-bc-sep">›</span>
            <span className="arena-bc-track">{meta.track}</span><span className="arena-bc-sep">•</span>
            <span className="arena-bc-mode">WARM-UP</span>
          </div>
          <button className="arena-end-btn" onClick={() => navigate(-1)}>
            GO BACK <span style={{ fontSize: 16 }}>×</span>
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
          <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>{meta.icon}</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em", color: "#fff", margin: "0 0 10px" }}>
              {iv.title}
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: "0 0 32px", lineHeight: 1.6 }}>{iv.description}</p>

            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
              {[iv.difficulty, iv.duration, `${iv.questions || 12} Questions`].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>{t}</span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, textAlign: "left", marginBottom: 40 }}>
              {guidelines.map(g => (
                <div key={g.title} style={{ padding: 18, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{g.icon}</span>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>{g.title}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{g.desc}</p>
                </div>
              ))}
            </div>

            <div className="resume-upload-shell" style={{ marginBottom: 24 }}>
              <button type="button" className="resume-upload-close-btn" aria-label="Clear selected resume" onClick={() => setResumeFileName("")}>
                ×
              </button>
              <div className="resume-upload-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16V8" />
                  <path d="M8.5 11.5 12 8l3.5 3.5" />
                </svg>
              </div>
              <div className="resume-upload-copy">
                <h2>Upload a Resume</h2>
                <p>Select a file to upload before interview start.</p>
              </div>
              <label className="resume-upload-input-wrap">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setResumeFileName(file?.name || "");
                  }}
                />
                <span>{resumeFileName || "Choose File"}</span>
              </label>
            </div>

            <button onClick={() => { setPhase("interview"); timer.reset(); }} className="arena-btn arena-btn--submit" style={{ padding: "16px 40px", fontSize: 14, borderRadius: 8 }}>
              <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
              BEGIN INTERVIEW
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════
     INTERVIEW PHASE — Arena Layout (matches image)
     ═══════════════════════════════════════════════ */
  return (
    <div className="arena-shell">
      {/* ── Top Bar ── */}
      <div className="arena-topbar">
        <div className="arena-breadcrumb">
          <span>ARENA</span>
          <span className="arena-bc-sep">›</span>
          <span className="arena-bc-track">{meta.track}</span>
          <span className="arena-bc-sep">•</span>
          <span className="arena-bc-mode">WARM-UP</span>
        </div>
        <button className="arena-end-btn" onClick={() => { stopSpeaking(); stopRecording(); navigate(-1); }}>
          END SESSION <span style={{ fontSize: 16 }}>×</span>
        </button>
      </div>

      {/* ── Progress Row ── */}
      <div className="arena-qrow">
        <span className="arena-qnum">/{String(currentIdx + 1).padStart(2, "0")}</span>
        <div className="arena-track-bar">
          <div className="arena-track-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="arena-qtotal">{questions.length} TOTAL</span>
      </div>

      {/* ── Main Two-Column ── */}
      <div className="arena-main">
        {/* LEFT — Spline Orb */}
        <div className="arena-left">
          <div className={`arena-spline-frame ${isSplineExpanded ? "arena-spline-frame--expanded" : ""}`}>
            <div className="arena-status-badge">
              <span className={`arena-status-dot ${isSpeaking || isRecording ? "arena-status-dot--on" : ""}`} />
              {isRecording ? "RECORDING" : isSpeaking ? "SPEAKING" : "LISTENING"}
            </div>
            <div className="arena-status-badge" style={{ top: 56, maxWidth: "min(70vw, 420px)" }} title={voiceLockLabel}>
              VOICE LOCK: {voiceLockLabel}
            </div>
            <button
              type="button"
              className="arena-expand-btn"
              onClick={() => setIsSplineExpanded((prev) => !prev)}
              aria-label={isSplineExpanded ? "Collapse robo view" : "Expand robo view"}
            >
              {isSplineExpanded ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 9-6-6" />
                  <path d="M3 8V3h5" />
                  <path d="m15 9 6-6" />
                  <path d="M16 3h5v5" />
                  <path d="m9 15-6 6" />
                  <path d="M3 16v5h5" />
                  <path d="m15 15 6 6" />
                  <path d="M21 16v5h-5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m8 3-5 5" />
                  <path d="M3 3h5v5" />
                  <path d="m16 3 5 5" />
                  <path d="M16 3h5v5" />
                  <path d="m8 21-5-5" />
                  <path d="M3 16v5h5" />
                  <path d="m16 21 5-5" />
                  <path d="M16 21h5v-5" />
                </svg>
              )}
            </button>
            {isSplineExpanded ? (
              <div className="arena-overlay-top-actions">
                <div className="arena-top-right-actions">
                  {currentIdx < questions.length - 1 ? (
                    <button type="button" className="arena-overlay-action-btn" onClick={goNext}>
                      Skip
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="arena-overlay-action-btn arena-overlay-action-btn--primary"
                    onClick={currentIdx < questions.length - 1 ? goNext : finishInterview}
                  >
                    {currentIdx < questions.length - 1 ? "Submit" : "Finish"}
                  </button>
                </div>
              </div>
            ) : null}
            <SplineOrb />
            {isSplineExpanded ? (
              <div className="arena-user-preview" aria-label="User camera preview">
                <p className="arena-user-preview-label">You</p>
                <div className="arena-user-preview-box">
                  <div className="arena-user-preview-controls">
                    <button
                      type="button"
                      className={`arena-user-control-btn ${micEnabled ? "is-on" : ""}`}
                      aria-label={micEnabled ? "Turn microphone off" : "Turn microphone on"}
                      onClick={() => {
                        if (isRecording) stopRecording();
                        setMicEnabled((prev) => !prev);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
                        <path d="M19 11a7 7 0 0 1-14 0" />
                        <path d="M12 18v3" />
                        <path d="M8 21h8" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`arena-user-control-btn ${cameraEnabled ? "is-on" : ""}`}
                      aria-label={cameraEnabled ? "Turn camera off" : "Turn camera on"}
                      onClick={() => setCameraEnabled((prev) => !prev)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="7" width="13" height="10" rx="2" />
                        <path d="m16 10 5-3v10l-5-3z" />
                      </svg>
                    </button>
                  </div>
                  {cameraEnabled && cameraReady ? (
                    <video
                      ref={userVideoRef}
                      className="arena-user-video"
                      autoPlay
                      muted
                      playsInline
                      onLoadedMetadata={(e) => {
                        e.currentTarget.play?.();
                        setCameraReady(true);
                      }}
                      onError={() => {
                        setCameraReady(false);
                        setCameraError("Camera unavailable");
                      }}
                    />
                  ) : userProfileImage ? (
                    <img src={userProfileImage} alt="Profile" className="arena-user-avatar-img" />
                  ) : (
                    <div className="arena-user-avatar-fallback">{userInitial}</div>
                  )}
                  {cameraEnabled && !cameraReady ? (
                    <div className="arena-user-preview-status">{cameraError || "Starting camera..."}</div>
                  ) : null}
                  <div className="arena-user-profile-chip">
                    {userProfileImage ? (
                      <img src={userProfileImage} alt={`${userDisplayName} profile`} className="arena-user-profile-chip-img" />
                    ) : (
                      <span className="arena-user-profile-chip-fallback">{userInitial}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {isSplineExpanded ? (
              <div className="arena-expanded-controls">
                <div>
                  <p className="arena-tone-label">QUESTION {currentIdx + 1}</p>
                  <p className="arena-expanded-question">{currentQ?.question || "Preparing your question..."}</p>
                  <p className="arena-expanded-subtitle">Speak naturally and keep your answer concise, structured, and impact-focused.</p>
                  <div
                    style={{
                      marginTop: 12,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      maxWidth: 560,
                    }}
                  >
                    <p style={{ margin: "0 0 6px", fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
                      LIVE VOICE TRANSCRIPT
                    </p>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
                      {currentTranscript?.trim() || userAnswers[currentIdx]?.trim() || "Start speaking to see your transcript here..."}
                    </p>
                  </div>
                </div>
                <div className="arena-expanded-actions">
                  <div className="arena-timer-display">
                    <svg style={{ width: 18, height: 18, opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2} /><path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
                    {timer.fmt}
                  </div>
                </div>
              </div>
            ) : (
              <div className="arena-spline-footer">
                <div>
                  <p className="arena-tone-label">TONE</p>
                  <p className="arena-tone-val">CALM. COACHING. BUILDS CONFIDENCE.</p>
                  <div
                    style={{
                      marginTop: 8,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 10,
                      padding: "8px 10px",
                      maxWidth: 420,
                    }}
                  >
                    <p style={{ margin: "0 0 4px", fontSize: 9, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
                      LIVE VOICE TRANSCRIPT
                    </p>
                    <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
                      {currentTranscript?.trim() || userAnswers[currentIdx]?.trim() || "Speak to capture your response..."}
                    </p>
                  </div>
                </div>
                <div className="arena-timer-display">
                  <svg style={{ width: 18, height: 18, opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2} /><path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
                  {timer.fmt}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Question + Response */}
        <div className="arena-right">
          <p className="arena-qlabel">QUESTION {currentIdx + 1} / {questions.length}</p>
          <h2 className="arena-qtext">{currentQ?.question || "Preparing your question..."}</h2>

          <p className="arena-resp-label">YOUR RESPONSE</p>
          <textarea
            className="arena-textarea"
            placeholder="Think out loud. Structure: situation → action → impact."
            value={isRecording ? currentTranscript : (userAnswers[currentIdx] || "")}
            onChange={e => {
              const val = e.target.value;
              setUserAnswers(prev => { const n = [...prev]; n[currentIdx] = val; return n; });
            }}
            readOnly={isRecording}
          />

          <div className="arena-meta-row">
            <span>{metrics.words} WORDS</span>
            <span>AUTO-ADVANCE AT 0:00</span>
          </div>

          {/* Action Buttons */}
          <div className="arena-action-row">
            {currentIdx > 0 && (
              <button className="arena-btn arena-btn--skip" onClick={goPrev}>
                <svg className="arena-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                PREV
              </button>
            )}
            <button
              className={`arena-btn ${isRecording ? "arena-btn--recording" : "arena-btn--voice"}`}
              onClick={() => isRecording ? stopRecording() : startRecording()}
            >
              {isRecording ? (
                <><svg className="arena-btn-icon" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>STOP</>
              ) : (
                <><svg className="arena-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m14 0a7 7 0 00-14 0m14 0v1a7 7 0 01-14 0v-1m7 8v4m-4 0h8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" /></svg>VOICE</>
              )}
            </button>

            {currentIdx < questions.length - 1 ? (
              <button className="arena-btn arena-btn--skip" onClick={goNext}>
                <svg className="arena-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="5 4 15 12 5 20" fill="currentColor" /><line x1="19" y1="5" x2="19" y2="19" strokeWidth={2.5} /></svg>
                SKIP
              </button>
            ) : null}

            {currentIdx < questions.length - 1 ? (
              <button className="arena-btn arena-btn--submit" onClick={goNext}>
                SUBMIT <svg className="arena-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            ) : (
              <button className="arena-btn arena-btn--submit" onClick={finishInterview}>
                FINISH <svg className="arena-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Metrics Strip ── */}
      <div className="arena-metrics">
        <div className="arena-metric-card">
          <p className="arena-metric-label">CLARITY</p>
          <p className="arena-metric-val">✦ {metrics.clarity}</p>
        </div>
        <div className="arena-metric-card">
          <p className="arena-metric-label">PACE</p>
          <p className="arena-metric-val">✦ {metrics.pace}</p>
        </div>
        <div className="arena-metric-card">
          <p className="arena-metric-label">SIGNAL</p>
          <p className="arena-metric-val">✦ {metrics.signal}</p>
        </div>
      </div>
    </div>
  );
}
