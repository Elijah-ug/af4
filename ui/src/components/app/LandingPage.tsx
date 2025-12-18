import { HeroSection } from "../ui/landing/HeroSection";
import { FeaturesSection } from "../ui/landing/FeaturesSection";
import { Testimonials } from "../ui/landing/Testimonials";
import { DownloadSection } from "../ui/landing/DownloadSection";
import { Footer } from "../ui/Footer";

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">
        <HeroSection />
        <FeaturesSection />
        <Testimonials />
        <DownloadSection />
      </div>
      <Footer />
    </div>
  );
};
