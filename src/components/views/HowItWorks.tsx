import React from "react";
import "../../styles/views/HowItWorks.scss";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Step 1: Create an Account",
      description: "Sign up to get started and access all features of our platform.",
      icon: "📝", // Placeholder for actual icon
      className: "step-create-account"
    },
    {
      title: "Step 2: Browse Gigs or Post a Service",
      description: "Explore available services or offer your own to potential clients.",
      icon: "🔍", // Placeholder for actual icon
      className: "step-browse-gigs"
    },
    {
      title: "Step 3: Communicate and Collaborate",
      description: "Use our messaging tools to communicate and collaborate effectively.",
      icon: "💬", // Placeholder for actual icon
      className: "step-communicate"
    },
    {
      title: "Step 4: Secure Payments and Reviews",
      description: "Complete transactions securely and leave reviews for your experiences.",
      icon: "💳", // Placeholder for actual icon
      className: "step-secure-payments"
    }
  ];

  return (
    <div className="how-it-works">
      <h2 className="how-it-works-title">How It Works</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <div key={index} className={`step-box ${step.className}`}>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="visual-aid">
        <p>Watch our <a href="#">video guide</a> to learn more about how it works!</p>
      </div>
    </div>
  );
};

export default HowItWorks;

