"use client";

import { motion, Variants } from "framer-motion";

const allowed = [
  "Personal memories related to SRM University",
  "Academic, cultural, or campus-life themes",
  "Creative and celebratory content",
];

const prohibited = [
  "Offensive, hateful, or discriminatory content",
  "Political, misleading, or harmful imagery",
  "Illegal, copyrighted, or impersonation-based content",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Guidelines() {
  return (
    <section id="guidelines" className="py-12 bg-[#2D130A]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Guidelines
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
          </p>
        </motion.div>

        {/* Two Column Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Allowed Usage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            // Added shadow-xl, border-2, and hover lift for 3D effect
            className="bg-[#2D130A] border-2 border-white/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Allowed Usage
            </h3>
            
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {allowed.map((item, i) => (
                <motion.li 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  {/* Updated to Brown Colors */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A2518] border border-[#5D2E22]
                    flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#D2691E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Prohibited Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            // Added shadow-xl, border-2, and hover lift for 3D effect
            className="bg-[#2D130A] border-2 border-white/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Prohibited Content
            </h3>
            
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {prohibited.map((item, i) => (
                <motion.li 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  {/* Updated to Brown Colors (Same as allowed, or slightly darker if you prefer distinct) */}
                  {/* Using 'X' icon with brown styling */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A2518] border border-[#5D2E22]
                    flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#D2691E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}