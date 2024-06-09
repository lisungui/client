import React from "react";
import "../../styles/views/CallToAction.scss";
import { useNavigate } from "react-router-dom";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="call-to-action">
      <div className="cta-content">
        <h2 className="cta-title">Join Now and Reap the Benefits!</h2>
        <p className="cta-description">
          Don&apos;t miss out on connecting with top freelancers and clients. Join our platform today and enjoy a seamless experience.
        </p>
        <button className="cta-button" onClick={() => navigate("/register")}>Sign Up Now</button>
      </div>
      <div className="why-choose-us">
        <h3>Why Choose Us?</h3>
        <ul className="reasons-list">
          <li>✔️ Secure and Fast Payments</li>
          <li>✔️ Access to a Wide Range of Services</li>
          <li>✔️ Top-Quality Freelancers and Professionals</li>
          <li>✔️ Easy Communication and Collaboration Tools</li>
          <li>✔️ Dedicated Support and Community</li>
        </ul>
      </div>
    </div>
  );
};

export default CallToAction;
