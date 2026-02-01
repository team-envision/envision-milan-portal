"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#guidelines", label: "Guidelines" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 px-8 flex items-center justify-center pointer-events-none"
    >
      {/* SRM Logo - Absolute Left */}
      <div className="absolute left-8 pointer-events-auto">
        <Link href="/">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <Image 
              src="/images/srm-logo.png" 
              alt="SRM Logo" 
              width={80} 
              height={80} 
              className="object-contain" // Ensure logo fits well
            />
          </div>
        </Link>
      </div>

      {/* Center Navbar - Wider & Even Spacing */}
      <nav
        className={`
          pointer-events-auto
          min-w-[600px] flex justify-between
          bg-white/10 backdrop-blur-xl
          border border-white/20
          rounded-full
          px-8 py-3 items-center
          transition-all duration-300
          ${scrolled ? "shadow-lg shadow-black/30 bg-white/15" : ""}
        `}
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-white/80 
              hover:text-white hover:bg-white/10 rounded-full px-4 py-1
              transition-all duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Generate Button - Absolute Right */}
      <div className="absolute right-8 pointer-events-auto">
        <Link
          href="/generate"
          className="px-6 py-2.5 text-sm font-medium 
            bg-[#1a1a1a] text-white rounded-full
            border border-white/20
            hover:bg-[#252525] hover:border-white/30
            active:scale-[0.98]
            transition-all duration-200
            backdrop-blur-sm block"
        >
          Generate
        </Link>
      </div>
    </motion.div>
  );
}
