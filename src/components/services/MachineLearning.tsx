import React from "react";
import "../../styles/services/MachineLearning.scss";

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
        <li>Supervised and Unsupervised Learning</li>
        <li>Deep Learning and Neural Networks</li>
        <li>Reinforcement Learning</li>
        <li>Model Training and Optimization</li>
        <li>ML Operations and Deployment</li>
      </ul>
      <p>
        Collaborate with us to harness the full potential of machine learning and transform your business operations.
      </p>
    </div>
  );
};

export default MachineLearning;