import React, { useState, useEffect } from "react";
import "./reviews.css";
import { getFeedbackByStoreName, createFeedback } from "../../../services/feedback";
import { useLocation } from "react-router";
import { showLogin } from "../../../utils/loginregister"; // Assuming you have a function to show login modal/dialog

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [userRating, setUserRating] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [productName, setProductName] = useState(""); // State to hold the product name
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const location = useLocation();
  const storeName = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const feedbackResponse = await getFeedbackByStoreName(storeName);
        setReviews(feedbackResponse.data);
        setFilteredReviews(feedbackResponse.data);

        // Set product name for the store
        setProductName(feedbackResponse.productName); // Assuming productName is returned from the API

        // Check if user is logged in
        const userLoggedIn = localStorage.getItem("isLoggedIn"); // Assuming you set this flag when user logs in
        setIsLoggedIn(userLoggedIn === "true"); // Convert string to boolean
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const handleRatingChange = (e) => {
    setUserRating(parseInt(e.target.value));
  };

  const handleReviewMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      await createFeedback({ Rating: userRating, Message: userMessage, StoreName: storeName });
      const response = await getFeedbackByStoreName(storeName);
      setReviews(response.data);
      setFilteredReviews(response.data);
      setUserRating(0);
      setUserMessage("");
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-header">Customer Reviews for {storeName}</h2>
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
            <div className="review-title">Product: {review.Title}</div>
            <br />
            <div className="review-message">{review.Message}</div>
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <div className="add-review-container">
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
          <button className="add-review-button" onClick={handleSubmitReview}>
            Add Your Review
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="login-required-message">
          Please <button onClick={showLogin}>login</button> to add a review.
        </div>
      )}
    </div>
  );
}

export default Reviews;
