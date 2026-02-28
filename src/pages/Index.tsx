import { lazy, Suspense, useEffect } from "react";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

// Lazy load heavy components that aren't needed on initial paint
const Hero = lazy(() => import("@/components/Hero"));
const Projects = lazy(() => import("@/components/Projects"));

const SectionFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground/80 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    // Disable the browser's native automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force the page strictly to the top initially
    window.scrollTo(0, 0);

    // Strip out hashes like #about from the URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Failsafe for Spline's delayed WebGL payload
    const strictScrollAnchor = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 800);

    return () => clearTimeout(strictScrollAnchor);
  }, []);

  return <main className="relative">
    <Navbar />
    <Suspense fallback={<SectionFallback />}>
      <Hero />
    </Suspense>
    <About className="my-0" />
    <Skills />
    <Suspense fallback={<SectionFallback />}>
      <Projects />
    </Suspense>
    <Resume />
    <Contact />

    <footer className="py-12 border-t border-white/5 bg-card/30 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-heading font-bold glow-text">AM<span className="text-foreground/50">.</span></span>
            <p className="text-sm text-muted-foreground">Built with passion & code</p>
          </div>

          <p className="text-muted-foreground text-sm">© 2025 Abdul Moquit. All rights reserved.</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
          >
            Back to top
            <span className="inline-block group-hover:-translate-y-1 transition-transform">↑</span>
          </button>
        </div>
      </div>
    </footer>
  </main>;
};
export default Index;