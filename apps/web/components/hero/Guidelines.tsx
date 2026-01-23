"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

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

export default function Guidelines() {
  return (
    <section id="guidelines" className="py-28 bg-gray-50 border-t">
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
          Guidelines & Ethical Use
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-600 mt-4 max-w-3xl mx-auto"
        >
          This platform is designed to responsibly celebrate 40 years of SRM.
          Users are expected to follow ethical and respectful usage practices.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Allowed */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-600">
              Allowed Usage
            </h3>
            <ul className="space-y-3 text-gray-600">
              {allowed.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span>✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Prohibited */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Prohibited Content
            </h3>
            <ul className="space-y-3 text-gray-600">
              {prohibited.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span>✖</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
