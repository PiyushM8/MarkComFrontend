import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./feedback.css"; // Import your feedback page styling file

function Feedback() {
  const [feedback, setFeedback] = useState(""); // State to hold user's feedback

  // Function to handle form submission
  const submitFeedback = async (e) => {
    e.preventDefault();

    // Check if feedback is provided
    if (!feedback) {
      alert("Please enter your feedback.");
      return;
    }

    // Create an object to send to the backend
    const feedbackData = {
      feedback: feedback,
    };

    try {
      // Implement the logic to send the feedback to the backend
      // For simplicity, let's assume there's a function named 'sendFeedback' in your services
      // const response = await sendFeedback(feedbackData);

      // Display success message or handle response accordingly
      alert("Feedback submitted successfully!");

      // Optionally, you can clear the feedback input after submission
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again later.");
    }
  };

  return (
    <div className="feedback-main">
      <h1>Feedback</h1>
      <form className="feedback-form" onSubmit={(e) => submitFeedback(e)}>
        <h2>We'd love to hear your thoughts!</h2>

        <p>Feedback</p>
        <textarea
          placeholder="Share your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="feedback-options">
          <Link to={"/"}>Back to Home</Link>
        </div>

        <button className="feedback-submit-btn" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
