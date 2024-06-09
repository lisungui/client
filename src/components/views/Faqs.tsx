import React from "react";
import "../../styles/views/Faqs.scss";

const Faqs: React.FC = () => {
  const faqs = [
    {
      question: "What is Lisungui?",
      answer: "Lisungui is a platform designed to connect freelancers with clients, offering a wide range of services. Whether you're looking to hire professionals or offer your expertise, Lisungui provides secure, seamless, and quality-driven experiences for all users."
    },
    {
      question: "How do I get started on Lisungui?",
      answer: "To get started, you can sign up for an account. Once registered, you can create a profile, browse available gigs, or post your services if you are a freelancer."
    },
    {
      question: "How do I create an account on Lisungui?",
      answer: "Click on the 'Sign Up' button on the homepage. Fill in your name, email, and create a password. After submission, you will receive a confirmation email to verify your account."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "On the login page, click 'Forgot Password?' and enter your registered email. We will send you instructions to reset your password."
    },
    {
      question: "Why am I getting an error that my email is already used?",
      answer: "This error occurs if the email address you are trying to use is already associated with another account. You can try logging in with this email or use the password recovery option."
    },
    {
      question: "How do I update my profile information?",
      answer: "After logging in, go to the 'Profile' section from the dashboard. Here you can edit your personal details, skills, experiences, and more."
    },
    {
      question: "Can I change my email address?",
      answer: "Yes, you can change your email address from the 'Account Settings' section in your profile. Please note that you may need to verify the new email address."
    },
    {
      question: "What should I include in my freelancer profile?",
      answer: "Include details about your skills, past experiences, portfolio, and any certifications. This helps potential clients understand your expertise and capabilities."
    },
    {
      question: "How do I create a gig on Lisungui?",
      answer: "Navigate to 'Create a New Gig' from the dashboard. Fill in the details such as title, description, price, and duration. Once submitted, your gig will be available for clients to view."
    },
    {
      question: "How can I edit or delete my gig?",
      answer: "Go to 'Manage My Gigs' on your dashboard. Here, you can select the gig you want to edit or delete. Confirm your changes or deletion to update the listing."
    },
    {
      question: "What types of services can I offer on Lisungui?",
      answer: "You can offer a wide range of services including web development, graphic design, writing, marketing, and more. Ensure your gig description clearly defines the service you are offering."
    },
    {
      question: "How do payments work on Lisungui?",
      answer: "Clients can pay for services securely through our platform using various payment methods like credit cards or PayPal. Payments are held in escrow and released to the freelancer upon successful completion of the project."
    },
    {
      question: "When will I receive payment for my services?",
      answer: "Payments are released to freelancers after the client confirms that the service has been completed to their satisfaction. This typically happens within 24-48 hours after confirmation."
    },
    {
      question: "What should I do if a payment fails?",
      answer: "If a payment fails, check your payment information for any errors. If the issue persists, contact our support team for assistance."
    },
    {
      question: "How can I communicate with clients or freelancers?",
      answer: "Use our integrated messaging system to communicate directly with clients or freelancers. This ensures all project details and discussions are centralized and secure."
    },
    {
      question: "Can I upload files or documents through the messaging system?",
      answer: "Yes, our messaging system supports file uploads, allowing you to share documents, images, or other necessary files for your projects."
    },
    {
      question: "How do I place an order for a gig?",
      answer: "Browse through available gigs, select the one that meets your needs, and click 'Order Now.' Follow the prompts to complete the payment and initiate the project."
    },
    {
      question: "How can I track the progress of my order?",
      answer: "You can track the status of your order from the 'Orders' section in your dashboard. This section provides updates on the project’s progress and allows you to communicate with the freelancer."
    },
    {
      question: "What should I do if I'm not satisfied with the delivered service?",
      answer: "If you are not satisfied with the service, you can request revisions or raise a dispute. Our mediation team will help resolve any issues between you and the freelancer."
    },
    {
      question: "How do I leave a review for a freelancer or gig?",
      answer: "After the project is completed, you will receive an option to rate and review the freelancer based on your experience. Your feedback helps other users make informed decisions."
    },
    {
      question: "Can freelancers respond to reviews?",
      answer: "Yes, freelancers can respond to reviews to provide additional context or address any concerns raised by clients."
    },
    {
      question: "Where can I find help if I encounter issues?",
      answer: "Visit our Help Center for articles and FAQs, or contact our support team through the 'Contact Us' page for personalized assistance."
    },
    {
      question: "How can I report a problem or provide feedback?",
      answer: "Use the 'Feedback' or 'Report Issue' option available on your dashboard to share your suggestions or report any issues. We value your input and strive to improve our platform based on your feedback."
    },
    {
      question: "How do I keep my account secure?",
      answer: "Use a strong, unique password for your account and enable two-factor authentication (2FA) if available. Avoid sharing your login details with anyone."
    },
    {
      question: "What should I do if I suspect my account has been compromised?",
      answer: "If you suspect unauthorized access to your account, change your password immediately and contact our support team for further assistance."
    },
  ];

  return (
    <div className="faqs-section">
      <h1>Frequently Asked Questions</h1>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <p className="faq-question"><strong>{faq.question}</strong></p>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;