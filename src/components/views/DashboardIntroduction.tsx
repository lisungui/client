import React from "react";
import "../../styles/views/DashboardIntroduction.scss";

const DashboardIntroduction: React.FC = () => {
  const features = [
    {
      title: "Secure Payments",
      description: "Manage your transactions securely.",
      icon: "🔒", // Placeholder for actual icon
      className: "secure-payments" // Unique class for each feature
    },
    {
      title: "Quality Freelancers",
      description: "Find top-notch professionals for your projects.",
      icon: "🌟", // Placeholder for actual icon
      className: "quality-freelancers"
    },
    {
      title: "Seamless Communication",
      description: "Communicate effectively with our messaging tools.",
      icon: "💬", // Placeholder for actual icon
      className: "seamless-communication"
    },
    {
      title: "Wide Range of Services",
      description: "Access a variety of services tailored to your needs.",
      icon: "🛠️", // Placeholder for actual icon
      className: "wide-range-services"
    }
  ];

  return (
    <div className="dashboard-introduction">
      <h2>Welcome to Your Dashboard!</h2>
      <p>You can start exploring our platform by using the following features:</p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className={`feature-box ${feature.className}`}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
      <p>Get started by exploring these features and making the most out of our platform!</p>
    </div>
  );
};

export default DashboardIntroduction;