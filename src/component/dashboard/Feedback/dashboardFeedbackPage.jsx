import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../services/product";
import { getFeedbackByProductId } from "../../../services/feedback";

// Product component styling
const productItemStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease",
};

const productImageStyles = {
  width: "200px",
  height: "200px",
  objectFit: "cover",
};

const productTitleStyles = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginTop: "0.5rem",
};

const productPriceStyles = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "green",
};

const productStockStyles = {
  fontSize: "0.9rem",
  color: "gray",
};

// Feedback component styling
const feedbackListStyles = {
  marginTop: "1rem",
};

const reviewItemStyles = {
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "0.5rem",
  backgroundColor: "#f8f8f8",
};

const reviewRatingStyles = {
  color: "goldenrod",
  marginBottom: "0.5rem",
};

const reviewMessageStyles = {
  fontSize: "0.9rem",
  color: "#333", // Darker color for review message text
};

function Product({ storeName, product }) {
  return (
    <div style={productItemStyles}>
      <Link to={`/${storeName}/product/${product.ProductId}`}>
        <img
          style={productImageStyles}
          src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`}
          alt={product.Title}
        />
        <div style={productTitleStyles}>{product.Title}</div>
        <div style={productPriceStyles}>$ {product.Price}</div>
        <div style={productStockStyles}>{product.Stock} in stock</div>
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
        const productsWithData = await Promise.all(
          productsResponse.data.map(async (product) => {
            const feedbackResponse = await getFeedbackByProductId(
              product.ProductId
            );
            return { ...product, feedback: feedbackResponse.data };
          })
        );
        setProducts(productsWithData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "black"}}>
        Products and Reviews
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {products.map((product) => (
          <div key={product.ProductId}>
            <Product storeName="yourStoreName" product={product} />
            <div style={feedbackListStyles}>
              {product.feedback &&
                product.feedback.map((review, index) => (
                  <div key={index} style={reviewItemStyles}>
                    <div style={reviewRatingStyles}>
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i}>&#9733;</span>
                      ))}
                    </div>
                    <div style={reviewMessageStyles}>{review.Message}</div>
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

