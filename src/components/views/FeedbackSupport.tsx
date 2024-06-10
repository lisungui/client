import React, { useState } from "react";
import "../../styles/views/FeedbackSupport.scss";

const FeedbackSupport: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [type, setType] = useState("General");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API)
    setSubmitted(true);
    console.log("Feedback submitted:", { rating, comments, type });
  };

  if (submitted) {
    return (
      <div className="feedback-container">
        <h2>Thank You for Your Feedback!</h2>
        <p>Your feedback has been successfully submitted.</p>
        <button onClick={() => setSubmitted(false)} className="feedback-button">
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-field">
          <label htmlFor="type">Type of Feedback:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="rating">Rating:</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "filled" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments here..."
            required
          />
        </div>
        <button type="submit" className="feedback-button" disabled={!comments.trim() || rating === 0}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackSupport;
