"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Simple Icon Components for the exact look
const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <a href="#" className="text-white/60 hover:text-white transition-colors">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // Matches the rounded card style in your original code, but with the new content
        className="max-w-[1400px] mx-auto bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Directorate Logo & Socials */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-8">
            <div className="flex flex-col items-start gap-6">
              {/* Placeholder for Directorate of Student Affairs Logo */}
              {/* Replace this div with: <Image src="/path-to-logo.png" width={150} height={150} alt="Directorate Logo" /> */}
              <div className="w-40 h-40 rounded-full bg-rose-300/20 border border-rose-300/30 flex items-center justify-center text-center p-4">
                 <span className="text-rose-300 text-xs font-bold uppercase tracking-widest">Directorate Logo Placeholder</span>
              </div>
            </div>

            {/* Social Icons (Left) */}
            <div className="flex items-center gap-6 mt-auto">
              <SocialIcon>
                {/* Facebook Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </SocialIcon>
              <SocialIcon>
                {/* X / Twitter Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialIcon>
              <SocialIcon>
                {/* LinkedIn Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </SocialIcon>
              <SocialIcon>
                {/* Instagram Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 md:pl-8 pt-4">
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

          {/* Column 3: Legal */}
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

          {/* Column 4: Aaruush Branding & Team Envision */}
          <div className="md:col-span-4 flex flex-col items-end justify-between space-y-8">
            
            {/* Top Right: Aaruush Logo & Socials */}
            <div className="flex flex-col items-end gap-4 w-full">
               {/* Placeholder for Aaruush Logo */}
               {/* Replace with <Image src="/aaruush-logo.png" ... /> */}
               <div className="w-full max-w-[250px] h-12 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded flex items-center justify-center">
                  <span className="text-orange-400 font-bold tracking-widest text-sm">AARUUSH '25 LOGO</span>
               </div>

               {/* Right Side Icons */}
               <div className="flex items-center gap-4">
                  <div className="flex gap-3 text-white/60">
                    {/* Small icons row below logo */}
                     <SocialIcon><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></SocialIcon>
                     <SocialIcon><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></SocialIcon>
                     <SocialIcon><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></SocialIcon>
                     <SocialIcon><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></SocialIcon>
                     <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                     <SocialIcon><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z"/></svg></SocialIcon> {/* Android Placeholder */}
                     <SocialIcon><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.86-1.09 1.54-3.5.23-5.05-1.31.53-2.89 1.31-3.8 3.48-.6.5-1.16 2.06.27 3.53 1.2.06 2.37-1.04 3.3-1.96z"/></svg></SocialIcon> {/* Apple */}
                  </div>
               </div>
            </div>

            {/* Team Envision Box */}
            <div className="border border-white/20 rounded-xl p-4 w-full max-w-[280px]">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-6 h-8 bg-yellow-500/20 text-yellow-500 flex items-center justify-center rounded">
                    {/* Bulb Icon Placeholder */}
                    💡
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">TEAM</span>
                    <span className="text-white font-bold tracking-widest text-sm">ENVISION</span>
                 </div>
               </div>
               <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
                  <span className="hover:text-orange-500 transition-colors cursor-default">Designed</span>
                  <span className="text-white/10">•</span>
                  <span className="hover:text-orange-500 transition-colors cursor-default">Developed</span>
                  <span className="text-white/10">•</span>
                  <span className="hover:text-orange-500 transition-colors cursor-default">Deployed</span>
               </div>
               {/* Socials Bottom of Box */}
               <div className="flex justify-center gap-4 mt-3 pt-2">
                   <SocialIcon><div className="w-3 h-3 bg-white/40 rounded-full" /></SocialIcon> {/* Generic Web */}
                   <SocialIcon><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></SocialIcon>
                   <SocialIcon><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></SocialIcon>
                   <SocialIcon><svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></SocialIcon>
               </div>
            </div>

          </div>
        </div>
      </motion.div>
    </footer>
  );
}