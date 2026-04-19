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
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="https://media.istockphoto.com/id/2093568992/vector/job-interview-vector-simple.jpg?s=612x612&w=0&k=20&c=LnyP-YfeSW2L_jckMGu_Z_T46QKC5q2c_ejfBoWWdYs="
          alt="background"
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-slate-100"></div>
      </div>
      {/* Animated water‑like ripples */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle grid pattern for texture */}
      

      {/* Water‑glass Navbar - highly transparent with shimmer */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pt-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center bg-slate-200/70 backdrop-blur-xl border border-slate-300 rounded-full shadow-md px-8 py-3 transition-all duration-300 hover:bg-slate-200 hover:shadow-lg">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500">
              AIX
            </h1>

            <nav className="hidden md:flex items-center gap-3">
              {["Home", "Features", "Pricing", "Dashboard", "About"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="relative px-4 py-2 rounded-full font-medium text-slate-700 bg-slate-100 backdrop-blur-sm border border-slate-300 transition-all duration-300 hover:bg-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow-sm hover:scale-105"
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full font-semibold bg-linear-to-r from-cyan-400 to-blue-500 backdrop-blur-md border border-white/50 text-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:from-cyan-500 hover:to-blue-600"
              >
                Login / SignUp
              </Link>
            </nav>

            <button className="md:hidden p-2 rounded-lg bg-white/40 backdrop-blur-sm border border-white/40 hover:bg-white/70 transition-all duration-300">
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

      {/* Hero Section - content remains the same but with adjusted colors to match water theme */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 md:px-8 pt-16 pb-8 lg:pt-20 lg:pb-10 gap-10">
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

          <p className="text-lg text-slate-600 max-w-xl">
            Practice with our intelligent interviewer, receive real‑time
            feedback, and walk into your next opportunity with unshakable
            confidence.
          </p>

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

        {/* Right Image with water‑glass frame */}
        
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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