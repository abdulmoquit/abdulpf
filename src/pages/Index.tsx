import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <Contact />
      
      <footer className="py-8 text-center border-t border-border/20">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Abdul Moquit. Crafted with passion and code.
        </p>
      </footer>
    </main>
  );
};

export default Index;
