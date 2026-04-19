import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

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
  return (
    <header className="relative overflow-hidden text-gray-800 min-h-screen">
      {/* Background - Beautiful Light Mesh Gradient */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-[#f8fafc] overflow-hidden">
        {/* Animated glowing orbs for a modern, light mesh gradient effect */}
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-blue-200/40 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/4 -right-20 w-[35rem] h-[35rem] bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 left-1/4 w-[45rem] h-[45rem] bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-sky-200/40 rounded-full blur-3xl"></div>
      </div>

      {/* 3D Waving Dots Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 flex items-center justify-center" style={{ perspective: '800px' }}>
        <div className="flex flex-wrap w-[150%] max-w-[1200px] justify-center" style={{ transform: 'rotateX(60deg) scale(1.5)', transformStyle: 'preserve-3d' }}>
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
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="relative px-4 py-2 rounded-full font-medium text-gray-200 bg-transparent transition-all duration-300 hover:bg-gray-800/60 hover:text-white hover:shadow-sm hover:scale-105"
                >
                  {item}
                </Link>
              ))}
              <a
                href="#/login"
                onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); window.location.href="#/login"; window.location.reload(); }}
                className="px-6 py-2.5 rounded-full font-semibold bg-white/10 backdrop-blur-2xl border border-white/30 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.6)] ml-2"
              >
                Login / SignUp
              </a>
            </nav>

            <button className="md:hidden p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - Added larger top padding to clear the fixed navbar */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 md:px-8 pt-40 pb-16 lg:pt-48 lg:pb-24 gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
            <span className="block">Master your </span>
            <span className="inline-block align-middle bg-clip-text text-transparent bg-linear-to-r from-cyan-600 to-blue-600">
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
              to="/start"
              className="group px-8 py-4 mt-20 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-slate-800 inline-flex items-center gap-2"
            >
            Try a Free Mock Interview 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
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