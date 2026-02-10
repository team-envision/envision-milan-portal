"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/dashboard.png" 
          alt="Background Texture"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" /> 
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* Camera Lens Visual */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex justify-center -mt-18"
        >
          {/* CHANGE 1: Increased size of the camera container 
              Old: w-[480px] h-[300px]
              New: w-[600px] h-[380px] (and added responsive sizing)
          */}
          <div className="relative w-[350px] h-[220px] md:w-[600px] md:h-[380px]">
            <Image 
              src="/images/Camera-Lens.png"
              alt="Camera Lens"
              fill
              className="object-contain object-top drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Badge (Button) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          // CHANGE 2: Adjusted margin to account for bigger camera (-mt-30 -> -mt-36)
          className="-mt-24 md:-mt-36 z-20" 
        >
          <div className="px-6 py- rounded-full border-2 border-white/20 bg-black/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/90 tracking-wide">
              Celebrating 40 Years of Excellence
            </span>
          </div>
        </motion.div>

        {/* New Central Image (Milan Logo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-16 z-10"
        >
          <div className="relative w-[360px] h-[240px] md:w-[850px] md:h-[500px]">
            <Image
              src="/images/milan-logo.png"
              alt="Hero Display"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-12 max-w-md mx-auto text-center px-4 relative z-10"
        >
          <p className="text-sm text-white/40 leading-relaxed not-italic transform-none">
            Transform your favorite campus moments into polaroid memories. Celebrate
            four decades of SRM legacy with every snapshot.
          </p>
        </motion.div>
      
      </div>
    </section>
  );
}