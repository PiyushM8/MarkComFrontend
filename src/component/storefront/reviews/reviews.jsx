import React, { useState, useEffect } from "react";
import "./reviews.css";
import { createFeedback, getFeedbackByStoreName } from "../../../services/feedback";
import { useLocation } from "react-router";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [userRating, setUserRating] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [storeName, setStoreName] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");
  const [products, setProducts] = useState([]); // Add products state
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeName = location.pathname.split("/")[1];
        const sellerUsername = location.pathname.split("/")[1]; // This should be corrected if it's different
        setStoreName(storeName);
        setSellerUsername(sellerUsername); // Ensure sellerUsername is set correctly
        const feedbackResponse = await getFeedbackByStoreName(storeName);
        setReviews(feedbackResponse.data);
        setFilteredReviews(feedbackResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    // Fetch products data here
  }, [storeName]); // Trigger when storeName changes

  const filterReviews = (starRating) => {
    setSelectedRating(starRating);
    if (starRating === "all") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.Rating === parseInt(starRating));
      setFilteredReviews(filtered);
    }
  };

  const displayRating = (rating) => {
    const stars = document.querySelectorAll('.star');
    if (rating >= 1 && rating <= 5) {
      setUserRating(rating);
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.add('filled'); // Fill the star
        } else {
          star.classList.remove('filled'); // Unfill the star
        }
      });
      document.getElementById('ratingMessage').innerHTML = 'You rated ' + rating + ' stars.';
    }
  };

  const onChange = (e) => {
    setUserMessage(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = {
        Rating: userRating,
        Message: userMessage,
        SellerUsername: sellerUsername
      };

      const response = await createFeedback(feedbackData);
      if (response.status === 200) {
        alert("Successfully Created Feedback");
      } else {
        alert("Error creating the feedback");
      }

      // Fetch updated feedback after creating the new one
      const feedbackResponse = await getFeedbackByStoreName(storeName);
      setReviews(feedbackResponse.data);
      setFilteredReviews(feedbackResponse.data);
      setUserRating();
      setUserMessage();
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <div className="reviews-container" style={{ marginTop: "50px" }}>
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
              {[...Array(review.Rating)].map((_, i) => (
                <span key={i} className="star">&#9733;</span>
              ))}
            </div>
            <div className="review-message">{review.Message}</div>
            <div className="review-product">{products[index]?.name}</div>
            <div className="review-title"><strong>Product:</strong> {review.Title}</div>
          </div>
        ))}
      </div>
      <div className="add-review-container">
        <h3>Add Your Review</h3>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={rating}
              className={`star ${rating <= userRating ? 'filled' : ''}`}
              onClick={() => displayRating(rating)}
            >
              &#9733;
            </span>
          ))}
          <p id="ratingMessage"></p>
        </div>
        <textarea placeholder="Write your review..." value={userMessage} onChange={onChange} />
        <button className="add-review-button" onClick={onSubmit}>Submit Review</button>
      </div>
    </div>
  );
}

export default Reviews;
