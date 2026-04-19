import { useState } from "react";
import {
  LogoIcon,
  SidebarToggleIcon,
  SparkIcon,
  FeedbackIcon,
  ArrowRightIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
} from "./Icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout({
  projectName = "AIX",
  projectSubtitle = "Interview AI",
  navItems = [],
  activeNav,
  setActiveNav,
  aiShortcuts = [],
  headerActions = null,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#e7ebf3] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-480 overflow-hidden rounded-[38px] bg-[#f9fbff] shadow-[0_30px_100px_rgba(15,23,42,0.08)]">
        <div className="lg:grid lg:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="flex min-h-full flex-col border-r border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <LogoIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[30px] font-bold tracking-tight text-slate-900">
                    {projectName}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {projectSubtitle}
                  </p>
                </div>
              </div>
            </div>

            <nav className="px-5 py-8">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  // Determine active state based on current URL path
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-slate-200 px-5 py-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                  AI Shortcuts
                </p>
                <SparkIcon className="h-4 w-4 text-sky-600" />
              </div>

              <div className="space-y-3">
                {aiShortcuts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className="group block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-white">
                          <Icon className="h-5 w-5 text-slate-700 transition group-hover:text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 transition group-hover:text-sky-700">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto px-5 pb-6">
              <button
                type="button"
                onClick={() => alert("Leave Feedback Clicked")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
              >
                <span className="flex items-center gap-3">
                  <FeedbackIcon className="h-5 w-5" />
                  Leave Feedback
                </span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </aside>

          {/* Main Area */}
          <main className="min-w-0 bg-[#f9fbff]">
            {/* Top Navigation */}
            <div className="border-b border-slate-200 bg-white px-6 py-5 lg:px-10">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <label className="flex w-full max-w-105 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <SearchIcon className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  {headerActions}

                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-500"
                    onClick={() => alert("Notifications Clicked")}
                  >
                    <BellIcon className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-3 rounded-2xl bg-white px-2 py-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-sky-400 via-cyan-400 to-indigo-500 text-sm font-bold text-white">
                      AX
                    </div>
                    <div className="pr-1">
                      <p className="text-sm font-semibold text-slate-900">User</p>
                      <p className="text-xs text-slate-400">Admin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="px-6 py-6 lg:px-10 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
