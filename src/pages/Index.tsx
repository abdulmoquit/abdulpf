import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
const Index = () => {
  return <main className="relative">
      <Navbar />
      <Hero />
      <About className="my-0" />
      <Skills />
      <Resume />
      <Contact />
      
      <footer className="py-8 text-center border-t border-border/20 bg-card/50">
        <p className="text-muted-foreground text-sm">
          © 2025 Abdul Moquit · Built with Lovable AI
        </p>
      </footer>
    </main>;
};
export default Index;