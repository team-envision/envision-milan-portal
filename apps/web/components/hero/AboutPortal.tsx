"use client";

import { motion } from "framer-motion";

export default function AboutPortal() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative Circles on Left - Two overlapping circles with line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-0 pointer-events-none opacity-40 scale-[0.85] origin-left">
        <svg width="367" height="316" viewBox="0 0 367 316" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2002_167)">
            <g opacity="1">
              <path d="M59.2652 313.178C146.199 313.178 216.667 243.707 216.667 157.977C216.667 72.2476 146.199 2.77686 59.2652 2.77686C-27.6683 2.77686 -98.1367 72.2924 -98.1367 158.022C-98.1367 243.752 -27.6683 313.223 59.2652 313.223V313.178Z" stroke="#E8E8E8" strokeMiterlimit="10"/>
              <path d="M206.78 313.178C293.713 313.178 364.182 243.707 364.182 157.977C364.182 72.2476 293.713 2.77686 206.78 2.77686C119.846 2.77686 49.3779 72.2476 49.3779 157.977C49.3779 243.707 119.846 313.178 206.78 313.178Z" stroke="#E8E8E8" strokeMiterlimit="10"/>
              <path d="M-98.7627 157.978H217.294" stroke="#E8E8E8" strokeMiterlimit="10"/>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_2002_167">
              <rect width="367" height="316" fill="black"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl mx-auto text-center px-6"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
          About the Portal
        </h2>
        
        <div className="mt-10">
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed">
            As we celebrate 40 years of SRM University, we invite our students and alumni 
            to be part of this historic milestone. This portal is more than just a photo 
            generator—it&apos;s a digital archive of memories, friendships, and the countless 
            moments that have shaped our community.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
