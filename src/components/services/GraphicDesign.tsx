import React from "react";
import "../../styles/services/GraphicDesign.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const GraphicDesign: React.FC = () => {
  return (
    <div className="graphic-design-container">
      <h1>Graphic Design Services</h1>
      <p>
        Unleash the power of visuals with our expert graphic design services. Whether you need a stunning logo, captivating social media graphics, or a complete branding overhaul, our team of creative designers is here to bring your vision to life.
      </p>
      <p>
        We specialize in:
      </p>
      <ul>
        <li>Logo and Brand Identity Design</li>
        <li>Brochures, Flyers, and Print Design</li>
        <li>Social Media Graphics</li>
        <li>Web and Mobile App Design</li>
        <li>Infographics and Presentation Design</li>
      </ul>
      <p>
        Let us help you create a memorable and impactful brand identity that stands out in a crowded market.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Graphic Design" />
      </div>
    </div>
  );
};

export default GraphicDesign;