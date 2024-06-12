import React from "react";
import "../../styles/services/DataScience.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const DataScience: React.FC = () => {
  return (
    <div className="data-science-container">
      <h1>Data Science Services</h1>
      <p>
        Harness the power of data to make informed decisions and gain a competitive edge. Our data science services help you uncover valuable insights and drive innovation through advanced analytics and machine learning.
      </p>
      <p>
        We provide:
      </p>
      <ul>
        <li>Data Analysis and Visualization</li>
        <li>Machine Learning and Predictive Modeling</li>
        <li>Big Data Solutions</li>
        <li>Business Intelligence and Reporting</li>
        <li>Data Strategy and Consulting</li>
      </ul>
      <p>
        Partner with us to transform your data into actionable insights that propel your business forward.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Data Science" />
      </div>
    </div>
  );
};

export default DataScience;