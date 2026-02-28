import { Code2, Database, BarChart3, Table, Brain, FileCode, Palette } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  { name: "Python", icon: Code2 },
  { name: "Pandas", icon: Table },
  { name: "NumPy", icon: BarChart3 },
  { name: "Scikit-Learn", icon: Brain },
  { name: "SQL", icon: Database },
  { name: "Power BI", icon: BarChart3 },
  { name: "HTML", icon: FileCode },
  { name: "CSS", icon: Palette },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 15 }
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-heading font-bold mb-4 text-center glow-text"
        >
          Skills &amp; Technologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 text-lg"
        >
          Tools and technologies I work with
        </motion.p>

        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-shadow duration-300 border bg-white/5 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
                >
                  <Icon className="w-10 h-10 text-foreground/80" />
                  <span className="font-semibold text-center text-sm">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
