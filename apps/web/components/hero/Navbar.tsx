"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn } from "@/utils/animations/fade";

export default function Navbar() {
  return (
    <motion.nav
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur border-b"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
          <div>
            <p className="text-sm font-semibold">SRM University</p>
            <p className="text-xs text-gray-500">40 Years of SRM</p>
          </div>
        </div>

        {/* Center */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/generate">Generate Image</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="#how-it-works">How It Works</Link>
          <Link href="#guidelines">Guidelines</Link>
        </div>

        {/* Right */}
        <button className="text-sm px-4 py-2 border rounded-md hover:bg-gray-100">
          Login / Sign Up
        </button>
      </div>
    </motion.nav>
  );
}
