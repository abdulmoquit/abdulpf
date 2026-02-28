import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["contact", "resume", "projects", "skills", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Resume", href: "#resume", id: "resume" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-3 shadow-lg shadow-black/10" : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#");
              }}
              className="text-2xl font-heading font-bold glow-text cursor-pointer hover:scale-105 transition-transform"
            >
              AM.
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${activeSection === link.id
                      ? "text-foreground bg-white/10"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                    }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="glass h-full pt-24 px-8 flex flex-col">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-2xl font-heading font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer ${activeSection === link.id
                      ? "text-foreground bg-white/10"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
