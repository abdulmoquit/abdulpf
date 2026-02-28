import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const name = "Abdul Moquit";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Card className="w-full min-h-screen border-0 rounded-none bg-background/95 relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex flex-col md:flex-row w-full min-h-screen items-center justify-center pt-24 md:pt-0">
          {/* Left content */}
          <div className="w-full md:flex-1 px-4 py-8 md:p-16 relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="animate-fade-in">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 flex flex-wrap justify-center md:justify-start">
                {name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.04,
                      type: "spring" as const,
                      stiffness: 200,
                      damping: 20
                    }}
                    className={`inline-block ${char === " " ? "w-4 md:w-6" : ""} glow-text text-foreground`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 font-semibold"
              >
                Aspiring Data Scientist | Tech Enthusiast
                <span className="inline-block w-0.5 h-6 md:h-8 bg-white ml-1 animate-pulse align-middle" />
              </motion.p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mb-8 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
                Passionate about <span className="text-foreground font-semibold">Data Science</span>, learning{" "}
                <span className="text-foreground font-semibold">Python</span>, and exploring the world of technology
              </p>
              <div style={{ animationDelay: "0.6s" }} className="flex gap-4 animate-slide-in-up flex-wrap justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-semibold px-6 md:px-8 bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  View Projects
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-semibold px-6 md:px-8"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>

          {/* Right content - 3D Robot */}
          <div className="w-full h-[350px] md:flex-1 md:h-[600px] relative z-20 cursor-grab active:cursor-grabbing mb-16 md:mb-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-8 h-8 text-foreground/60" />
      </button>
    </section>
  );
};

export default Hero;
