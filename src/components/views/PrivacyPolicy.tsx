import React from "react";
import "../../styles/views/PrivacyPolicy.scss";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <div className="privacy-content">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Lisungui. We respect your privacy and are committed to protecting your personal data. This privacy policy informs you of our practices regarding the collection, use, and protection of your information.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We may collect the following types of information from you:
        </p>
        <ul>
          <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
          <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and device type.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
          <li><strong>Location Data:</strong> Information about your geographic location, where permitted by law.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use the information we collect in the following ways:
        </p>
        <ul>
          <li>To provide and maintain our services.</li>
          <li>To improve and personalize your experience on our platform.</li>
          <li>To understand and analyze how you use our services.</li>
          <li>To communicate with you, including customer support and updates.</li>
          <li>To detect, prevent, and address technical issues and fraud.</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share your information with:
        </p>
        <ul>
          <li>Service providers who help us operate our platform and services.</li>
          <li>Legal authorities if required by law or to protect our rights.</li>
          <li>Business partners with your consent.</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your data. However, please note that no method of transmission over the internet or electronic storage is completely secure.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          Depending on your location, you may have the right to:
        </p>
        <ul>
          <li>Access your data and request a copy.</li>
          <li>Correct any inaccuracies in your data.</li>
          <li>Request deletion of your data.</li>
          <li>Object to or restrict the processing of your data.</li>
        </ul>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this privacy policy, please contact us at privacy@lisungui.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
