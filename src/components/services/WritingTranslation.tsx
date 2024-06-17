import React from "react";
import "../../styles/services/WritingTranslation.scss";
import FetchGigsByCategory from "components/services/FetchGigsByCategory";

const WritingTranslation: React.FC = () => {
  return (
    <div className="writing-translation-container">
      <h1>Writing and Translation Services</h1>
      <p>
        Communicate effectively and reach a global audience with our professional writing and translation services. Our skilled writers and translators are experts in creating clear, engaging, and culturally relevant content.
      </p>
      <p>
        We offer:
      </p>
      <ul>
        <li>Content Writing and Copywriting</li>
        <li>Technical and Academic Writing</li>
        <li>Editing and Proofreading</li>
        <li>Document and Website Translation</li>
        <li>Multilingual Support</li>
      </ul>
      <p>
        Trust us to deliver high-quality content that resonates with your audience and meets your business goals.
      </p>
      <div className="gigs-section">
        <FetchGigsByCategory category="Writing and Translation" />
      </div>
    </div>
  );
};

export default WritingTranslation;