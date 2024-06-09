// FeatureCard.tsx
import React from "react";
import "../../styles/views/FeatureCard.scss";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  colorClass: string; // Add a prop for the color class
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, colorClass }) => {
  return (
    <div className={`feature-card ${colorClass}`}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default FeatureCard;