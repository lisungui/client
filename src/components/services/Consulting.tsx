import React from "react";
import "../../styles/services/Consulting.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const Consulting: React.FC = () => {
  return (
    <div className="consulting-container">
      <h1>Consulting Services</h1>
      <p>
        Achieve your business objectives with the expert guidance of our consulting services. We provide tailored solutions to address your unique challenges and opportunities, helping you navigate complex environments with confidence.
      </p>
      <p>
        Our consulting services cover:
      </p>
      <ul>
        <li>Management and Leadership Consulting</li>
        <li>Organizational Development and Change Management</li>
        <li>IT and Digital Transformation Consulting</li>
        <li>Human Resources and Talent Management</li>
        <li>Risk Management and Compliance</li>
      </ul>
      <p>
        Work with us to develop and implement strategies that drive success and foster a culture of continuous improvement.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Consulting" />
      </div>
    </div>
  );
};

export default Consulting;