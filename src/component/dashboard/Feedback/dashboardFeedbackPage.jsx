import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../../../services/product";
import { getFeedbackByProductId, getSellerByProductId } from "../../../services/feedback"; // Import getSellerByProductId function

// Helper function to get the storeName from the URL path
const GetStoreNameFromURL = () => {
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  return urlParts.length > 1 ? urlParts[2] : ""; // Return the second part of the URL path if it exists, otherwise return an empty string
};

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

function Product({ product }) {
  const storeName = GetStoreNameFromURL();

  const productLink = `/${storeName}/product/${product.ProductId}`;

  return (
    <div className="store-product-item-cont">
      <Link to={productLink}>
        <img
          className="p-item-image"
          src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`}
          alt={product.Title}
        />
        <div className="p-item-info">
          <div>
            <div className="product-text-cont p-item-title">{product.Title}</div>
          </div>
          <div className="p-item-extra-info">
            <div className="product-text-cont">${product.Price}</div>
            <div className="p-item-stock">{product.Stock > 1 ? `${product.Stock} in stock` : "Out of Stock"}</div>
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
        const productsWithData = await Promise.all(
          productsResponse.data.map(async (product) => {
            const feedbackResponse = await getFeedbackByProductId(product.ProductId);
            const sellerResponse = await getSellerByProductId(product.ProductId);
            const sellerUsername = sellerResponse.data.SellerUsername; // Extract SellerUsername from the response
            return {
              ...product,
              feedback: feedbackResponse.data,
              SellerUsername: sellerUsername, // Assign SellerUsername to the product object
            };
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
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "black" }}>
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
            <Product product={product} />
            <div style={feedbackListStyles}>
              <p>
                <span style={{ fontWeight: 'bold', color: 'black' }}>Reviews:</span> {product.SellerUsername}
              </p>
              {product.feedback && product.feedback.map((review, index) => (
                <div key={index} style={reviewItemStyles}>
                <div style={reviewRatingStyles}>
                {/* Displaying rating stars */}
                  {Array.from({ length: review.Rating }, (_, i) => (
                  <span key={i}>&#9733;</span>
          ))}
            {/* Displaying feedback rating */}
              <span style={{ marginLeft: '5px' }}>Rating: {review.Rating}</span>
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
