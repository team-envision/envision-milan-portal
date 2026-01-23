"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const steps = [
  "Enter your memory or message",
  "Choose a theme & visual style",
  "Generate your poster",
  "Download or view in gallery",
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-semibold text-center"
        >
          How It Works
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {i + 1}
              </div>
              <p className="text-gray-600">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
