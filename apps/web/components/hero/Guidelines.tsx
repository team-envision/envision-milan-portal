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
  "Illegal, copyrighted or impersonation-based content",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Guidelines() {
  return (
    <section
      id="guidelines"
      className="bg-transparent py-12 md:py-16 px-6 md:px-10"
    >
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-0"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-[#D1D1D1] tracking-tight">
            Guidelines
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-10 md:gap-28 relative mt-16 md:mt-0">
          <div className="relative pt-10 md:pt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -top-32 md:-top-32 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-64 h-64 md:w-80 md:h-80 z-0"
            >
              <Image
                src="/images/auto.png"
                alt="Rickshaw"
                fill
                className="object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white/3 backdrop-blur-2xl rounded-2xl p-8 md:p-10 flex flex-col border border-white/10 shadow-2xl w-full"
              style={{
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-8 md:mb-10 text-center">
                Allowed Usage
              </h3>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                {allowed.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-4 md:gap-5"
                  >
                    <svg
                      className="w-6 h-6 text-[#8B4513] shrink-0 stroke-[#8B4513] stroke-[1.5]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#D1D1D1] text-base md:text-lg">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          <div className="relative pt-10 md:pt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -top-36 md:-top-42 left-1/2 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-0 w-64 h-64 md:w-80 md:h-80 z-0"
            >
              <Image
                src="/images/truck.png"
                alt="Truck"
                fill
                className="object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white/3 backdrop-blur-2xl rounded-2xl p-8 md:p-10 flex flex-col border border-white/10 shadow-2xl w-full"
              style={{
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 className="text-2xl font-semibold text-white mb-8 md:mb-10 text-center">
                Prohibited Content
              </h3>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                {prohibited.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="flex items-start gap-4 md:gap-5"
                  >
                    <svg
                      className="w-6 h-6 text-[#8B4513] shrink-0 mt-1 stroke-[#8B4513] stroke-[1.5]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#D1D1D1] text-base md:text-lg leading-tight">
                      {item}
                    </span>
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
