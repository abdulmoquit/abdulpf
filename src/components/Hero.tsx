import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Card className="w-full min-h-screen border-0 rounded-none bg-background/95 relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex flex-col md:flex-row h-full min-h-screen items-center">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 glow-text text-foreground">
                Abdul Moquit
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-semibold animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
                Aspiring Data Scientist | Tech Enthusiast
              </p>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
                Passionate about <span className="text-foreground font-semibold">Data Science</span>, learning{" "}
                <span className="text-foreground font-semibold">Python</span>, and exploring the world of technology
              </p>
              <div style={{ animationDelay: "0.6s" }} className="flex gap-4 animate-slide-in-up flex-wrap">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8"
                >
                  View Projects
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 font-semibold"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>

          {/* Right content - 3D Robot */}
          <div className="flex-1 relative h-[400px] md:h-[600px]">
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
