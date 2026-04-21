import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "./dashboard/DashboardLayout";
import { navItems, aiShortcuts } from "./dashboard/data";
import { INTERVIEW_QUESTION_BANK, inferInterviewScenario } from "../data/interviewQuestionBank";

const THEMES = {
  mock: { gradient: "from-sky-500 to-blue-600", lightBg: "bg-sky-50", lightBorder: "border-sky-200", lightText: "text-sky-700", badge: "bg-sky-100 text-sky-700 border-sky-200", label: "Mock Interview", icon: "🎯" },
  technical: { gradient: "from-indigo-500 to-violet-600", lightBg: "bg-indigo-50", lightBorder: "border-indigo-200", lightText: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700 border-indigo-200", label: "Technical Interview", icon: "💻" },
  hr: { gradient: "from-emerald-500 to-teal-600", lightBg: "bg-emerald-50", lightBorder: "border-emerald-200", lightText: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "HR Interview", icon: "🤝" },
};

function Panel({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] ${className}`}>{children}</div>;
}
function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${className}`}>{children}</span>;
}
function formatFileSize(b) { return b < 1024 ? b+" B" : b < 1048576 ? (b/1024).toFixed(1)+" KB" : (b/1048576).toFixed(1)+" MB"; }

const HISTORY_KEY = "aix_session_history_";
function loadHistory(m) { try { return JSON.parse(localStorage.getItem(HISTORY_KEY+m)) || []; } catch { return []; } }
function saveHistory(m, h) { try { localStorage.setItem(HISTORY_KEY+m, JSON.stringify(h.slice(-50))); } catch {} }

/* TTS */
function speakText(text, onEnd) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95; u.pitch = 1; u.lang = "en-US";
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
}
function stopSpeaking() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }

/* STT */
const SpeechRecognition = typeof window !== "undefined" ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

export default function InterviewSession({ mode = "mock" }) {
  const theme = THEMES[mode] || THEMES.mock;
  const navigate = useNavigate();
  const location = useLocation();
  const interview = location.state?.interview;

  const iv = interview || { title: theme.label, duration: "45 mins", questions: 12, difficulty: "Intermediate", description: "AI-guided interview practice.", category: mode === "hr" ? "HR" : mode === "technical" ? "Technical" : "Mock" };

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState("prep"); // "prep" | "interview" | "review"
  const [userAnswers, setUserAnswers] = useState([]);
  const [resume, setResume] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [history, setHistory] = useState(() => loadHistory(mode));
  const [expandedReview, setExpandedReview] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const recognitionRef = useRef(null);

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

  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { return () => { stopSpeaking(); if (recognitionRef.current) recognitionRef.current.abort(); }; }, []);

  const currentQ = questions[currentIdx] || null;
  const progress = questions.length ? ((currentIdx + 1) / questions.length) * 100 : 0;

  /* Speak question */
  const speakQuestion = useCallback(() => {
    if (!currentQ) return;
    setIsSpeaking(true);
    speakText(`Question ${currentIdx + 1}. ${currentQ.question}`, () => setIsSpeaking(false));
  }, [currentQ, currentIdx]);

  /* Auto-speak on question change */
  useEffect(() => { if (phase === "interview" && currentQ) speakQuestion(); }, [currentIdx, phase]);

  /* Voice recording */
  const startRecording = () => {
    if (!SpeechRecognition) { alert("Speech recognition not supported in this browser. Please use Chrome."); return; }
    const recognition = new SpeechRecognition();
    recognition.continuous = true; recognition.interimResults = true; recognition.lang = "en-US";
    let finalTranscript = userAnswers[currentIdx] || "";
    recognition.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript + " ";
        else interim += e.results[i][0].transcript;
      }
      setCurrentTranscript(finalTranscript + interim);
      setUserAnswers(prev => { const n = [...prev]; n[currentIdx] = finalTranscript.trim(); return n; });
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setCurrentTranscript(userAnswers[currentIdx] || "");
  };

  const stopRecording = () => {
    if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current = null; }
    setIsRecording(false);
  };

  const goNext = () => {
    stopSpeaking(); stopRecording();
    if (currentIdx < questions.length - 1) { setCurrentIdx(i => i + 1); setCurrentTranscript(""); }
  };
  const goPrev = () => {
    stopSpeaking(); stopRecording();
    if (currentIdx > 0) { setCurrentIdx(i => i - 1); setCurrentTranscript(""); }
  };

  const finishInterview = () => {
    stopSpeaking(); stopRecording();
    const sessionEntry = questions.map((q, i) => ({ ...q, userAnswer: userAnswers[i] || "", timestamp: Date.now() }));
    setHistory(prev => { const next = [...prev, ...sessionEntry]; saveHistory(mode, next); return next; });
    setPhase("review");
  };

  /* Resume */
  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) { alert("Please upload a PDF or DOC/DOCX file."); return; }
    setResume({ name: file.name, size: file.size });
  };

  /* ─── REVIEW PHASE ─── */
  if (phase === "review") {
    return (
      <DashboardLayout projectName="AIX" projectSubtitle="Interview AI" navItems={navItems} activeNav="Interviews" setActiveNav={() => {}} aiShortcuts={aiShortcuts}>
        <div className="transition-all duration-500" style={{ opacity: visible ? 1 : 0 }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3"><span className="text-2xl">{theme.icon}</span><h1 className="text-2xl font-bold text-slate-900">{iv.title} — Review</h1></div>
              <p className="mt-1 text-sm text-slate-500">Review your answers alongside AI model answers</p>
            </div>
            <button onClick={() => navigate(-1)} className={`px-5 py-3 rounded-2xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-bold shadow-md hover:shadow-lg transition-all`}>← Back to Interviews</button>
          </div>

          <div className="grid gap-4">
            {questions.map((q, i) => {
              const open = expandedReview === i;
              return (
                <div key={q.id} className={`rounded-2xl border transition-all ${open ? `${theme.lightBorder} ${theme.lightBg}` : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <button onClick={() => setExpandedReview(open ? null : i)} className="w-full flex items-center justify-between gap-3 p-5 text-left">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${open ? `bg-gradient-to-br ${theme.gradient} text-white` : "bg-slate-100 text-slate-600"}`}>{i+1}</span>
                      <p className="text-sm font-medium text-slate-800 truncate">{q.question}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {userAnswers[i]?.trim() ? <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Answered</Badge> : <Badge className="bg-amber-100 text-amber-700 border-amber-200">Skipped</Badge>}
                      <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Your Answer</p>
                        <p className="text-sm leading-7 text-slate-700">{userAnswers[i]?.trim() || <span className="italic text-slate-400">No answer recorded</span>}</p>
                      </div>
                      <div className={`rounded-2xl border ${theme.lightBorder} p-4 ${theme.lightBg}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.lightText} mb-2`}>✨ AI Model Answer</p>
                        <p className="text-sm leading-7 text-slate-700">{q.bestAnswer}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge className={theme.badge}>{q.framework}</Badge>
                          <Badge className="bg-slate-100 text-slate-500 border-slate-200">{q.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ─── PREP / CONFIRMATION PHASE ─── */
  if (phase === "prep") {
    const guidelines = [
      { icon: "🎤", title: "Voice-Based Answers", desc: "The AI will ask questions aloud. Click Record and speak your answer naturally." },
      { icon: "⏱️", title: `${iv.questions || 12} Questions · ${iv.duration}`, desc: "Take your time with each question. You can navigate back and forth." },
      { icon: "🧠", title: "AI Model Answers", desc: "After finishing, review AI-recommended answers compared to yours." },
      { icon: "📄", title: "Resume Upload", desc: "Optionally upload your resume to help tailor the session." },
    ];

    const tips = [
      "Use the STAR method (Situation, Task, Action, Result) for behavioral questions.",
      "Speak clearly and at a natural pace for best voice transcription.",
      "It's okay to pause and collect your thoughts before answering.",
      "Focus on specific examples rather than generic responses.",
    ];

    return (
      <DashboardLayout projectName="AIX" projectSubtitle="Interview AI" navItems={navItems} activeNav="Interviews" setActiveNav={() => {}} aiShortcuts={aiShortcuts}>
        <div className="transition-all duration-500" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${theme.gradient} text-4xl shadow-xl mb-5`}>
                {theme.icon}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{iv.title}</h1>
              <p className="mt-2 text-slate-500 text-base max-w-md mx-auto">{iv.description}</p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Badge className={theme.badge}>{iv.difficulty}</Badge>
                <Badge className="bg-slate-100 text-slate-600 border-slate-200">{iv.duration}</Badge>
                <Badge className="bg-slate-100 text-slate-600 border-slate-200">{iv.questions || 12} Questions</Badge>
              </div>
            </div>

            {/* Session Guidelines */}
            <Panel className="mb-6">
              <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${theme.lightText} mb-4`}>What to Expect</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {guidelines.map((g) => (
                  <div key={g.title} className={`flex gap-4 p-4 rounded-2xl border ${theme.lightBorder} ${theme.lightBg} transition-all hover:scale-[1.01]`}>
                    <span className="text-2xl flex-shrink-0">{g.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{g.title}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-5">{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Tips */}
            <Panel className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600 mb-4">💡 Pro Tips</p>
              <div className="space-y-3">
                {tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[11px] font-black mt-0.5">{i + 1}</span>
                    <p className="text-sm text-slate-700 leading-6">{tip}</p>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => navigate(-1)} className="px-6 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                ← Go Back
              </button>
              <button onClick={() => setPhase("interview")} className={`px-8 py-3.5 rounded-2xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Begin Interview
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ─── INTERVIEW PHASE ─── */
  return (
    <DashboardLayout projectName="AIX" projectSubtitle="Interview AI" navItems={navItems} activeNav="Interviews" setActiveNav={() => {}} aiShortcuts={aiShortcuts}>
      <div className="transition-all duration-500 ease-out" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => { stopSpeaking(); stopRecording(); navigate(-1); }} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back
            </button>
            <div>
              <div className="flex items-center gap-3"><span className="text-2xl">{theme.icon}</span><h1 className="text-2xl font-bold text-slate-900 tracking-tight">{iv.title}</h1></div>
              <p className="mt-1 text-sm text-slate-500">{iv.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={theme.badge}>{iv.difficulty}</Badge>
            <Badge className="bg-slate-100 text-slate-600 border-slate-200">{iv.duration}</Badge>
            <Badge className="bg-slate-100 text-slate-600 border-slate-200">{questions.length} Qs</Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`} style={{ width: `${progress}%` }} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Left — Question + Voice */}
          <div className="space-y-6">
            <Panel>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${theme.lightText}`}>AI Interviewer</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">{currentQ ? `Question ${currentIdx+1} of ${questions.length}` : "Preparing..."}</h2>
                </div>
                <Badge className={theme.badge}>{Math.round(progress)}%</Badge>
              </div>

              {currentQ && (
                <div className="space-y-5">
                  {/* Question */}
                  <div className={`rounded-2xl border ${theme.lightBorder} ${theme.lightBg} p-5`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${theme.gradient} text-xs font-black text-white`}>AI</div>
                      <div className="flex-1"><p className="text-sm font-semibold text-slate-900">Interviewer</p><p className="text-xs text-slate-500">{currentQ.framework}</p></div>
                      <button onClick={() => isSpeaking ? (stopSpeaking(), setIsSpeaking(false)) : speakQuestion()} className={`p-2 rounded-xl transition-all ${isSpeaking ? "bg-red-100 text-red-600 animate-pulse" : `${theme.lightBg} ${theme.lightText} hover:scale-105`}`} title={isSpeaking ? "Stop" : "Listen"}>
                        {isSpeaking ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" /></svg>
                         : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z" /></svg>}
                      </button>
                    </div>
                    <p className="text-base leading-7 text-slate-800 font-medium">{currentQ.question}</p>
                  </div>

                  {/* Voice Answer */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Your Answer (Voice)</p>
                      <button
                        onClick={() => isRecording ? stopRecording() : startRecording()}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isRecording ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse" : `bg-gradient-to-r ${theme.gradient} text-white shadow-md hover:shadow-lg hover:scale-[1.02]`}`}
                      >
                        {isRecording ? (
                          <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>Stop</>
                        ) : (
                          <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m14 0a7 7 0 00-14 0m14 0v1a7 7 0 01-14 0v-1m7 8v4m-4 0h8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" /></svg>Record</>
                        )}
                      </button>
                    </div>
                    <div className="min-h-[80px] rounded-xl bg-white border border-slate-200 p-4 text-sm text-slate-700 leading-7">
                      {(isRecording ? currentTranscript : userAnswers[currentIdx]) || <span className="text-slate-400 italic">Click "Record" and speak your answer...</span>}
                    </div>
                    {isRecording && <div className="mt-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-xs text-red-500 font-semibold">Listening...</span></div>}
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button onClick={goPrev} disabled={currentIdx === 0} className="px-5 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition disabled:opacity-40 disabled:cursor-not-allowed">← Previous</button>
                    <span className="text-xs font-semibold text-slate-400">{currentIdx+1} / {questions.length}</span>
                    {currentIdx < questions.length - 1 ? (
                      <button onClick={goNext} className={`px-5 py-3 rounded-2xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-bold shadow-md hover:shadow-lg transition-all`}>Next →</button>
                    ) : (
                      <button onClick={finishInterview} className="px-5 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all">✓ Finish & Review</button>
                    )}
                  </div>
                </div>
              )}
            </Panel>
          </div>

          {/* Right — Resume + History */}
          <div className="space-y-6">
            {/* Resume Upload */}
            <Panel>
              <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${theme.lightText}`}>Resume</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">Upload Your Resume</h3>
              <p className="mt-1 text-xs text-slate-500">PDF or DOC/DOCX</p>
              {!resume ? (
                <div onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                  className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all cursor-pointer ${dragOver ? `${theme.lightBorder} ${theme.lightBg}` : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}
                  onClick={() => document.getElementById(`resume-${mode}`).click()}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Drag & drop or click to browse</p>
                  <input id={`resume-${mode}`} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => handleFile(e.target.files[0])} />
                </div>
              ) : (
                <div className={`mt-4 flex items-center gap-4 rounded-2xl border ${theme.lightBorder} ${theme.lightBg} p-4`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-900 truncate">{resume.name}</p><p className="text-xs text-slate-500">{formatFileSize(resume.size)}</p></div>
                  <button onClick={() => setResume(null)} className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">✕</button>
                </div>
              )}
            </Panel>

            {/* Past Session History */}
            <Panel>
              <div className="flex items-center justify-between mb-1">
                <div><p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${theme.lightText}`}>Past Sessions</p><h3 className="mt-2 text-lg font-semibold text-slate-950">History</h3></div>
                {history.length > 0 && <button onClick={() => { setHistory([]); localStorage.removeItem(HISTORY_KEY+mode); }} className="text-xs font-semibold text-slate-400 hover:text-red-500 transition">Clear</button>}
              </div>
              <p className="text-xs text-slate-500 mb-4">{history.length} question{history.length !== 1 ? "s" : ""} saved</p>
              {history.length === 0 && <div className="py-8 text-center"><p className="text-sm text-slate-400">Complete an interview to see history</p></div>}
              <div className="space-y-2 max-h-[350px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                {history.slice(-15).reverse().map((h, idx) => (
                  <div key={`${h.id}-${idx}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-medium text-slate-800 truncate">{h.question}</p>
                    {h.userAnswer && <p className="text-[11px] text-emerald-600 mt-1 truncate">You: {h.userAnswer}</p>}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
