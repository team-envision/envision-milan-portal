"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export default function AboutPortal() {
  return (
    <section className="py-20 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl font-semibold">About the Portal</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          This portal was created by SRM University to commemorate 40 years of
          excellence, innovation, and student journeys by blending creativity
          with responsible artificial intelligence.
        </p>
      </motion.div>
    </section>
  );
}
