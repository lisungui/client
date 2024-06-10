import React from "react";
import "../../styles/views/TermsOfService.scss";

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <div className="terms-content">
        <h2>1. Introduction</h2>
        <p>Welcome to Lisungui! These terms and conditions outline the rules and regulations for the use of our platform.</p>
        
        <h2>2. Acceptance of Terms</h2>
        <p>
          By accessing or using Lisungui, you agree to comply with and be bound by these terms. If you disagree with any part of the terms, you may not access the service.
        </p>
        
        <h2>3. User Accounts</h2>
        <p>
          You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
        
        <h2>4. Use of the Platform</h2>
        <p>
          You agree to use Lisungui only for lawful purposes and in accordance with these terms. You must not use the platform in any way that could damage, disable, or impair the service.
        </p>
        
        <h2>5. Intellectual Property</h2>
        <p>
          The content on Lisungui, including text, graphics, logos, and software, is the property of Lisungui or its licensors. You may not use, reproduce, or distribute any content without permission.
        </p>
        
        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your account and access to Lisungui at our sole discretion, without notice or liability, for any reason, including if you breach these terms.
        </p>
        
        <h2>7. Limitation of Liability</h2>
        <p>
          Lisungui and its affiliates will not be liable for any direct, indirect, incidental, or consequential damages arising out of your use or inability to use the platform.
        </p>
        
        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. You should review these terms periodically. Your continued use of the platform following the posting of changes constitutes your acceptance of those changes.
        </p>
        
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about these terms, please contact us at <a href="mailto:support@lisungui.com">support@lisungui.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;