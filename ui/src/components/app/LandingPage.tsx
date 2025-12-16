import { HeroSection } from "../ui/landing/HeroSection";
import { FeaturesSection } from "../ui/landing/FeaturesSection";
import { Testimonials } from "../ui/landing/Testimonials";
import { DownloadSection } from "../ui/landing/DownloadSection";

export const LandingPage = () => {
  return (
    <div className="">
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <DownloadSection />
    </div>
  );
};
