import React from "react";
import "../../styles/views/FeatureUpdates.scss";

const FeatureUpdates: React.FC = () => {
  const updates = [
    {
      date: "June 2024",
      title: "New Messaging Tools",
      description: "We have enhanced our messaging system to provide better communication between clients and freelancers.",
    },
    {
      date: "May 2024",
      title: "Improved Payment Security",
      description: "Our payment system now includes additional security measures to protect your transactions.",
    },
    {
      date: "April 2024",
      title: "Expanded Services",
      description: "We have added new categories to our services, offering more options for your needs.",
    },
  ];

  return (
    <div className="feature-updates">
      <h2>What&apos;s New</h2>
      <ul className="updates-list">
        {updates.map((update, index) => (
          <li key={index} className="update-item">
            <span className="update-date">{update.date}</span>
            <h3 className="update-title">{update.title}</h3>
            <p className="update-description">{update.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureUpdates;
