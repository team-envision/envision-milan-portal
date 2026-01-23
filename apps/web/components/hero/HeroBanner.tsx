"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="pt-32 pb-24 bg-linear-to-b from-gray-50 to-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center px-6"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Celebrate <span className="text-blue-600">40 Years of SRM</span>
          <br />
          Through AI-Generated Memories
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Create a unique commemorative poster inspired by your journey at SRM —
          designed for students and faculty to relive moments that matter.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex justify-center gap-4"
        >
          <Link href="/generate">
            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Generate Image
            </button>
          </Link>

          <Link href="/gallery">
            <button className="px-6 py-3 rounded-lg border hover:bg-gray-100">
              View Examples
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
