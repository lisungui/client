import React from "react";
import "../../styles/services/AI.scss";
import { FaBrain, FaRobot, FaEye, FaChartLine, FaLaptop } from "react-icons/fa"; // Icons for illustration
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const AI: React.FC = () => {
  return (
    <div className="ai-container">
      <h1>AI Services</h1>
      <p>
        Leverage the power of artificial intelligence to transform your business. Our AI services provide innovative solutions to automate processes, enhance decision-making, and unlock new opportunities for growth and efficiency.
      </p>
      <p>
        Our AI capabilities include:
      </p>
      <ul>
        <li>
          <FaBrain className="icon" /> Machine Learning Model Development
        </li>
        <li>
          <FaRobot className="icon" /> Natural Language Processing (NLP)
        </li>
        <li>
          <FaEye className="icon" /> Computer Vision and Image Recognition
        </li>
        <li>
          <FaChartLine className="icon" /> Predictive Analytics and Forecasting
        </li>
        <li>
          <FaLaptop className="icon" /> AI Strategy and Consulting
        </li>
      </ul>
      <p>
        Partner with us to integrate AI into your operations and gain a competitive edge in the digital landscape.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="AI" />
      </div>
    </div>
  );
};

export default AI;


