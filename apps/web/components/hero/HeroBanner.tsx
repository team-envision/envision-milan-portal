"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center pt-20">
      {/* Camera Lens Visual - Cropped from top, decorative */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full flex justify-center -mt-8"
      >
        {/* Actual Image Asset */}
        <div className="relative w-[480px] h-[300px]">
          <Image 
            src="/images/camera-lens.png"
            alt="Camera Lens"
            fill
            className="object-contain object-top drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* "Celebrating 40 Years of Excellence" Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="-mt-24 z-10" // Pull closer to lens
      >
        <div className="px-8 py-3 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-sm">
          <span className="text-xs font-medium text-white/70 tracking-wide">
            Celebrating 40 Years of Excellence
          </span>
        </div>
      </motion.div>

      {/* Polaroid Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -720, x: "-100vw" }}
        animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
        transition={{ 
          duration: 2.5, 
          delay: 0.5, 
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.5 },
          scale: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
          rotate: { duration: 2.5, ease: "easeOut" },
          x: { duration: 2.2, ease: [0.22, 1, 0.36, 1] }
        }}
        className="relative mt-6"
      >
        {/* Polaroid frame - NO tape decoration */}
        <div className="bg-[#f5f5f0] p-4 pb-6 shadow-2xl shadow-black/50" style={{ width: "280px" }}>
          {/* Image area */}
          <div 
            className="aspect-[4/3] bg-gray-200 overflow-hidden relative"
          >
            {/* Real Polaroid Image */}
            <Image
              src="/images/polaroid-sample.jpg"
              alt="Polaroid Memory"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Caption area */}
          <div className="mt-3 text-center">
            <p className="text-[#333] text-sm font-medium leading-snug">
              Capture your SRM moments in<br />
              <span className="text-[#333]">a Polaroid</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Supporting Text - Subtle, muted */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-md mx-auto text-center px-6"
      >
        <p className="text-sm text-white/40 leading-relaxed not-italic transform-none">
          Transform your favorite campus moments into polaroid memories. Celebrate
          four decades of SRM legacy with every snapshot.
        </p>
      </motion.div>
    </section>
  );
}
