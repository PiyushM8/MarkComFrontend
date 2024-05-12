import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../services/product";
import { getFeedbackByProductId, getSellerByProductId } from "../../../services/feedback";
import "./dashboardFeedbackPage.css"; // CSS styling created

const Product = ({ product, minRating, maxRating }) => {
  const productLink = `/${product.SellerUsername}/product/${product.ProductId}`;

  const goToProductPage = () => {
    window.location.href = productLink;
  };

  return (
    <div className="product-item">
      <Link to={productLink}>
        <img
          className="product-image"
          src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`}
          alt={product.Title}
        />
      </Link>
      <div className="product-info">
        <div className="product-title">{product.Title}</div>
        <div className="product-price">${product.Price}</div>
        <div className="product-stock">
          {product.Stock > 1 ? `${product.Stock} in stock` : "Out of Stock"}
        </div>
        {/* Button to go to product page */}
        <button className="view-product-button" onClick={goToProductPage}>View Product</button>
      </div>
      <div className="feedback-list">
        <p className="reviews-title">Reviews:</p>
        {product.feedback &&
          product.feedback
            .filter((review) => review.Rating >= minRating && review.Rating <= maxRating) // Filter reviews based on rating
            .map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-rating">
                  {Array.from({ length: review.Rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="rating-value">Rating: {review.Rating}</span>
                </div>
                <div className="review-message">
                  <div>Seller: {product.SellerUsername}</div>
                  {review.Message}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

const DashboardFeedbackPage = () => {
  const [products, setProducts] = useState([]);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts();
        const productsWithData = await Promise.all(
          productsResponse.data.map(async (product) => {
            const feedbackResponse = await getFeedbackByProductId(product.ProductId);
            const sellerResponse = await getSellerByProductId(product.ProductId);
            const sellerUsername = feedbackResponse.data.SellerUsername;
            return { ...product, feedback: feedbackResponse.data, sellerUsername };
          })
        );
        setProducts(productsWithData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleMinRatingChange = (event) => {
    setMinRating(parseInt(event.target.value));
  };

  const handleMaxRatingChange = (event) => {
    setMaxRating(parseInt(event.target.value));
  };

  return (
    <div className="dashboard-feedback-page">
      <h2 className="page-title">Products and Reviews</h2>
      <div className="filter-section">
        <label htmlFor="min-rating">Min Rating:</label>
        <select id="min-rating" value={minRating} onChange={handleMinRatingChange}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
        <label htmlFor="max-rating">Max Rating:</label>
        <select id="max-rating" value={maxRating} onChange={handleMaxRatingChange}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.ProductId} product={product} minRating={minRating} maxRating={maxRating} />
        ))}
      </div>
    </div>
  );
};

export default DashboardFeedbackPage;
