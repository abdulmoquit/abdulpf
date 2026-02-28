import { useEffect, useRef, useState } from "react";
import { Code2, Database, BarChart3, Table, Brain, FileCode, Palette } from "lucide-react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "Python", icon: Code2 },
    { name: "Pandas", icon: Table },
    { name: "NumPy", icon: BarChart3 },
    { name: "Scikit-Learn", icon: Brain },
    { name: "SQL", icon: Database },
    { name: "Power BI", icon: BarChart3 },
    { name: "HTML", icon: FileCode },
    { name: "CSS", icon: Palette },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-12 text-center glow-text transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Skills & Technologies
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className={`glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:scale-110 transition-all duration-500 hover:neon-glow cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-12 h-12 text-foreground/80" />
                  <span className="font-semibold text-center">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
