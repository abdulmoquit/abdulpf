import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Mail, 
  Linkedin, 
  Twitter, 
  BookOpen, 
  Award, 
  Code2, 
  MapPin, 
  ChevronRight, 
  FileText, 
  Layers,
  Database,
  ArrowUpRight,
  GraduationCap
} from "lucide-react";

// Backup data defined inline for absolute performance and zero external dependencies
const backupData = {
  name: "Abdul Moquit",
  title: "Aspiring Data Scientist | Tech Enthusiast",
  location: "Kolkata, India",
  bio: "Commerce student passionate about learning data science, Python, and exploring how technology shapes the business world. I believe in continuous learning and building innovative solutions that make a real impact.",
  email: "abdulmoquit00007@gmail.com",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/abdul-moquit-523bb5389/", icon: Linkedin },
    { name: "Twitter", url: "https://x.com/AbdulMoqui26836", icon: Twitter },
    { name: "Email", url: "mailto:abdulmoquit00007@gmail.com", icon: Mail }
  ],
  projects: [
    {
      title: "Data Analytics Dashboard",
      desc: "Interactive dashboard for visualizing complex business data with real-time insights and predictive analytics.",
      tech: ["Python", "Pandas", "Plotly", "React"]
    },
    {
      title: "E-Commerce Intelligence",
      desc: "ML-powered recommendation system analyzing customer behavior patterns to boost sales and engagement.",
      tech: ["Machine Learning", "TensorFlow", "FastAPI"]
    },
    {
      title: "Business Automation Suite",
      desc: "Comprehensive toolkit automating routine business processes, saving time and reducing operational costs.",
      tech: ["Node.js", "PostgreSQL", "TypeScript"]
    },
    {
      title: "Financial Forecasting Model",
      desc: "Advanced predictive model for market trend analysis using historical data and statistical algorithms.",
      tech: ["Python", "Scikit-learn", "NumPy"]
    }
  ],
  skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "Power BI", "HTML", "CSS"],
  education: [
    { school: "Don Bosco Park Circus School", degree: "Higher Secondary (Class 11)", date: "Present" },
    { school: "St Paul's School, Rampurhat", degree: "Secondary Education (10th)", date: "2025" }
  ],
  certifications: [
    { title: "GenAI Powered Data Analytics", issuer: "Tata via Forage", date: "Oct 2025" },
    { title: "Data Analytics Job Simulation", issuer: "Deloitte via Forage", date: "Oct 2025" }
  ]
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "skills" | "credentials" | null>(null);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* Premium Background Mesh Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            AM<span className="text-emerald-500">.</span>
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-neutral-400 font-mono tracking-wider">PORTFOLIO 2.0 DEV MODE</span>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex items-center justify-center container mx-auto px-6 py-12">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">
          
          {/* Top Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex items-center gap-2 text-xs text-neutral-300 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>STARTING FRESH FOR A CLEANER EXPERIENCE</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent font-heading leading-tight"
          >
            Redesign in Progress
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 text-base md:text-lg mb-10 leading-relaxed max-w-lg"
          >
            I am redesigning my portfolio to be fast, elegant, and entirely lag-free. While I wait to implement the final design, you can interact with my saved profile data below.
          </motion.p>

          {/* Core Interactive Tabs Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-xl mb-12"
          >
            {[
              { id: "about", label: "About Me", icon: BookOpen },
              { id: "projects", label: "Projects", icon: Code2 },
              { id: "skills", label: "Skills", icon: Database },
              { id: "credentials", label: "Credentials", icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(activeTab === tab.id ? null : (tab.id as any))}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 backdrop-blur-md cursor-pointer group ${
                    isSelected 
                      ? "bg-white/10 border-white/20 text-white shadow-lg shadow-white/5" 
                      : "bg-neutral-900/30 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 transition-transform duration-300 group-hover:scale-110 ${isSelected ? "text-emerald-400" : "text-neutral-500 group-hover:text-emerald-400"}`} />
                  <span className="text-xs font-semibold tracking-wide font-mono">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Interactive Information Drawer Container */}
          <div className="w-full max-w-xl min-h-[180px] relative">
            <AnimatePresence mode="wait">
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full p-6 rounded-xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-lg text-left"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    About Abdul
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {backupData.bio}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Based in {backupData.location}</span>
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full p-6 rounded-xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-lg text-left space-y-4 max-h-[300px] overflow-y-auto"
                >
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2 sticky top-0 bg-neutral-950/90 py-1 z-10">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    Featured Projects
                  </h3>
                  <div className="space-y-4 pt-2">
                    {backupData.projects.map((proj, i) => (
                      <div key={i} className="group border-b border-neutral-900 pb-3 last:border-b-0 last:pb-0">
                        <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                          {proj.title}
                          <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                        </h4>
                        <p className="text-xs text-neutral-400 my-1">{proj.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {proj.tech.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full p-6 rounded-xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-lg text-left"
                >
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    Skills &amp; Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {backupData.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-200 hover:border-emerald-500/30 hover:bg-neutral-900 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "credentials" && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full p-6 rounded-xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-lg text-left space-y-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      Education
                    </h3>
                    <div className="space-y-2 border-l border-neutral-800 pl-3">
                      {backupData.education.map((edu, i) => (
                        <div key={i}>
                          <h4 className="text-xs font-semibold text-neutral-200">{edu.school}</h4>
                          <p className="text-[11px] text-neutral-400">{edu.degree} &bull; {edu.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      Certifications
                    </h3>
                    <div className="space-y-2 border-l border-neutral-800 pl-3">
                      {backupData.certifications.map((cert, i) => (
                        <div key={i}>
                          <h4 className="text-xs font-semibold text-neutral-200">{cert.title}</h4>
                          <p className="text-[11px] text-neutral-400">{cert.issuer} &bull; {cert.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {!activeTab && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-500 text-xs font-mono text-center pt-8"
                >
                  Click any button to view backed up details instantly.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Footer / Social Links */}
      <footer className="relative z-10 container mx-auto px-6 py-8 border-t border-neutral-900/60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-neutral-500 font-mono">&copy; 2026 Abdul Moquit. Starting fresh.</p>
        
        <div className="flex gap-4">
          {backupData.socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors group font-mono"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{social.name}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default Index;