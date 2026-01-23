import HeroBanner from "@/components/hero/HeroBanner";
import AboutPortal from "@/components/hero/AboutPortal";
import HowItWorks from "@/components/hero/HowItWorks";
import GalleryCarousel from "@/components/hero/Gallery";
import Guidelines from "@/components/hero/Guidelines";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <AboutPortal />
      <HowItWorks />
      <GalleryCarousel />
      <Guidelines />
    </>
  );
}
