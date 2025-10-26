import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Award, Briefcase, GraduationCap } from "lucide-react";

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const resumeData = [
    {
      icon: GraduationCap,
      title: "Education",
      items: [
        { name: "Bachelor of Commerce", detail: "University Name • 2021 - Present", color: "text-primary" },
        { name: "Data Science Certification", detail: "Online Platform • 2023", color: "text-primary" },
      ]
    },
    {
      icon: Briefcase,
      title: "Experience",
      items: [
        { name: "Business Analyst Intern", detail: "Tech Company • Summer 2023", color: "text-secondary" },
        { name: "Data Analytics Project", detail: "Freelance • 2022 - 2023", color: "text-secondary" },
      ]
    },
    {
      icon: Award,
      title: "Achievements",
      items: [
        { name: "Data Science Competition Winner", detail: "National Level • 2023", color: "text-accent" },
        { name: "Business Plan Innovation Award", detail: "University Level • 2022", color: "text-accent" },
      ]
    }
  ];

  return (
    <section id="resume" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-12 text-center glow-text transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Resume
        </h2>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {resumeData.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className={`glass rounded-2xl p-6 transition-all duration-700 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Icon className={`w-10 h-10 mb-4 ${section.items[0].color}`} />
                  <h3 className="text-xl font-heading font-bold mb-6">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i}>
                        <h4 className="font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold neon-glow animate-glow"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
