// HeroSection.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/views/HeroSection.scss"; // Import the SCSS file

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Connecting Freelancers with Clients</h1>
        <p className="hero-subtitle">
          Find the right talent for your project or offer your skills to clients in need.
        </p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigate("/register")}>
            Join Us Today
          </button>
          <button className="cta-button secondary" onClick={() => navigate("/register")}>
            Sign Up
          </button>
          <button className="cta-button tertiary" onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;