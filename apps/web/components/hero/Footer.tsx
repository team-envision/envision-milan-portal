"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left */}
          <div>
            <p className="font-semibold">SRM University</p>
            <p className="text-sm text-gray-500">
              Celebrating 40 Years of Excellence
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <a href="#">Help / Support</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Social Media</a>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} SRM University. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
