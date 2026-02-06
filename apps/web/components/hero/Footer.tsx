"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Column 1: DSA Logo & Socials (Span 3) */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            {/* Wrapper div with fixed width to ensure logo and socials align perfectly */}
            <div className="flex flex-col items-start w-[240px]"> 
              <Image
                src="/images/DSA_logo.png"
                alt="Directorate of Student Affairs"
                width={240}
                height={240}
                className="object-contain w-full h-auto"
              />

              {/* Social Icons - Justify Between to span full width of logo */}
              <div className="flex items-center justify-between w-full mt-6">
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/X.png" alt="X" width={20} height={20} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Linkedin.png" alt="LinkedIn" width={20} height={20} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Instagram.png" alt="Instagram" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 3) */}
          <div className="md:col-span-3 md:pl-8 pt-4">
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Generate Image', 'How It Works', 'Gallery', 'Guidelines'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal (Span 2) */}
          <div className="md:col-span-2 pt-4">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms & Conditions', 'Support', 'Contact Us'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Aaruush & Team Envision (Span 4) */}
          <div className="md:col-span-4 flex flex-col items-end justify-between space-y-8 pt-2">
            
            {/* Aaruush Section */}
            {/* Fixed width [320px] to make it largest and alignment strict */}
            <div className="flex flex-col items-end w-[320px]">
              <Image
                src="/images/Aaruush_logo.png"
                alt="Aaruush '25"
                width={320}
                height={80}
                className="object-contain w-full h-auto"
              />

              {/* Aaruush Social Icons - Spanning full width */}
              <div className="flex items-center justify-between w-full mt-4">
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/aarush_website.png" alt="Aaruush Website" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/facebook.png" alt="Facebook" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/X.png" alt="X" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Linkedin.png" alt="LinkedIn" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Instagram.png" alt="Instagram" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Android.png" alt="Android" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/ios.png" alt="iOS" width={18} height={18} />
                </a>
              </div>
            </div>

            {/* Team Envision Section */}
            {/* Fixed width [260px] - Wider than previous but narrower than Aaruush */}
            <div className="flex flex-col items-end w-[260px]">
              <Image
                src="/images/Envision_logo.png"
                alt="Team Envision"
                width={260}
                height={90}
                className="object-contain w-full h-auto"
              />

              {/* Envision Social Icons - Spanning full width */}
              <div className="flex items-center justify-between w-full mt-4">
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Envision_website.png" alt="Envision Website" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/facebook.png" alt="Facebook" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/X.png" alt="X" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Linkedin.png" alt="LinkedIn" width={18} height={18} />
                </a>
                <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Instagram.png" alt="Instagram" width={18} height={18} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </footer>
  );
}