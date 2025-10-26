import { useEffect, useRef, useState } from "react";
import { Code2, Database, TrendingUp, Brain } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "Data Science", level: 85, icon: Database, color: "text-primary" },
    { name: "Business Analysis", level: 90, icon: TrendingUp, color: "text-secondary" },
    { name: "Computer Science", level: 80, icon: Code2, color: "text-accent" },
    { name: "Machine Learning", level: 75, icon: Brain, color: "text-primary" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-12 text-center glow-text transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="glass rounded-2xl p-8 neon-glow">
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  I'm a <span className="text-primary font-semibold">commerce student</span> with an insatiable curiosity for technology and innovation. My journey bridges the worlds of business and tech, allowing me to see opportunities from unique perspectives.
                </p>
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  Currently exploring the fascinating realms of <span className="text-secondary font-semibold">data science</span> and <span className="text-accent font-semibold">computer science</span>, I'm passionate about leveraging technology to solve real-world business challenges.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  I believe in continuous learning, creative problem-solving, and building solutions that make a difference.
                </p>
              </div>
            </div>

            <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${skill.color}`} />
                        <span className="font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className={`text-sm font-bold ${skill.color}`}>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          skill.color === "text-primary" ? "bg-primary neon-glow" :
                          skill.color === "text-secondary" ? "bg-secondary neon-glow-violet" :
                          "bg-accent neon-glow-gold"
                        }`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 100 + 600}ms`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
