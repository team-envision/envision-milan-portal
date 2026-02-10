"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center bg-transparent relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-t-2 rounded-[40px] p-8 md:p-12 flex flex-col justify-center overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#1B0B05] border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-3 flex flex-col items-center md:items-start justify-between space-y-6">
            <div className="flex flex-col items-center md:items-start w-full max-w-60">
              <Image
                src="/images/DSA_logo.png"
                alt="Directorate of Student Affairs"
                width={240}
                height={240}
                className="object-contain w-full h-auto"
              />

              <div className="flex items-center justify-between w-full mt-8 md:mt-6 px-4 md:px-0">
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="md:w-5 md:h-5"
                  />
                </a>
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src="/images/X.png"
                    alt="X"
                    width={24}
                    height={24}
                    className="md:w-5 md:h-5"
                  />
                </a>
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src="/images/Linkedin.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="md:w-5 md:h-5"
                  />
                </a>
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src="/images/Instagram.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="md:w-5 md:h-5"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-5 flex flex-row justify-center md:justify-start gap-12 md:gap-0 w-full">
            <div className="w-1/2 md:w-auto md:flex-1 md:pl-8 pt-4 text-center">
              <h4 className="text-white font-semibold mb-6 text-lg md:text-base">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  "Home",
                  "Generate Image",
                  "How It Works",
                  "Gallery",
                  "Guidelines",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors block py-1 md:py-0"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2 md:w-auto md:flex-1 pt-4 text-center">
              <h4 className="text-white font-semibold mb-6 text-lg md:text-base">
                Legal
              </h4>
              <ul className="space-y-4">
                {[
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Support",
                  "Contact Us",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors block py-1 md:py-0"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-between space-y-12 md:space-y-8 pt-8 md:pt-2">
            <div className="flex flex-col items-center md:items-end w-full max-w-[320px]">
              <Image
                src="/images/Aaruush_logo.png"
                alt="Aaruush '25"
                width={320}
                height={80}
                className="object-contain w-full h-auto"
              />
              <div className="flex items-center justify-between w-full mt-6 px-2 md:px-0">
                {[
                  {
                    src: "/images/aarush_website.png",
                    alt: "Website",
                    w: 35,
                  },
                  { src: "/images/facebook.png", alt: "Facebook", w: 18 },
                  { src: "/images/X.png", alt: "X", w: 18 },
                  { src: "/images/Linkedin.png", alt: "LinkedIn", w: 18 },
                  { src: "/images/Instagram.png", alt: "Instagram", w: 18 },
                  { src: "/images/Android.png", alt: "Android", w: 18 },
                  { src: "/images/ios.png", alt: "iOS", w: 18 },
                ].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={icon.w}
                      height={icon.w}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end w-full max-w-65">
              <Image
                src="/images/Envision_logo.png"
                alt="Team Envision"
                width={260}
                height={90}
                className="object-contain w-full h-auto"
              />
              <div className="flex items-center justify-between w-full mt-6 px-2 md:px-0">
                {[
                  { src: "/images/Envision_website.png", alt: "Website" },
                  { src: "/images/facebook.png", alt: "Facebook" },
                  { src: "/images/X.png", alt: "X" },
                  { src: "/images/Linkedin.png", alt: "LinkedIn" },
                  { src: "/images/Instagram.png", alt: "Instagram" },
                ].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
