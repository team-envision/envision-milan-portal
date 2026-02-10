import HeroBanner from "@/components/hero/HeroBanner";
import AboutPortal from "@/components/hero/AboutPortal";
import HowItWorks from "@/components/hero/HowItWorks";
import GalleryCarousel from "@/components/hero/Gallery";
import Guidelines from "@/components/hero/Guidelines";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="relative">
          <HeroBanner />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-b from-transparent to-[#240E07] pointer-events-none"></div>
        </div>
        <AboutPortal />
      </div>
      <div className="relative">
        <HowItWorks />
        <div className="hidden md:block absolute left-40 top-5/13 -translate-x-1/2 -translate-y-1/2 z-0 w-120 h-170">
          <Image
            src="/images/peacock.png"
            alt="Decorative Element"
            className="object-contain"
            fill
            priority
          />
        </div>
        <GalleryCarousel />
      </div>
      <Guidelines />
    </>
  );
}
