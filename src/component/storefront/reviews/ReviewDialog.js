import React from "react";
import "./ReviewDialog.css";

function ReviewDialog({ isOpen, onClose, onSubmit }) {
  const [userRating, setUserRating] = React.useState(0);
  const [userMessage, setUserMessage] = React.useState("");

  const handleRatingChange = (e) => {
    setUserRating(parseInt(e.target.value));
  };

  const handleReviewMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmitReview = () => {
    onSubmit(userRating, userMessage);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="review-dialog-overlay">
      <div className="review-dialog-container">
        <div className="review-dialog-content">
          <h3>Add Your Review</h3>
          <div className="add-review">
            <label htmlFor="rating">Your Rating:</label>
            <select id="rating" value={userRating} onChange={handleRatingChange}>
              <option value="0">Select</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="add-review">
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" value={userMessage} onChange={handleReviewMessageChange}></textarea>
          </div>
          <button className="submit-review-button" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
        <button className="close-review-dialog" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ReviewDialog;