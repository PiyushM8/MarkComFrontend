import React, { useState, useEffect } from "react";
import "./reviews.css";
import { getFeedbackByStoreName } from "../../../services/feedback";
import { useLocation } from "react-router";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const location = useLocation();
  const storeName = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getFeedbackByStoreName(storeName);
        setReviews(response.data); // Assuming the response contains an array of feedback objects
        setFilteredReviews(response.data); // Initially set filteredReviews to all reviews
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [storeName]);

  const filterReviews = (starRating) => {
    setSelectedRating(starRating);
    if (starRating === "all") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.Rating === parseInt(starRating));
      setFilteredReviews(filtered);
    }
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-header">Customer Reviews</h2>
      <div className="filter-dropdown">
        <select value={selectedRating} onChange={(e) => filterReviews(e.target.value)}>
          <option value="all">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Star
            </option>
          ))}
        </select>
      </div>
      <div className="reviews-list">
        {filteredReviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-rating">
              {Array.from({ length: review.Rating }, (_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
            </div>
            <div className="review-message">{review.Message}</div>
          </div>
        ))}
      </div>
      <button className="add-review-button">Add Your Review</button>
    </div>
  );
}

export default Reviews;
