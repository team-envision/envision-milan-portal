"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

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
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Guidelines
          </h2>
        </motion.div>

        {/* Two Columns: Each with an Image + Card */}
        <div className="grid md:grid-cols-2 gap-14 relative z-10">
          
          {/* LEFT COLUMN: Rickshaw Image (Left Aligned) + Allowed Card */}
          <div className="flex flex-col items-start gap-0">
            {/* Decorative Image (Rickshaw) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              // UPDATED SIZES: Increased width and height
              className="relative w-80 h-60 md:w-[450px] md:h-[320px] z-10"
            >
              <Image
                src="/images/auto.png" 
                alt="Decorative Rickshaw"
                fill
                // UPDATED: Added scale-x-[-1] to mirror the image
                className="object-contain scale-x-[-1]"
              />
            </motion.div>

            {/* Allowed Usage Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[#2D130A] border-2 border-white/10 rounded-2xl p-8 pt-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300 -mt-12"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Allowed Usage
              </h3>
              
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {allowed.map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A2518] border border-[#5D2E22]
                      flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#D2691E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm md:text-base leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Truck Image (Right Aligned) + Prohibited Card */}
          <div className="flex flex-col items-end gap-0">
            {/* Decorative Image (Truck) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              // UPDATED SIZES: Increased width and height to match auto
              className="relative w-80 h-60 md:w-[150px] md:h-[320px] z-10"
            >
              <Image
                src="/images/truck.png" 
                alt="Decorative Truck"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Prohibited Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[#2D130A] border-2 border-white/10 rounded-2xl p-8 pt-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300 -mt-12"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Prohibited Content
              </h3>
              
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {prohibited.map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A2518] border border-[#5D2E22]
                      flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#D2691E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm md:text-base leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}