import React from "react";
import "../../styles/services/ProgrammingTech.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const ProgrammingTech: React.FC = () => {
  return (
    <div className="programming-tech-container">
      <h1>Programming and Tech Services</h1>
      <p>
        Stay ahead in the digital age with our cutting-edge programming and tech services. From developing robust applications to providing technical support, our team is ready to tackle any challenge.
      </p>
      <p>
        Our expertise includes:
      </p>
      <ul>
        <li>Custom Software Development</li>
        <li>Web and Mobile App Development</li>
        <li>Cloud Solutions and Infrastructure</li>
        <li>IT Support and Maintenance</li>
        <li>Cybersecurity and Data Protection</li>
      </ul>
      <p>
        Let us help you build and maintain technology solutions that drive your business forward.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Programming and Tech" />
      </div>
    </div>
  );
};

export default ProgrammingTech;