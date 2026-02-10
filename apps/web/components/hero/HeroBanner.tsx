"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Image
          src="/images/dashboard.png"
          alt="Background Texture"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 h-screen w-full" />
      </div>

      <div className="relative z-10 flex flex-col justify-start items-center w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-100 h-45 md:w-110 md:h-50 mt-10"
        >
          <Image
            src="/images/lens.png"
            alt="Camera Lens"
            fill
            className="object-cover object-top drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="z-20 px-10 py-3 rounded-full backdrop-blur-xl bg-transparent tracking-wide text-white/90 text-[0.8rem] font-medium -mt-4"
          style={{
            boxShadow: "inset 0.5px 1px 3px 0px #ada5a5ab",
          }}
        >
          Celebrating 40 Years of Excellence
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-items-start items-start w-200 h-130 md:w-240 md:h-120"
        >
          <Image
            src="/images/milan-logo.png"
            alt="Milan Logo"
            className="object-contain"
            fill
            priority
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-md md:text-sm text-white/40 leading-relaxed not-italic font-normal transform-none max-w-sm md:max-w-lg text-center pb-0 md:pb-10"
        >
          Transform your favorite campus moments into polaroid memories.
          Celebrate four decades of SRM legacy with every snapshot.
        </motion.p>
      </div>
    </section>
  );
}
