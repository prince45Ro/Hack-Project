import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  function handleChange(index, event) {
    const newCode = [...code];
    newCode[index] = event.target.value.slice(0, 1);
    setCode(newCode);
    if (event.target.value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Verification submitted", code.join(""));
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-sky-50 px-6 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-600">Security</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Verify Email</h1>
          <p className="mt-3 text-sm text-slate-500">
            We sent a 6-digit verification code to your email. Enter it below to confirm your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                className="w-12 h-14 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                maxLength={1}
              />
            ))}
          </div>

          <button type="submit" className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-800">
            Verify Account
          </button>
          
          <p className="mt-6 text-center text-sm text-slate-500">
            Didn't receive the code?{" "}
            <button type="button" className="font-semibold text-sky-600 hover:text-sky-700">Resend</button>
          </p>
        </form>
      </div>
    </div>
  );
}