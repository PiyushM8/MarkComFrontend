import React, { useState, useEffect } from "react";
import "./reviews.css";
import { getFeedbackByStoreName, createFeedback } from "../../../services/feedback";
import { getProducts } from "../../../services/product";
import { useLocation } from "react-router";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [userRating, setUserRating] = useState(0); 
  const [userMessage, setUserMessage] = useState(""); 
  const [productName, setProductName] = useState(""); // New state to hold the product name
  const location = useLocation();
  const storeName = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const feedbackResponse = await getFeedbackByStoreName(storeName);
        setReviews(feedbackResponse.data); 
        setFilteredReviews(feedbackResponse.data); 

        // Fetch product information
        const productResponse = await getProducts(storeName); // Pass storeName as the argument
        setProductName(productResponse.data.ProductName);
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
      <h2 className="reviews-header">Customer Reviews for {productName}</h2> {/* Display product name */}
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
    </div>
  );
}

export default Reviews;