import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";

const initialForm = {
  email: "",
  password: "",
  rememberMe: false,
};

function validateForm(values) {
  const nextErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    nextErrors.password = "Password is required.";
  } else if (values.password.length < 6) {
    nextErrors.password = "Password must be at least 6 characters.";
  }

  return nextErrors;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;

    setFormData((current) => ({ ...current, [name]: finalValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    console.log("Login submitted", formData);
    navigate("/interviews");
  }

  function handleGoogleLogin() {
    console.log("Mock Google Login submitted");
    navigate("/interviews");
  }

  return (
    <div className="min-h-screen px-4 py-8 font-sans flex items-center">
      <div className="liquid-glass-card mx-auto w-full max-w-xl rounded-3xl p-8 md:p-10 lg:p-12">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-300">
            Sign in to continue your interview journey.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="liquid-glass-input w-full rounded-xl px-4 py-3 text-slate-100 outline-none transition focus:border-sky-300"
              />
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="liquid-glass-input w-full rounded-xl px-4 py-3 text-slate-100 outline-none transition focus:border-sky-300"
              />
              {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-500"
              />
              Remember me
            </label>
            <Link to="/verification" className="font-medium text-slate-200 hover:text-white">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="liquid-glass-button mt-7 w-full rounded-xl px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5"
          >
            Login
          </button>

          <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-slate-300 after:mt-0.5 after:flex-1 after:border-t after:border-slate-300">
            <p className="mx-4 mb-0 text-center text-sm font-medium text-slate-400">
              OR
            </p>
          </div>

          <GoogleAuthButton label="Continue with Google" onClick={handleGoogleLogin} />

          <p className="mt-5 text-center text-sm text-slate-300">
            New here?{" "}
            <Link to="/register" className="font-semibold text-slate-100 hover:text-white">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
