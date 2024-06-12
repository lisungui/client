import React from "react";
import "../../styles/services/DigitalMarketing.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const DigitalMarketing: React.FC = () => {
  return (
    <div className="digital-marketing-container">
      <h1>Digital Marketing Services</h1>
      <p>
        Elevate your online presence and drive results with our comprehensive digital marketing services. From search engine optimization to social media management, we have the expertise to help you reach your target audience effectively.
      </p>
      <p>
        Our services include:
      </p>
      <ul>
        <li>Search Engine Optimization (SEO)</li>
        <li>Social Media Marketing and Management</li>
        <li>Content Marketing and Strategy</li>
        <li>Pay-Per-Click (PPC) Advertising</li>
        <li>Email Marketing Campaigns</li>
      </ul>
      <p>
        Partner with us to create a data-driven marketing strategy that delivers measurable growth and success.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Digital Marketing" />
      </div>
    </div>
  );
};

export default DigitalMarketing;