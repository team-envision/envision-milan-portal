"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const footLinks = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Generate Image" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#guidelines", label: "Guidelines" },
  ];
  const legalLinks = [
    {
      href: "https://www.srmmilan.in/docs/privacy-policy.pdf",
      label: "Privacy Policy",
    },
    {
      href: "https://www.srmmilan.in/docs/terms-of-service.pdf",
      label: "Terms & Conditions",
    },
    { href: "mailto:techteam.sa@srmist.edu.in", label: "Contact Us" },
  ];
  const aaruushSocials = [
    {
      href: "https://aaruush.org",
      iconSrc: "/images/aarush_website.png",
      alt: "Website",
      size: 35,
    },
    {
      href: "https://www.facebook.com/aaruush.srm",
      iconSrc: "/images/facebook.png",
      alt: "Facebook",
      size: 18,
    },
    {
      href: "https://twitter.com/aaruushsrmist",
      iconSrc: "/images/X.png",
      alt: "X",
      size: 18,
    },
    {
      href: "https://www.linkedin.com/company/aaruush-srm-ist/",
      iconSrc: "/images/Linkedin.png",
      alt: "LinkedIn",
      size: 18,
    },
    {
      href: "https://www.instagram.com/aaruush_srm/",
      iconSrc: "/images/Instagram.png",
      alt: "Instagram",
      size: 18,
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.aaruush.connect",
      iconSrc: "/images/Android.png",
      alt: "Android",
      size: 18,
    },
    {
      href: "https://apps.apple.com/in/app/aaruush-connect/id6737286063",
      iconSrc: "/images/ios.png",
      alt: "iOS",
      size: 18,
    },
  ];

  const envisionSocials = [
    {
      href: "https://envision.aaruush.org",
      iconSrc: "/images/Envision_website.png",
      alt: "Website",
    },
    {
      href: "https://www.facebook.com/teamenvision.srm/",
      iconSrc: "/images/facebook.png",
      alt: "Facebook",
    },
    {
      href: "https://twitter.com/envision_srm",
      iconSrc: "/images/X.png",
      alt: "X",
    },
    {
      href: "https://www.linkedin.com/company/team-envision/",
      iconSrc: "/images/Linkedin.png",
      alt: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/teamenvision_srm/",
      iconSrc: "/images/Instagram.png",
      alt: "Instagram",
    },
  ];

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
              <Link
                href="https://www.srmmilan.in/"
                target="_blank"
                className="w-full"
              >
                <Image
                  src="/images/DSA_logo.png"
                  alt="Directorate of Student Affairs"
                  width={240}
                  height={240}
                  className="object-contain w-full h-auto"
                />
              </Link>

              <div className="flex items-center justify-between w-full mt-8 md:mt-6 px-4 md:px-0">
                <a
                  href="https://www.facebook.com/srmmilan"
                  target="_blank"
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
                  href="https://x.com/srm_milan"
                  target="_blank"
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
                  href="https://www.youtube.com/@DSAEVENTS"
                  target="_blank"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src="/images/youtube.png"
                    alt="Youtube"
                    width={24}
                    height={24}
                    className="md:w-8 md:h-8"
                  />
                </a>
                <a
                  href="https://www.instagram.com/srmist_milan/"
                  target="_blank"
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
                {footLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors block py-1 md:py-0"
                    >
                      {link.label}
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
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      className="text-sm text-white/50 hover:text-white transition-colors block py-1 md:py-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-between space-y-12 md:space-y-8 pt-8 md:pt-2">
            <div className="flex flex-col items-center md:items-end w-full max-w-[320px]">
              <Link
                href="https://www.aaruush.org/"
                target="_blank"
                className="w-full"
              >
                <Image
                  src="/images/Aaruush_logo.png"
                  alt="Aaruush '25"
                  width={320}
                  height={80}
                  className="object-contain w-full h-auto"
                />
              </Link>
              <div className="flex items-center justify-between w-full mt-6 px-2 md:px-0">
                {aaruushSocials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={social.iconSrc}
                      alt={social.alt}
                      width={social.size}
                      height={social.size}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end w-full max-w-65">
              <Link
                href="https://envision.aaruush.org/"
                target="_blank"
                className="w-full"
              >
                <Image
                  src="/images/Envision_logo.png"
                  alt="Team Envision"
                  width={260}
                  height={90}
                  className="object-contain w-full h-auto"
                />
              </Link>
              <div className="flex items-center justify-between w-full mt-6 px-2 md:px-0">
                {envisionSocials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={social.iconSrc}
                      alt={social.alt}
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
