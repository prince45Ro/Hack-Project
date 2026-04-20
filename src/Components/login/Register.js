import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

function validateForm(values) {
  const nextErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10,15}$/;

  if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
  if (!values.email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    nextErrors.phone = "Phone number is required.";
  } else if (!phonePattern.test(values.phone.trim())) {
    nextErrors.phone = "Phone must be 10 to 15 digits.";
  }

  if (!values.password) {
    nextErrors.password = "Password is required.";
  } else if (values.password.length < 8) {
    nextErrors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    nextErrors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = "Passwords do not match.";
  }

  if (!values.agreeToTerms) {
    nextErrors.agreeToTerms = "You must accept the terms.";
  }

  return nextErrors;
}

function Register() {
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

    console.log("Registration submitted", formData);
    navigate("/verification");
  }

  function handleGoogleSignup() {
    console.log("Mock Google Signup submitted");
    navigate("/interviews");
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 font-sans">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:p-10 lg:p-12">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-500">
            Start practicing interviews with personalized AI coaching.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName}</p> : null}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              {errors.confirmPassword ? (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-5">
            <label className="inline-flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-500"
              />
              I agree to the Terms of Service and Privacy Policy.
            </label>
            {errors.agreeToTerms ? <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p> : null}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Create account
          </button>

          <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-slate-300 after:mt-0.5 after:flex-1 after:border-t after:border-slate-300">
            <p className="mx-4 mb-0 text-center text-sm font-medium text-slate-500">
              OR
            </p>
          </div>

          <GoogleAuthButton label="Continue with Google" onClick={handleGoogleSignup} />

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-slate-700 hover:text-slate-900">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
