"use client";

import { useEffect, useState } from "react";
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

const ITEMS_PER_PAGE = 6;

export default function GalleryCarousel() {
  const [posters, setPosters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/posters");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;

        const items = Array.isArray(data.items) ? data.items : [];

        // Sort newest first by createdAt
        items.sort((a: any, b: any) => {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return tb - ta;
        });

        setPosters(items);
      } catch (err) {
        // ignore - keep sample placeholders
        console.error("Failed to fetch posters", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const displayPosters = posters.length ? posters : samples;
  const totalPages = Math.ceil(displayPosters.length / ITEMS_PER_PAGE);
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentPosters = displayPosters.slice(startIdx, endIdx);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-12 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
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
          {currentPosters.map((sample: any, idx: number) => {
            // Determine image and metadata
            const isPoster = !!posters.length;
            const imageSrc = isPoster ? sample.imageUrl : sample.image;
            const title = isPoster ? (sample.theme || "SRM Memory") : sample.title;
            const submitter = isPoster ? "SRM University" : sample.submitter;
            const time = isPoster
              ? (() => {
                  try {
                    const days = Math.floor((Date.now() - new Date(sample.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                    return days <= 0 ? "today" : `${days} days`;
                  } catch (e) {
                    return "recent";
                  }
                })()
              : sample.time;

            const rotations = [-3, 2, -1, 3, -2, 1];
            const rotation = rotations[idx % rotations.length];

            return (
              <motion.div
                key={isPoster ? sample.id : sample.id}
                custom={rotation}
                variants={cardVariants}
                whileHover={{
                  rotate: 0,
                  scale: 1.05,
                  zIndex: 10,
                  transition: { duration: 0.3 },
                }}
                className="group relative cursor-pointer"
                style={{ transformOrigin: "center bottom" }}
              >
                {/* Tape decoration */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 z-10
                    bg-gradient-to-b from-amber-100/90 to-amber-200/80
                    shadow-sm"
                  style={{ transform: `translateX(-50%) rotate(${rotation > 0 ? 3 : -3}deg)` }}
                />

                {/* Polaroid card */}
                <div className="bg-white p-3 pb-6 shadow-xl 
                  group-hover:shadow-2xl group-hover:shadow-black/40
                  transition-shadow duration-300">
                  {/* Image container */}
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-3 text-center">
                    <p className="font-medium text-gray-800 text-sm">
                      {title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {submitter} • {time}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 flex items-center justify-center gap-6"
          >
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full border border-white/20 text-white
                hover:bg-white/5 hover:border-white/30 transition-all duration-200"
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Indicator */}
            <span className="text-white/60 text-sm font-medium">
              {currentPage + 1} / {totalPages}
            </span>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/20 text-white
                hover:bg-white/5 hover:border-white/30 transition-all duration-200"
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
