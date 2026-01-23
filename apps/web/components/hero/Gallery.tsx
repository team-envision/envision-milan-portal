"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

const samples = [
  {
    id: 1,
    title: "Batch of 2022 – Hostel Memories",
    image: "/samples/sample1.png",
  },
  {
    id: 2,
    title: "First Day at SRM",
    image: "/samples/sample2.png",
  },
  {
    id: 3,
    title: "Tech Fest Moments",
    image: "/samples/sample3.png",
  },
  {
    id: 4,
    title: "Cultural Night 2019",
    image: "/samples/sample4.png",
  },
];

export default function GalleryCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % samples.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  };

  return (
    <section className="py-28 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-6"
      >
        <h2 className="text-3xl font-semibold text-center">Sample Creations</h2>

        <p className="text-center text-gray-600 mt-3">
          Explore how memories transform into commemorative posters
        </p>

        {/* Carousel */}
        <div className="relative mt-14 flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-0 z-10 p-3 rounded-full bg-white shadow hover:bg-gray-100"
          >
            ←
          </button>

          {/* Image */}
          <div className="w-full max-w-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={samples[index].id}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-[360px] bg-gray-200 flex items-center justify-center">
                  {/* Replace with next/image later */}
                  <span className="text-gray-500">Image Placeholder</span>
                </div>

                <div className="p-4 text-center bg-white">
                  <p className="font-medium">{samples[index].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-0 z-10 p-3 rounded-full bg-white shadow hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
