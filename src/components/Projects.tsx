import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for visualizing complex business data with real-time insights and predictive analytics.",
    tech: ["Python", "Pandas", "Plotly", "React"],
  },
  {
    title: "E-Commerce Intelligence",
    description: "ML-powered recommendation system analyzing customer behavior patterns to boost sales and engagement.",
    tech: ["Machine Learning", "TensorFlow", "FastAPI"],
  },
  {
    title: "Business Automation Suite",
    description: "Comprehensive toolkit automating routine business processes, saving time and reducing operational costs.",
    tech: ["Node.js", "PostgreSQL", "TypeScript"],
  },
  {
    title: "Financial Forecasting Model",
    description: "Advanced predictive model for market trend analysis using historical data and statistical algorithms.",
    tech: ["Python", "Scikit-learn", "NumPy"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-heading font-bold mb-4 text-center glow-text"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 text-lg"
        >
          Some of the things I've been working on
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-8 cursor-pointer relative overflow-hidden group border border-white/5 hover:border-white/15 transition-all duration-300"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-500 ease-in-out ${hoveredProject === index ? "opacity-100" : "opacity-0"}`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold">{project.title}</h3>
                  <ExternalLink className="w-5 h-5 text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-foreground/80 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" className="bg-white/10 hover:bg-white/15 text-foreground border border-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
