import { useEffect, useRef, useState } from "react";

const About = ({ className = "" }: { className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return <section id="about" ref={sectionRef} className={`py-20 md:py-32 relative ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto my-0 py-0">
          <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-12 text-center glow-text transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            About Me
          </h2>

          <div className="flex justify-center items-center">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="glass rounded-2xl p-8 neon-glow-cyan">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  I'm a <span className="text-primary font-semibold">commerce student</span> passionate about learning <span className="text-secondary font-semibold">data science</span>, <span className="text-primary font-semibold">Python</span>, and exploring how technology shapes the business world. I believe in continuous learning and building innovative solutions that make a real impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;