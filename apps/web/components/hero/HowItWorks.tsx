"use client";

import { motion, Variants } from "framer-motion";

type IconName = "upload" | "theme" | "generate" | "download";

const steps: { number: number; title: string; description: string; iconName: IconName }[] = [
  {
    number: 1,
    title: "Upload Image",
    description: "Choose your favorite campus photo or memory from your device",
    iconName: "upload",
  },
  {
    number: 2,
    title: "Choose Theme",
    description: "Select from iconic SRM buildings and campus locations",
    iconName: "theme",
  },
  {
    number: 3,
    title: "AI Generates",
    description: "Our AI transforms your image into a beautiful polaroid",
    iconName: "generate",
  },
  {
    number: 4,
    title: "Download & Share",
    description: "Save your polaroid and share it with the SRM community",
    iconName: "download",
  },
];

function StepIcon({ name }: { name: IconName }) {
  const icons: Record<IconName, React.ReactNode> = {
    upload: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    theme: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    generate: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    download: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            How it Works
          </h2>
        </motion.div>

        {/* Steps Grid - 4 columns with new card design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="relative"
            >
              {/* Number Badge - positioned at top center with notch effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border-2 border-white/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">{step.number}</span>
                </div>
              </div>
              
              {/* Card with notch at top */}
              <div className="relative bg-[#151515] border border-white/10 rounded-2xl pt-10 pb-6 px-5
                transition-all duration-300 hover:border-white/20 h-full"
              >
                {/* Top notch/cutout visual using pseudo effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#0a0a0a] rounded-b-xl" />
                
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center text-white/80">
                    <StepIcon name={step.iconName} />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-base font-semibold text-white text-center">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-white/40 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
