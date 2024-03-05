// reviews.jsx
import React, { useState } from "react";
import "./reviews.css";

function Reviews({ reviews }) {
  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review-rating">{review.rating} stars</div>
          <div className="review-message">{review.message}</div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
