"use client";

import { motion, Variants } from "framer-motion";


const samples = [
  {
    id: 1,
    title: "Main Gate Memories",
    submitter: "SRM University",
    time: "12 days",
    rotation: -3,
    image: "/samples/sample1.png",
  },
  {
    id: 2,
    title: "Campus Friendship",
    submitter: "SRM University",
    time: "12 days",
    rotation: 2,
    image: "/samples/sample2.png",
  },
  {
    id: 3,
    title: "Library Nights",
    submitter: "SRM University",
    time: "12 days",
    rotation: -1,
    image: "/samples/sample3.png",
  },
  {
    id: 4,
    title: "Auditorium Events",
    submitter: "SRM University",
    time: "8 days",
    rotation: 3,
    image: "/samples/sample4.png",
  },
  {
    id: 5,
    title: "Engineering Block",
    submitter: "SRM University",
    time: "6 days",
    rotation: -2,
    image: "/samples/sample5.png",
  },
  {
    id: 6,
    title: "Graduation Day",
    submitter: "SRM University",
    time: "4 days",
    rotation: 1,
    image: "/samples/sample6.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotate: 0 },
  visible: (rotation: number) => ({
    opacity: 1,
    y: 0,
    rotate: rotation,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function GalleryCarousel() {
  return (
    <section id="gallery" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Sample Generations
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Get inspired by memories created by fellow SRMites celebrating 40 years of legacy
          </p>
        </motion.div>

        {/* Polaroid Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {samples.map((sample) => (
            <motion.div
              key={sample.id}
              custom={sample.rotation}
              variants={cardVariants}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              className="group relative cursor-pointer"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Tape decoration */}
              <div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 z-10
                  bg-gradient-to-b from-amber-100/90 to-amber-200/80
                  shadow-sm"
                style={{ transform: `translateX(-50%) rotate(${sample.rotation > 0 ? 3 : -3}deg)` }}
              />
              
              {/* Polaroid card */}
              <div className="bg-white p-3 pb-6 shadow-xl 
                group-hover:shadow-2xl group-hover:shadow-black/40
                transition-shadow duration-300">
                {/* Image container */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {/* Placeholder - replace with actual images */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 
                    flex items-center justify-center
                    group-hover:scale-105 transition-transform duration-700">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-400/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400">Sample {sample.id}</span>
                    </div>
                  </div>
                </div>
                
                {/* Caption */}
                <div className="mt-3 text-center">
                  <p className="font-medium text-gray-800 text-sm">
                    {sample.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {sample.submitter} • {sample.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 rounded-xl border border-white/20 text-white font-medium
            hover:bg-white/5 hover:border-white/30 transition-all duration-200">
            View More Memories
          </button>
        </motion.div>
      </div>
    </section>
  );
}
