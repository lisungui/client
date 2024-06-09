import React from "react";
import "../../styles/views/FeedbackSupport.scss";

const FeedbackSupport: React.FC = () => {
  return (
    <div className="feedback-support">
      <h2>Need Help or Want to Provide Feedback?</h2>
      <div className="support-links">
        <a href="/help-center">Help Center</a>
        <a href="/faqs">FAQs</a>
        <a href="/support">Contact Support</a>
      </div>
      <div className="feedback-prompt">
        <h3>We value your feedback!</h3>
        <p>Let us know how we can improve your experience.</p>
        <button>Submit Feedback</button>
      </div>
    </div>
  );
};

export default FeedbackSupport;