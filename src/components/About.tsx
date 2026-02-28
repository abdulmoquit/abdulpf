import { motion } from "framer-motion";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Sparkles, label: "Certifications", value: "2+" },
  { icon: BookOpen, label: "Technologies", value: "8+" },
  { icon: Lightbulb, label: "Projects", value: "4+" },
];

const About = ({ className = "" }: { className?: string }) => {
  return (
    <section id="about" className={`py-20 md:py-32 relative ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-heading font-bold mb-4 text-center glow-text"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-muted-foreground mb-12 text-lg"
          >
            A glimpse into who I am and what drives me
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring" as const, stiffness: 100, damping: 15 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-6 flex flex-col items-center text-center gap-3 cursor-default"
                >
                  <Icon className="w-8 h-8 text-foreground/70" />
                  <span className="text-3xl font-heading font-bold">{item.value}</span>
                  <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="glass rounded-2xl p-8 md:p-10 neon-glow backdrop-blur-xl">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-center">
                I'm a <span className="text-foreground font-semibold">commerce student</span> passionate about learning <span className="text-foreground font-semibold">data science</span>, <span className="text-foreground font-semibold">Python</span>, and exploring how technology shapes the business world. I believe in continuous learning and building innovative solutions that make a real impact.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
