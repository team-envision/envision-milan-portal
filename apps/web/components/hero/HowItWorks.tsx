"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Upload Image",
    description: "Choose your favorite campus photo or memory from your device",
    icon: "/images/upload.png",
  },
  {
    number: 2,
    title: "Choose Theme",
    description: "Select from iconic SRM buildings and campus locations",
    icon: "/images/color-pallete.png",
  },
  {
    number: 3,
    title: "AI Generates",
    description: "Our AI transforms your image into a beautiful polaroid",
    icon: "/images/star.png",
  },
  {
    number: 4,
    title: "Download & Share",
    description: "Save your polaroid and share it with the SRM community",
    icon: "/images/Download.png",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            How it Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group pt-6"
            >
              {/* Number Badge */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <span className="text-black font-bold text-lg">{step.number}</span>
                </div>
              </div>

              {/* Card Container */}
              <div className="relative bg-[#0F0F0F] rounded-[32px] pt-16 pb-12 px-8 h-full border border-white/5 transition-all duration-300 hover:border-white/10 hover:bg-[#121212]">
                
                {/* Connector Line - Only for 2nd, 3rd, 4th cards (index > 0) */}
                {/* Starts from right edge of previous card (-24px gap) and ends at center of this card (50%) */}
                {index > 0 && (
                  <div className="hidden lg:block absolute top-[6.5rem] right-1/2 left-[-24px] h-[1px] bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] z-0" />
                )}

                {/* Icon */}
                <div className="relative z-10 mb-8 flex items-center justify-center">
                  <div className="relative w-20 h-20 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      fill
                      className="object-contain invert brightness-0 filter" 
                      style={{ filter: "brightness(0) invert(1)" }} 
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3 relative z-10">
                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
