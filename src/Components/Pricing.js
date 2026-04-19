import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started and trying out AIX.",
      features: [
        "1 Free Mock Interview per day",
        "Basic AI Feedback",
        "Standard Question Bank",
        "Email Support",
      ],
      buttonText: "Get Started",
      buttonLink: "/login",
      popular: false,
      color: "from-slate-700 to-slate-800",
      btnColor: "bg-slate-800 hover:bg-slate-700 text-white",
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/month",
      description: "Everything you need to confidently crack any interview.",
      features: [
        "Unlimited Mock Interviews",
        "Advanced AI Feedback & Scoring",
        "Company-specific FAANG Rounds",
        "Voice-to-Voice Interaction",
        "Detailed Performance Analytics",
        "Priority Support",
      ],
      buttonText: "Upgrade to Pro",
      buttonLink: "/login",
      popular: true,
      color: "from-cyan-500 to-blue-600",
      btnColor: "bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30",
    },
    {
      name: "Elite",
      price: "₹1999",
      period: "/month",
      description: "For serious candidates wanting 1-on-1 human coaching.",
      features: [
        "Everything in Pro",
        "1 Human Mock Interview / month",
        "Resume & LinkedIn Review",
        "Salary Negotiation Coaching",
        "Dedicated Career Mentor",
      ],
      buttonText: "Contact Us",
      buttonLink: "/login",
      popular: false,
      color: "from-indigo-600 to-purple-700",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Fixed 3D Glassy Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center bg-gray-900/50 backdrop-blur-2xl border border-gray-700/50 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-3px_5px_rgba(0,0,0,0.3)] rounded-full px-8 py-3 transition-all duration-300">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-3xl font-extrabold tracking-tight text-white hover:opacity-80 transition-opacity">
              AIX
            </Link>

            <nav className="hidden md:flex items-center gap-3">
              {["Home", "Features", "Pricing", "Dashboard", "About"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={(e) => {
                    if (item === "Features") {
                      e.preventDefault();
                      window.location.hash = "/home";
                      setTimeout(() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }), 150);
                    }
                  }}
                  className="relative px-4 py-2 rounded-full font-medium text-gray-200 bg-transparent transition-all duration-300 hover:bg-gray-800/60 hover:text-white hover:shadow-sm hover:scale-105"
                >
                  {item}
                </Link>
              ))}
              <a
                href="#/login"
                className="px-6 py-2.5 rounded-full font-semibold bg-white/10 backdrop-blur-2xl border border-white/30 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.6)] ml-2"
              >
                Login / SignUp
              </a>
            </nav>

            <button className="md:hidden p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Header */}
      <div className="pt-20 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Simple, transparent <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-blue-600">pricing</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the plan that best fits your interview preparation needs. No hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex-1 max-w-7xl mx-auto px-6 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl border ${plan.popular ? 'border-blue-400 shadow-2xl shadow-blue-500/10 md:-translate-y-4' : 'border-slate-200 shadow-lg'} p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.buttonLink}
                className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all duration-300 ${plan.btnColor}`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
