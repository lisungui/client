import React from "react";
import "../../styles/services/MachineLearning.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const Business: React.FC = () => {
  return (
    <div className="machine-learning-container">
      <h1>Business Services</h1>
      <p>
        Drive your business towards success with our comprehensive business services. We offer strategic guidance and practical solutions to help you achieve your goals and thrive in a competitive marketplace.
      </p>
      <p>
        Our services include:
      </p>
      <ul>
        <li>Business Strategy and Planning</li>
        <li>Market Research and Analysis</li>
        <li>Financial Consulting and Budgeting</li>
        <li>Operations Management and Optimization</li>
        <li>Sales and Marketing Strategies</li>
      </ul>
      <p>
        Let us be your trusted partner in navigating the complexities of business and driving sustainable growth.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Business" />
      </div>
    </div>
  );
};

export default Business;