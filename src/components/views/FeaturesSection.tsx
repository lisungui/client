// FeaturesSection.tsx
import React from "react";
import "../../styles/views/FeaturesSection.scss";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Secure Payments",
      description: "We offer reliable and secure payment solutions to ensure your transactions are safe.",
      icon: "🔒", // Placeholder for actual icon
      colorClass: "feature-secure", // Unique class for styling
    },
    {
      title: "Quality Freelancers",
      description: "Find top-notch freelancers who are skilled and ready to meet your project needs.",
      icon: "🌟",
      colorClass: "feature-quality",
    },
    {
      title: "Seamless Communication",
      description: "Enjoy easy and effective communication with our integrated messaging tools.",
      icon: "💬",
      colorClass: "feature-communication",
    },
    {
      title: "Wide Range of Services",
      description: "From web development to graphic design, we offer a wide variety of services.",
      icon: "🛠️",
      colorClass: "feature-services",
    },
  ];

  return (
    <div className="features-section">
      <h2 className="features-title">Our Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            colorClass={feature.colorClass} // Pass the unique class
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
