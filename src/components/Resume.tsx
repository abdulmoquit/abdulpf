import { Button } from "@/components/ui/button";
import { Download, Award, GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const resumeData = [
  {
    icon: GraduationCap,
    title: "Education",
    items: [
      { name: "Secondary Education (10th)", detail: "St Paul's School, Rampurhat", date: "2025" },
      { name: "Higher Secondary (Class 11)", detail: "Don Bosco Park Circus School", date: "Present" },
    ]
  },
  {
    icon: Award,
    title: "Certifications",
    items: [
      { name: "GenAI Powered Data Analytics", detail: "Tata via Forage", date: "Oct 2025" },
      { name: "Data Analytics Job Simulation", detail: "Deloitte via Forage", date: "Oct 2025" },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  },
};

const Resume = () => {
  return (
    <section id="resume" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-heading font-bold mb-4 text-center glow-text"
        >
          Certificates &amp; Education
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 text-lg"
        >
          My academic journey and credentials
        </motion.p>

        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {resumeData.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-white/5">
                      <Icon className="w-6 h-6 text-foreground/70" />
                    </div>
                    <h3 className="text-xl font-heading font-bold">{section.title}</h3>
                  </div>
                  <div className="space-y-5">
                    {section.items.map((item, i) => (
                      <div key={i} className="relative pl-4 border-l-2 border-white/10">
                        <h4 className="font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <Button
              size="lg"
              className="font-semibold neon-glow bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
