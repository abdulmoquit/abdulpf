import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
        ctx.fill();
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
        <div className="absolute inset-0 bg-background/80" />
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      <div className="container mx-auto px-4 z-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 glow-text">
            Abdul Moquit
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary/90 mb-8 font-semibold animate-slide-in-up" style={{
            animationDelay: "0.2s"
          }}>
            Aspiring Data Scientist | Tech Enthusiast
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-in-up" style={{
          animationDelay: "0.4s"
        }}>
            Passionate about <span className="text-primary font-semibold">Data Science</span>, learning{" "}
            <span className="text-secondary font-semibold">Python</span>, and exploring the world of technology
          </p>
          <div style={{
          animationDelay: "0.6s"
        }} className="flex gap-4 justify-center animate-slide-in-up flex-wrap">
            <Button 
              size="lg" 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow-cyan px-8"
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} 
              className="border-primary text-primary hover:bg-primary/10 font-semibold"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <button onClick={scrollToAbout} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer bg-transparent border-none" aria-label="Scroll to about section">
        <ArrowDown className="w-8 h-8 text-primary" />
      </button>
    </section>;
};
export default Hero;