import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Login submitted", formData);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-sky-50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
        <Link to="/home" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          Back to Home
        </Link>
        <a href="#/interviews" onClick={(e) => { e.preventDefault(); window.location.href="#/interviews"; window.location.reload(); }} className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
          Explore Interviews
        </a>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:grid-cols-[1.1fr_0.9fr] md:p-10">
        <div className="rounded-[28px] bg-linear-to-br from-slate-900 via-sky-900 to-cyan-700 p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-200">AIX Access</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Sign in to continue your interview prep</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-sky-100">
            Resume your mock interviews, review AI feedback, and jump back into company-specific practice from one place.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              "Track your practice sessions",
              "Open technical and HR rounds instantly",
              "Keep your interview flow in one workspace",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-sky-50">
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center rounded-[28px] bg-slate-50 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Login</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Use any email and password for the current prototype flow.</p>

          <label className="mt-8 text-sm font-semibold text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
          />

          <label className="mt-5 text-sm font-semibold text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
          />

          <button
            type="submit"
            className="mt-8 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Sign In
          </button>

          <p className="mt-4 text-sm text-slate-500">
            New here?{" "}
            <a href="#/register" onClick={(e) => { e.preventDefault(); window.location.href="#/register"; window.location.reload(); }} className="font-semibold text-sky-600 hover:text-sky-700">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
