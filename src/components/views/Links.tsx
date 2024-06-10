import React from "react";
import "../../styles/views/Links.scss";


const Links: React.FC = () => {
  return (
    <div className="feedback-support">
      <h2>Need Help or Want to Provide Feedback?</h2>
      <div className="support-links">
        <a href="/helpcenter">Help Center</a>
        <a href="/faqs">FAQs</a>
        <a href="/contact">Contact Support</a>
      </div>
    </div>
  );
};

export default Links;