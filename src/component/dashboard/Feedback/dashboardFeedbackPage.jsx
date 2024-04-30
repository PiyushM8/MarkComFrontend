import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../services/product";
import { getFeedbackByProductId } from "../../../services/feedback";

function Product({ storeName, product }) {
  return (
    <div className="store-product-item-cont">
      <Link to={`/${storeName}/product/${product.ProductId}`}>
        <img
          className="p-item-image"
          src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`}
        />
        <div className="p-item-info">
          <div>
            <div className="product-text-cont p-item-title">{product.Title}</div>
          </div>
          <div className="p-item-extra-info">
            <div className="product-text-cont">$ {product.Price}</div>
            <div className="p-item-stock">{product.Stock} in stock</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function DashboardFeedbackPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts();
        const productsWithData = await Promise.all(productsResponse.data.map(async (product) => {
          const feedbackResponse = await getFeedbackByProductId(product.ProductId);
          return {
            ...product,
            feedback: feedbackResponse.data
          };
        }));
        setProducts(productsWithData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-feedback-container">
      <h2 className="dashboard-feedback-header">Products and Reviews</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.ProductId}>
            <Product storeName="yourStoreName" product={product} />
            <div className="feedback-list">
              {product.feedback && product.feedback.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-rating">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i} className="star">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="review-message">{review.Message}</div> {/* Ensure naming */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardFeedbackPage;
