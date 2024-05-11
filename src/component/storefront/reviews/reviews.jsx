import React, { useState, useEffect } from "react";
import "./reviews.css";
import { getFeedbackByStoreName, createFeedback } from "../../../services/feedback";
import { getProductById } from "../../../services/product";
import { useLocation } from "react-router";
import { showLogin } from "../../../utils/loginregister";
import ReviewDialog from "./ReviewDialog";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [userRating, setUserRating] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [storeName, setStoreName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeName = location.pathname.split("/")[1];
        setStoreName(storeName);
        const feedbackResponse = await getFeedbackByStoreName(storeName);
        setReviews(feedbackResponse.data);
        setFilteredReviews(feedbackResponse.data);
        const userLoggedIn = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(userLoggedIn === "true");

        const productIds = feedbackResponse.data.map((review) => review.productId);
        const productDetails = await Promise.all(productIds.map((id) => getProductById(id)));
        setProducts(productDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  const filterReviews = React.useCallback((starRating) => {
    setSelectedRating(starRating);
    if (starRating === "all") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.Rating === parseInt(starRating));
      setFilteredReviews(filtered);
    }
  }, [reviews]);

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
      setShowReviewDialog(false);
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const handleAddReviewClick = (onLogin) => {
    if (isLoggedIn) {
      setShowReviewDialog(true);
    } else {
      onLogin(() => setShowReviewDialog(true));
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
              {Array.from({ length: 5 - review.Rating }, (_, i) => (
                <span key={i + review.Rating} className="star empty">
                  &#9733;
                </span>
              ))}
            </div>
            <div className="review-message">{review.Message}</div>
            <div className="review-product">{products[index]?.name}</div>
            <div className="review-title"><strong>Product:</strong> {review.Title}</div>
          </div>
        ))}
      </div>
      {!isLoggedIn && (
        <div className="login-required-message">
          Please <button onClick={() => handleAddReviewClick(setShowReviewDialog)}>login</button> to add a review.
        </div>
      )}
      {isLoggedIn && (
        <div className="add-review-container">
          <button className="add-review-button" onClick={() => handleAddReviewClick(setShowReviewDialog)}>
            Add Your Review
          </button>
        </div>
      )}
      {showReviewDialog && (
        <ReviewDialog
          isOpen={showReviewDialog}
          onClose={() => setShowReviewDialog(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}

export default Reviews;
