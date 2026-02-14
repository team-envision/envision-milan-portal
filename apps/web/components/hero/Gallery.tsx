/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/posters");

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        if (!mounted) return;

        const items = Array.isArray(data.items) ? data.items : [];

        items.sort((a: any, b: any) => {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return tb - ta;
        });

        setPosters(items);
      } catch (err) {
        console.error("Failed to fetch posters", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(posters.length / ITEMS_PER_PAGE));
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentPosters = posters.slice(startIdx, endIdx);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section
      id="gallery"
      className="bg-transparent min-h-screen relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-10 md:px-0 flex flex-col items-center justify-center">
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
          <p className="mt-4 text-white/50 max-w-xl text-lg tracking-wide">
            Get inspired by memories created by fellow SRMites celebrating 40
            years of legacy
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-200"></div>
          </div>
        ) : posters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="text-white/60 text-xl mb-8">
              No posters generated yet.
            </p>
            <Link
              href="/generate"
              className="px-6 py-3 text-sm font-medium bg-transparent text-white rounded-full active:scale-[0.98] transition-all duration-200 backdrop-blur-xl block"
              style={{
                boxShadow: "inset 0.5px 1px 3px 0px #ada5a5ab",
              }}
            >
              Generate Your Memory
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              key={`gallery-page-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            >
              {currentPosters.map((sample: any, idx: number) => {
                const imageSrc = sample.imageUrl;
                const title = sample.theme || "SRM Memory";
                const submitter = "SRM University";
                const time = (() => {
                  try {
                    const days = Math.floor(
                      (Date.now() - new Date(sample.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24),
                    );
                    return days <= 0 ? "today" : `${days} days`;
                  } catch (e) {
                    return "recent";
                  }
                })();

                const rotations = [-3, 2, -1, 3, -2, 1];
                const rotation = rotations[idx % rotations.length];

                return (
                  <motion.div
                    key={`${currentPage}-${sample.id}-${idx}`}
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
                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10 z-10
                        bg-linear-to-b from-amber-100/90 to-amber-200/80
                        backdrop-blur-xl
                        shadow-sm opacity-20"
                      style={{
                        boxShadow: "inset 0.5px 1px 3px 0px #ada5a5ab",
                      }}
                    />

                    <div
                      className="relative p-4 pb-6 shadow-xl overflow-hidden
                      group-hover:shadow-2xl group-hover:shadow-black/40
                      transition-shadow duration-300 rounded-xl"
                    >
                      <img
                        src="/images/dashboard.png"
                        alt="Polaroid Background"
                        className="absolute inset-0 w-full h-full object-cover bg-white opacity-90 rounded-xl"
                      />

                      <div className="absolute inset-0 bg-black opacity-40"></div>

                      <div className="relative z-10 ">
                        <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        <div className="mt-3 text-center">
                          <p className="font-normal text-white text-md">
                            {title}
                          </p>
                          <p className="text-xs text-white/80 mt-1">
                            {submitter} • {time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-16 flex items-center justify-center gap-6"
              >
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

                <span className="text-white/60 text-sm font-medium">
                  {currentPage + 1} / {totalPages}
                </span>

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
          </>
        )}
      </div>
    </section>
  );
}
