import { motion } from "framer-motion";

export default function Body() {
    const cards = [
        {
            title: "Mock Interviews",
            description: "Simulate real interview experience with AI feedback.",
            image:
              "https://t4.ftcdn.net/jpg/08/80/14/63/240_F_880146375_SYk2GHREB68lHG22dcxIZ9zdLwNXdrh9.jpg",
            alt: "Mock interview session",
            primaryButton: "Explore",
            primaryLink: "/mock",
            color: "from-blue-500/20 to-indigo-500/20",
          },
          {
            title: "HR Interview",
            description: "Practice common HR questions and behavioral scenarios.",
            image:
              "https://imgs.search.brave.com/fgKDPqcaT1BqA5j8crh84TiPFA8V6SxEFxKu80l7WhQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9pbnRl/cnZpZXdpbmctY2Fu/ZGlkYXRlLWQtcmVu/ZGVyLXZlY3Rvci1p/bGx1c3RyYXRpb24t/cHJvZmVzc2lvbmFs/LWhyLW1hbmFnZXIt/aGFzLWpvYi1pbnRl/cnZpZXctaHVtYW4t/cmVzb3VyY2VzLXJl/Y3J1aXRpbmctNDAw/ODgyMTkwLmpwZw",
            alt: "HR interview discussion",
            primaryButton: "Explore",
            primaryLink: "/hr-interview",
            color: "from-sky-500/20 to-cyan-500/20",
          },
          {
            title: "Technical Interview",
            description: "Test your technical skills with role-specific questions.",
            image:
              "https://imgs.search.brave.com/6ro9pnEo3O2Q8o6WQUgdaNhO1629gQtJc7BVngPyVbk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZGVzaWdudGVt/cGxhdGUuaW8vdGh1/LWphbi0xMi0yMDIz/LTItMTAtcG0xMzA3/OC53ZWJw",
            alt: "Technical assessment",
            primaryButton: "Explore ",
            primaryLink: "/technical",
            color: "from-emerald-500/20 to-teal-500/20",
          },
        ];
      
    

    const whyChooseUs = [
      {
        icon: "🤖",
        title: "AI-Powered Feedback",
        description: "Get instant, personalized feedback on your answers, body language tips, and improvement suggestions.",
        color: "from-blue-400 to-indigo-500",
        image: "https://imgs.search.brave.com/ACCXCl0UJRqdmcdeUjJ4erZVBhz8YMdePfgPehsK_dQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzcv/MDg5LzQ1Ny9zbWFs/bC9haS1zZW50aW1l/bnQtYW5hbHlzaXMt/aWxsdXN0cmF0aW9u/LWNoYXRib3Qtcm9i/b3QtZW1vdGlvbnMt/ZmVlZGJhY2stY3Vz/dG9tZXItcmV2aWV3/cy1hdXRvbWF0aW9u/LXRlY2hub2xvZ3kt/ZnJlZS12ZWN0b3Iu/anBn",
      },
      {
        icon: "🎭",
        title: "Realistic Simulations",
        description: "Practice with lifelike interview scenarios that mirror actual company processes and expectations.",
        color: "from-cyan-400 to-sky-500",
        image: "https://thumbs.dreamstime.com/b/people-hr-interview-cartoon-woman-sitting-panel-applying-job-recruitment-behind-office-desk-recruiters-interviewing-194548068.jpg",
      },
      {
        icon: "📚",
        title: "Comprehensive Question Bank",
        description: "Access thousands of curated questions across industries, roles, and difficulty levels.",
        color: "from-emerald-400 to-teal-500",
        image: "https://www.shutterstock.com/image-vector/study-much-isolated-cartoon-vector-260nw-2397538177.jpg",
      },
      {
        icon: "📊",
        title: "Progress Tracking & Analytics",
        description: "Visualize your improvement over time with detailed performance metrics and insights.",
        color: "from-purple-400 to-indigo-500",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLiJS5dBeZOv8Ch63my2efaLEpstFY3jOog&s",
      },
    ];


  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  
    return (
      <div className="relative overflow-hidden py-16 px-6 md:px-8 bg-linear-to-br from-slate-50 via-gray-50 to-blue-50/50">
        {/* Animated background gradient layer */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-200/30 via-blue-100/20 to-gray-200/30 animate-gradient-shift"></div>
        
        {/* Floating blobs with professional muted tones */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl animate-float-fast"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
  
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header with enhanced typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-800 tracking-tight">
              Prepare for Your{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
                Dream Job
              </span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Master every stage of your interview journey with our AI‑powered tools and realistic simulations.
            </p>
          </motion.div>

          {/* Cards grid (original image cards) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-white/70 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-white/80 transition-all duration-500 hover:shadow-xl hover:bg-white/80"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${card.color} mix-blend-overlay transition-opacity duration-500 group-hover:opacity-75`}
                  ></div>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed font-light">
                    {card.description}
                  </p>
                  <div className="space-y-3">
                    <a
                      href={card.primaryLink}
                      className="group/btn block w-full px-5 py-2.5 rounded-full bg-slate-800 text-white text-sm font-medium border border-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-900 hover:scale-105"
                    >
                      {card.primaryButton}
                      <span className="inline-block ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
  
         {/* Why Choose Us Section Header */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="text-center mt-24 mb-12"
         >
           <h2 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight">
             Why Choose{" "}
             <span className="bg-clip-text text-transparent bg-linear-to-r bg-amber-600">
               Us
             </span>
           </h2>
           <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg font-light">
             Discover what makes our platform the smartest way to prepare, practice, and succeed in interviews.
           </p>
         </motion.div>
         {/* Why Choose Us - Premium Layout (Dynamic) */}
<div className="mt-24 mb-24 space-y-16">

  {whyChooseUs.map((item, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-10 max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/80 shadow-md rounded-2xl transition-all duration-500"
    >
      {/* Image (alternate sides) */}
      <div className={`${idx % 2 !== 0 ? "md:order-2" : ""}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-75 md:h-95 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className={`${idx % 2 !== 0 ? "md:order-1" : ""}`}>
        <p className="text-sm text-amber-600 font-semibold mb-2">
          Why Choose Us
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          {item.title}
        </h2>

        <p className="text-slate-600 mb-4">
          {item.description}
        </p>

        <ul className="space-y-2 mb-5">
          {item.title === "AI-Powered Feedback" && (
            <>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">1</span>
                Instant AI evaluation of answers
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">2</span>
                Personalized improvement tips
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">3</span>
                Smart scoring & performance insights
              </li>
            </>
          )}

          {item.title === "Realistic Simulations" && (
            <>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">1</span>
                Company-like interview environment
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">2</span>
                Role-based mock interviews
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">3</span>
                Real-time question flow
              </li>
            </>
          )}

          {item.title === "Comprehensive Question Bank" && (
            <>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">1</span>
                Thousands of curated questions
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">2</span>
                Covers multiple domains & roles
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">3</span>
                Beginner to advanced difficulty
              </li>
            </>
          )}

          {item.title === "Progress Tracking & Analytics" && (
            <>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">1</span>
                Detailed performance dashboard
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">2</span>
                Track improvement over time
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm">3</span>
                Identify strengths & weaknesses
              </li>
            </>
          )}
        </ul>
      </div>
    </motion.div>
  ))}

</div>


  
          {/* CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-white/70 backdrop-blur-lg rounded-full px-8 py-3 border border-white/80 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <p className="text-slate-700 text-sm font-medium">
                🚀 <span className="font-semibold">Ready to ace your interview?</span>{" "}
                <span className="font-light">Start practicing today — it's free!</span>
              </p>
            </div>
          </motion.div>
        </div>
  
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float-slow {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          @keyframes float-medium {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-25px, 25px) scale(1.03); }
            66% { transform: translate(15px, -15px) scale(0.97); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(20px, 20px) scale(1.02); }
            66% { transform: translate(-20px, -20px) scale(0.98); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradient-shift 15s ease infinite;
          }
          .animate-float-slow {
            animation: float-slow 20s ease-in-out infinite;
          }
          .animate-float-medium {
            animation: float-medium 15s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: float-fast 12s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }