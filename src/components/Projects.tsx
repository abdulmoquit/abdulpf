import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for visualizing complex business data with real-time insights and predictive analytics.",
      tech: ["Python", "Pandas", "Plotly", "React"],
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "E-Commerce Intelligence",
      description: "ML-powered recommendation system analyzing customer behavior patterns to boost sales and engagement.",
      tech: ["Machine Learning", "TensorFlow", "FastAPI"],
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      title: "Business Automation Suite",
      description: "Comprehensive toolkit automating routine business processes, saving time and reducing operational costs.",
      tech: ["Node.js", "PostgreSQL", "TypeScript"],
      gradient: "from-accent/20 to-accent/5",
    },
    {
      title: "Financial Forecasting Model",
      description: "Advanced predictive model for market trend analysis using historical data and statistical algorithms.",
      tech: ["Python", "Scikit-learn", "NumPy"],
      gradient: "from-primary/20 to-secondary/5",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-12 text-center glow-text transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 ${hoveredProject === index ? "opacity-100" : ""}`} />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary text-secondary hover:bg-secondary/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
