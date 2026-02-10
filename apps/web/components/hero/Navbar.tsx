"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#guidelines", label: "Guidelines" },
];

// Animation variants for the sidebar content
const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 } as const,
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1, // Stagger effect for links
      delayChildren: 0.2,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ================= DESKTOP NAVBAR (Unchanged) ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 hidden md:flex items-center justify-center pointer-events-none"
      >
        <div className="absolute left-8 pointer-events-auto">
          <Link href="/">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <Image
                src="/images/srm-logo.png"
                alt="SRM Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <nav
          className="pointer-events-auto min-w-[600px] flex justify-between bg-transparent backdrop-blur-xl rounded-full px-8 py-2 items-center transition-all duration-300"
          style={{
            boxShadow: "inset 0.5px 1px 3px 0px #ada5a5ab",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {pathname !== "/generate" && (
          <div className="absolute right-8 pointer-events-auto">
            <Link
              href="/generate"
              className="px-6 py-3 text-sm font-medium bg-transparent text-white rounded-full active:scale-[0.98] transition-all duration-200 backdrop-blur-xl block"
              style={{
                boxShadow: "inset 0.5px 1px 3px 0px #ada5a5ab",
              }}
            >
              Generate
            </Link>
          </div>
        )}
      </motion.div>

      {/* ================= MOBILE TOGGLE (Visible on small screens) ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-0 flex justify-between items-center bg-linear-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <Link href="/" className="relative w-20 h-20">
          <Image
            src="/images/srm-logo.png"
            alt="SRM Logo"
            fill
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-3 text-white bg-white/5 rounded-full backdrop-blur-md border border-white/10 active:scale-95 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-75 z-70 md:hidden flex flex-col border-l border-white/10 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #2D130A 0%, #1a0b05 100%)",
                boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
              }}
            >
              <div className="p-6 flex items-center justify-between ">
                <div className="relative w-24 h-24">
                  <Image
                    src="/images/srm-logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col p-6 gap-2 mt-2 flex-1">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-5 py-4 text-lg font-medium rounded-xl transition-all duration-200 border border-transparent ${
                        pathname === link.href
                          ? "bg-white/10 text-white border-white/5 shadow-inner"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                variants={itemVariants}
                className="p-8 border-t border-white/5 bg-black/20"
              >
                {pathname !== "/generate" && (
                  <Link
                    href="/generate"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full block py-4 text-center text-sm font-bold text-white uppercase tracking-wider rounded-2xl active:scale-[0.98] transition-transform shadow-lg relative overflow-hidden group"
                    style={{
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #5D2E22 100%)",
                      boxShadow: "0 4px 15px rgba(139, 69, 19, 0.4)",
                    }}
                  >
                    <span className="relative z-10">Generate Memory</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                )}

                <p className="text-center text-white/20 text-xs mt-6">
                  © 2026 SRM University
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
