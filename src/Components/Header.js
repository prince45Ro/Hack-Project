import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto mt-2 w-[95%] rounded-full 
        bg-white/20 backdrop-blur-xl border border-white/30
        shadow-md px-8 py-3 flex items-center justify-between transition-all duration-300">

        {/* Logo */}
        <h1 className="text-white font-bold text-lg tracking-wide">
          AIX
        </h1>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 text-white/80">
          <a className="hover:text-white transition">Home</a>
          <a className="hover:text-white transition">Features</a>
          <a className="hover:text-white transition">Pricing</a>
          <a className="hover:text-white transition">Contact</a>
        </nav>

        {/* Button */}
        <button className="px-4 py-2 rounded-xl 
          bg-white/20 hover:bg-white/30 transition
          backdrop-blur-md border border-white/20 text-white">
          Get Started
        </button>
      </div>
    </header>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative overflow-hidden text-gray-800 min-h-screen">
      {/* Background - Beautiful Light Mesh Gradient */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-[#f8fafc] overflow-hidden">
        {/* Animated glowing orbs for a modern, light mesh gradient effect */}
        <div className="absolute -top-40 -left-40 w-160 h-160 bg-blue-200/40 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/4 -right-20 w-140 h-140 bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 left-1/4 w-180 h-180 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-sky-200/40 rounded-full blur-3xl"></div>
      </div>

      {/* 3D Waving Dots Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 flex items-center justify-center" style={{ perspective: '800px' }}>
        <div className="flex flex-wrap w-[150%] max-w-300 justify-center" style={{ transform: 'rotateX(60deg) scale(1.5)', transformStyle: 'preserve-3d' }}>
          {Array.from({ length: 400 }).map((_, i) => {
            const x = i % 25;
            const y = Math.floor(i / 25);
            return (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-cyan-500 m-3 animate-wave shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{
                  animationDelay: `${(x + y) * 0.15}s`,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Subtle grid pattern for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10 pointer-events-none"></div>

      {/* Fixed Glassy Navbar — single unified bar, AIX & Login collapse on scroll */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
        <div
          className="relative overflow-hidden mx-auto hidden md:flex items-center backdrop-blur-2xl"
          style={{
            maxWidth: isScrolled ? '750px' : '1280px',
            padding: '12px 32px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(17, 24, 39, 0.5)',
            border: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.25)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/15 to-transparent -skew-x-12 animate-glass-shine"></div>
          </div>

          {/* PART 1: AIX Logo — collapses left on scroll */}
          <div
            style={{
              maxWidth: isScrolled ? '0px' : '120px',
              opacity: isScrolled ? 0 : 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              marginRight: isScrolled ? '0px' : '8px',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="relative z-10 text-2xl font-extrabold tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              AIX
            </Link>
          </div>

          {/* PART 2: Nav Links — always visible, centered */}
          <nav
            className="relative z-10 flex items-center gap-2"
            style={{
              flex: '1 1 auto',
              justifyContent: 'center',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {["Home", "Features", "Pricing", "Dashboard", "About"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={(e) => {
                  if (item === "Features") {
                    e.preventDefault();
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="relative px-4 py-2 rounded-full font-medium text-gray-200 bg-transparent transition-all duration-300 hover:bg-gray-800/60 hover:text-white hover:shadow-sm hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* PART 3: Login/SignUp — collapses right on scroll */}
          <div
            style={{
              maxWidth: isScrolled ? '0px' : '200px',
              opacity: isScrolled ? 0 : 1,
              overflow: isScrolled ? 'hidden' : 'visible',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              marginLeft: isScrolled ? '0px' : '8px',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <a
              href="#/login"
              onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); window.location.href="#/login"; window.location.reload(); }}
              className="relative z-10 font-semibold text-white backdrop-blur-2xl border border-gray-700/50 transition-all duration-300 hover:bg-gray-800/60 hover:-translate-y-0.5"
              style={{
                whiteSpace: 'nowrap',
                display: 'inline-block',
                padding: '10px 24px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(17, 24, 39, 0.5)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Login / SignUp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="relative z-10 md:hidden p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile-only fallback */}
        <div className="md:hidden flex justify-end">
          <button className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Section - Added larger top padding to clear the fixed navbar */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 md:px-8 pt-40 pb-16 lg:pt-48 lg:pb-24 gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
            <span className="block">Master your </span>
            <span className="inline-block align-middle min-h-[1.2em] bg-clip-text text-transparent bg-linear-to-r from-cyan-600 to-blue-600">
              <Typewriter
                words={[
                  "Frontend Developer",
                  "Backend Developer",
                  "Full Stack",
                  "Java Developer",
                  "Python Developer",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
            <br />
            <span className="text-slate-800">interviews with AI</span>
          </h2>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/mock"
              className="relative overflow-hidden group px-8 py-4 mt-8 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 border border-blue-400/50 text-white font-bold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] inline-flex items-center gap-2 animate-[pulse_3s_ease-in-out_infinite]"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              <span className="relative z-10">Try a Free Mock Interview</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes antigravity {
          0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33% { transform: translateY(-30px) rotateX(15deg) rotateY(-10deg) rotateZ(5deg); }
          66% { transform: translateY(15px) rotateX(-5deg) rotateY(20deg) rotateZ(-5deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        }
        @keyframes antigravity-reverse {
          0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33% { transform: translateY(25px) rotateX(-15deg) rotateY(15deg) rotateZ(-5deg); }
          66% { transform: translateY(-20px) rotateX(10deg) rotateY(-20deg) rotateZ(5deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        }
        @keyframes wave {
          0%, 100% { transform: translateZ(0) scale(1); opacity: 0.3; }
          50% { transform: translateZ(40px) scale(1.5); opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-antigravity { animation: antigravity 12s ease-in-out infinite; }
        .animate-antigravity-reverse { animation: antigravity-reverse 15s ease-in-out infinite; }
        .animate-antigravity-delayed { animation: antigravity 14s ease-in-out 3s infinite; }
        .animate-wave { animation: wave 3s ease-in-out infinite; }
        @keyframes shimmer {
          100% { transform: translateX(50%); }
        }
        @keyframes glass-shine {
          0% { transform: translateX(-150%); }
          20% { transform: translateX(250%); }
          100% { transform: translateX(250%); }
        }
        .animate-glass-shine {
          animation: glass-shine 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .mask-radial-gradient {
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);
        }
      `}</style>
    </header>
  );
}

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br 
      from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {children}
    </div>
  );
}