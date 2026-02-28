import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Twitter, Send, MapPin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "ad4785fd-9e92-4f1f-866e-81b26218c8a5",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.name} — Portfolio`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:abdulmoquit00007@gmail.com", detail: "abdulmoquit00007@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/abdul-moquit-523bb5389/", detail: "Abdul Moquit" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/AbdulMoqui26836", detail: "@AbdulMoquit" },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-heading font-bold mb-4 text-center glow-text"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 text-lg"
        >
          Have an idea? Let's build something great together
        </motion.p>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-heading font-bold mb-3">Let's Build Something Together</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I'm always excited to collaborate on projects, explore new ideas, or discuss opportunities in data science and tech.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <MapPin className="w-4 h-4 text-foreground/50" />
                <span>Kolkata, India</span>
              </div>

              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      whileHover={{ x: 4 }}
                      key={index}
                      href={social.href}
                      className="flex items-center gap-4 glass rounded-xl p-4 transition-colors duration-300 hover:bg-white/5 group border border-white/5 hover:border-white/10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="p-2 rounded-lg bg-white/5">
                        <Icon className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-sm">{social.label}</span>
                        <p className="text-xs text-muted-foreground">{social.detail}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5 border border-white/5">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 focus:border-white/30 transition-colors rounded-xl"
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 focus:border-white/30 transition-colors rounded-xl"
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 focus:border-white/30 transition-colors min-h-[140px] resize-none rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  className="w-full font-semibold neon-glow bg-white/20 hover:bg-white/30 text-white border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
