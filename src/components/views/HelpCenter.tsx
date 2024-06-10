import React from "react";
import "../../styles/views/HelpCenter.scss";
import { useNavigate } from "react-router-dom";

const HelpCenter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="help-center-container">
      <h1>Welcome to the Help Center</h1>
      <p>Find answers to your questions and learn how to use our platform effectively.</p>

      <div className="help-section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li><a href="#faq1">How do I sign up?</a></li>
          <li><a href="#faq2">How can I update my profile?</a></li>
          <li><a href="#faq3">How do I contact support?</a></li>
        </ul>
      </div>

      <div className="help-section">
        <h2>Getting Started Guide</h2>
        <p>Learn how to create an account, set up your profile, and get started.</p>
        <button onClick={() => navigate("/getting-started")}>Read the Guide</button>
      </div>

      <div className="help-section">
        <h2>Feature Tutorials</h2>
        <p>Explore detailed tutorials on how to use our platform&apos;s key features.</p>
        <button onClick={() => navigate("/tutorials")}>View Tutorials</button>
      </div>

      <div className="help-section">
        <h2>Troubleshooting</h2>
        <p>Find solutions to common problems and get back on track quickly.</p>
        <button onClick={() => navigate("/troubleshooting")}>Get Help</button>
      </div>

      <div className="help-section">
        <h2>Contact Support</h2>
        <p>If you can&apos;t find the answer you&apos;re looking for, get in touch with our support team.</p>
        <button onClick={() => navigate("/contact-support")}>Contact Us</button>
      </div>

      <div className="help-section">
        <h2>Community Forum</h2>
        <p>Join the conversation with other users in our community forum.</p>
        <button onClick={() => navigate("/forum")}>Visit the Forum</button>
      </div>

      <div className="help-section">
        <h2>Feedback</h2>
        <p>We value your feedback. Let us know how we can improve.</p>
        <button onClick={() => navigate("/feedback")}>Submit Feedback</button>
      </div>
    </div>
  );
};

export default HelpCenter;