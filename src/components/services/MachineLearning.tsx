import React from "react";
import "../../styles/services/MachineLearning.scss";
import { FaBrain, FaChartLine, FaRobot, FaCogs, FaDeploydog } from "react-icons/fa"; // Importing icons from react-icons
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const MachineLearning: React.FC = () => {
  return (
    <div className="machine-learning-container">
      <h1>Machine Learning Services</h1>
      <p>
        Drive innovation with our advanced machine learning services. From model development to deployment, we provide end-to-end solutions that empower your business to make data-driven decisions and automate complex processes.
      </p>
      <p>
        Our machine learning expertise includes:
      </p>
      <ul>
        <li>
          <FaBrain className="icon" /> Supervised and Unsupervised Learning
        </li>
        <li>
          <FaChartLine className="icon" /> Deep Learning and Neural Networks
        </li>
        <li>
          <FaRobot className="icon" /> Reinforcement Learning
        </li>
        <li>
          <FaCogs className="icon" /> Model Training and Optimization
        </li>
        <li>
          <FaDeploydog className="icon" /> ML Operations and Deployment
        </li>
      </ul>
      <p>
        Collaborate with us to harness the full potential of machine learning and transform your business operations.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Machine Learning" />
      </div>
    </div>
  );
};

export default MachineLearning;


