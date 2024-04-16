// reviews.jsx
import React, { useEffect } from "react";
import "./reviews.css";
import { getFeedbackByStoreName } from "../../../services/feedback";
import { useLocation } from "react-router";

function Reviews({ reviews }) {

  const location = useLocation()

  const storeName = location.pathname.split("/")[1];

  const onload = async () => {
    console.log(storeName)
    await getFeedbackByStoreName(storeName)
  }

  useEffect(() => {
    onload()
  })

  return (
    <div className="reviews-container">
      <h2 className="reviews-header">Customer Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-rating">
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
            </div>
            <div className="review-message">{review.message}</div>
          </div>
        ))}
      </div>
      <button className="add-review-button">Add Your Review</button>
    </div>
  );
}


export default Reviews;
