// import { Link } from "react-router-dom";
// import { Sparkles, ArrowRight, Zap } from "lucide-react";

// const Landing = () => {
//   return (
//     <div className="min-h-screen bg-[#0d0f14] text-white overflow-hidden">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5 border-b border-white/10">
//         <h1 className="text-2xl font-bold tracking-tight">
//           Nexus<span className="text-indigo-500">AI</span>
//         </h1>

//         <div className="flex items-center gap-3">
//           <Link
//             to="/login"
//             className="px-3 sm:px-5 py-2 text-xs sm:text-sm text-slate-300 hover:text-white transition"
//           >
//             Login
//           </Link>

//           <Link
//             to="/login"
//             className="px-3 sm:px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm font-medium transition"
//           >
//             Get Started
//           </Link>
//         </div>
//       </nav>

//       {/* Hero */}
//       <main className="relative min-h-[85vh] flex items-center justify-center px-6">
//         <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full" />

//         <div className="relative max-w-4xl text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8">
//             <Sparkles size={16} />
//             Your All-in-One AI Workspace
//           </div>

//           <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
//             One AI.
//             <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
//               Endless Possibilities.
//             </span>
//           </h1>

//           <p className="mt-7 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
//             Chat, code, search, analyze documents and create presentations.
//             Everything you need, powered by AI in one workspace.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
//             <Link
//               to="/login"
//               className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-medium transition"
//             >
//               Get Started
//               <ArrowRight size={18} />
//             </Link>

//             <a
//               href="#features"
//               className="px-7 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition text-slate-300"
//             >
//               Explore Features
//             </a>
//           </div>

//           <div className="mt-16 flex items-center justify-center gap-3 text-sm text-slate-500">
//             <Zap size={16} className="text-indigo-400" />
//             One workspace. Multiple AI capabilities.
//           </div>
//         </div>
//       </main>

//       {/* Features */}
//       <section
//         id="features"
//         className="px-6 md:px-12 py-20 border-t border-white/10"
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
//               Everything you need, in one place.
//             </h2>
//             <p className="text-slate-400 mt-4">
//               Powerful AI tools designed for your everyday workflow.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {[
//               [
//                 "AI Chat",
//                 "Have natural conversations and get instant answers.",
//               ],
//               ["Coding Assistant", "Generate, explain and debug code."],
//               ["Web Search", "Find useful information from the web."],
//               [
//                 "PDF Analysis",
//                 "Upload documents and understand their content.",
//               ],
//               [
//                 "Image Understanding",
//                 "Upload images and ask questions about them.",
//               ],
//               ["Presentation", "Create presentations with AI assistance."],
//             ].map(([title, description]) => (
//               <div
//                 key={title}
//                 className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
//               >
//                 <h3 className="text-lg font-semibold">{title}</h3>
//                 <p className="text-slate-400 text-sm mt-3 leading-relaxed">
//                   {description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
//         © 2026 NexusAI. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Landing;

import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Zap,
  MessageSquare,
  Code2,
  Globe,
  FileText,
  Image,
  Presentation,
  BrainCircuit,
  Stars,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Conversations",
    description:
      "Have natural conversations and get intelligent answers instantly.",
    color: "text-violet-400",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    icon: Code2,
    title: "Coding Assistant",
    description: "Generate, debug, explain and improve your code with AI.",
    color: "text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: Globe,
    title: "Web Intelligence",
    description: "Explore the web and discover useful information faster.",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    icon: FileText,
    title: "PDF Analysis",
    description: "Upload documents and understand complex information easily.",
    color: "text-orange-400",
    glow: "group-hover:shadow-orange-500/10",
  },
  {
    icon: Image,
    title: "Vision Intelligence",
    description: "Understand images and extract meaningful insights.",
    color: "text-pink-400",
    glow: "group-hover:shadow-pink-500/10",
  },
  {
    icon: Presentation,
    title: "AI Presentations",
    description: "Turn your ideas into structured presentations with AI.",
    color: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#080a12] text-white overflow-hidden">
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        @keyframes rotateOrb {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        .orb-float {
          animation: orbFloat 5s ease-in-out infinite;
        }

        .orb-ring {
          animation: rotateOrb 18s linear infinite;
        }

        .orb-ring-reverse {
          animation: rotateOrb 24s linear infinite reverse;
        }

        .orb-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .landing-grid {
          background-image:
            linear-gradient(rgba(139,92,246,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.045) 1px, transparent 1px);
          background-size: 55px 55px;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }

        .star {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 landing-grid" />
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/15 blur-[150px] rounded-full" />
        <div className="absolute top-[600px] left-[-200px] w-[400px] h-[400px] bg-violet-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-5 sm:px-8 lg:px-16 py-5 border-b border-white/[0.07] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit size={21} />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Nexus<span className="text-indigo-400">AI</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            to="/login"
            className="px-3 sm:px-4 py-2 text-sm text-slate-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm font-semibold transition shadow-lg shadow-indigo-600/20"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 min-h-[850px] lg:min-h-[900px] flex flex-col items-center justify-center px-5 pt-16 pb-20">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/20 bg-indigo-500/[0.08] text-indigo-300 text-xs sm:text-sm mb-8">
          <Sparkles size={15} />
          Your All-in-One AI Workspace
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
        </div>

        {/* Heading */}
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold tracking-tight leading-[1.1]">
            Your Intelligence.
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Amplified.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed">
            Think smarter. Create faster. Build anything. Experience
            conversations, coding, research and creativity powered by AI in one
            intelligent workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-semibold transition shadow-xl shadow-indigo-600/20"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 transition"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* AI Orb */}
        <div className="relative w-[270px] h-[270px] sm:w-[360px] sm:h-[360px] md:w-[430px] md:h-[430px] mt-12 sm:mt-16 flex items-center justify-center">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-[75px] orb-glow" />

          {/* Outer ring */}
          <div className="absolute inset-[5%] rounded-full border border-indigo-400/20 orb-ring" />

          {/* Second ring */}
          <div className="absolute inset-[13%] rounded-full border border-violet-400/20 orb-ring-reverse" />

          {/* Orbit dots */}
          <div className="absolute top-[12%] left-[22%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_15px_4px_rgba(96,165,250,0.6)]" />
          <div className="absolute bottom-[17%] right-[18%] w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_15px_4px_rgba(167,139,250,0.7)]" />

          {/* Main Orb */}
          <div className="relative orb-float w-[155px] h-[155px] sm:w-[210px] sm:h-[210px] md:w-[250px] md:h-[250px] rounded-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-violet-600 to-blue-700 shadow-[0_0_80px_15px_rgba(99,102,241,0.35)]" />

            <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#b9a7ff] via-[#6554d9] to-[#151b58]" />

            <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-indigo-300/50 via-violet-500/30 to-transparent blur-xl" />

            <div className="relative z-10 w-[70px] h-[70px] sm:w-[95px] sm:h-[95px] rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)]">
              <BrainCircuit
                size={42}
                className="text-white sm:w-14 sm:h-14"
                strokeWidth={1.3}
              />
            </div>

            <div className="absolute top-[25%] left-[20%] w-3 h-3 bg-white/70 rounded-full blur-[2px]" />
            <div className="absolute bottom-[25%] right-[20%] w-2 h-2 bg-blue-200 rounded-full blur-[1px]" />
          </div>

          {/* Floating particles */}
          <div className="absolute top-[15%] right-[17%] text-indigo-300 star">
            <Sparkles size={20} />
          </div>

          <div className="absolute bottom-[18%] left-[14%] text-violet-300 star">
            <Stars size={19} />
          </div>

          <div className="absolute top-[45%] left-[2%] w-1.5 h-1.5 rounded-full bg-blue-300 star" />
          <div className="absolute top-[30%] right-[5%] w-1 h-1 rounded-full bg-violet-300 star" />
        </div>

        {/* Bottom text */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-2">
          <Zap size={15} className="text-indigo-400" />
          One workspace. Limitless possibilities.
        </div>
      </main>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 px-5 sm:px-8 lg:px-16 py-24 border-t border-white/[0.07]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Sparkles size={14} />
              Capabilities
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Everything you need.
              <span className="block mt-2 text-slate-500">
                All powered by intelligence.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base mt-5 max-w-xl mx-auto leading-relaxed">
              A collection of powerful AI capabilities designed to simplify your
              workflow and unlock new possibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`group relative p-7 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.055] to-white/[0.015] hover:border-indigo-400/30 hover:bg-white/[0.07] hover:shadow-2xl ${feature.glow} transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.07] flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-100">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="absolute top-7 right-7 text-xs text-slate-600">
                    0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07] px-5 sm:px-8 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrainCircuit size={19} className="text-indigo-400" />
            <span className="font-semibold">
              Nexus<span className="text-indigo-400">AI</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 text-center">
            © 2026 NexusAI. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">Built for a smarter future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
