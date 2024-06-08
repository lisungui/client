import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../styles/views/Contact.scss"; // Ensure you have this file
import { FadeLoader } from "react-spinners";

// Define the types for form data
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading spinner

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loader when the send button is clicked

    try {
      const response = await fetch("http://51.20.250.190:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setErrorMessage("");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to send your message. Please try again. If the problem persists, please reach out to Roger at rogerjeasy@gmail.com");
    } finally {
      setLoading(false); // Hide loader after the request is completed
    }
  };

  // Check if the required fields are filled
  const areRequiredFieldsFilled = formData.firstName.trim() && formData.message.trim();

  return (
    <div className="contact-container">
      {loading && (
        <div className="overlay">
          <FadeLoader color="#36d7b7" loading={loading} />
        </div>
      )}
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>First Name <span className="required">*</span></label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Type here..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Type here..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Type here..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email Address <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Type here..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message <span className="required">*</span></label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="send-button"
          disabled={!areRequiredFieldsFilled}
        >
          Send
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Contact;