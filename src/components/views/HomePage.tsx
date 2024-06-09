import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import CallToAction from "./CallToAction";
import FeatureUpdates from "./FeatureUpdates";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <FeatureUpdates />
      <CallToAction />
    </div>
  );
};

export default HomePage;

