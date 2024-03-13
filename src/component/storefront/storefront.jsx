import "./storefront.css"

import { useEffect, useState } from "react"
import { getUserByUsername } from "../../services/user"
import { Link, Route, Routes } from "react-router-dom"
import ProductSection from "./products/productSection"
import Contact from "./contact/contact"
import Reviews from "./reviews/reviews"
import TOS from "./tos/tos"
import ProductPage from "./products/productPage"

function StoreFront({ storeName }) {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([
    { rating: 5, message: "Excellent service!" },
    { rating: 4, message: "Good products, fast shipping" },
    // Continue hardcoded reviews
  ]);

  const getProducts = async () => {
    const retrievedProducts = await getUserByUsername(storeName);
    setProducts(retrievedProducts.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="storefront-container">
      <div className="storefront-header-cont">
        <div className="storefront-navbar-cont column-two">
          <div className="storefront-info-cont">
            <div className="storefront-info-item">{storeName.charAt(0).toUpperCase() + storeName.slice(1) + "'s Store"}</div>
          </div>
          <div className="storefront-extra-cont">
            <Link to={`/${storeName}/contact`} className="storefront-nav-link">Contact</Link>
            <Link to={`/${storeName}/reviews`} className="storefront-nav-link">Reviews</Link>
            <Link to={`/${storeName}/tos`} className="storefront-nav-link">TOS</Link>
            <Link to={`/${storeName}`} className="storefront-nav-link product-nav">Products</Link>
          </div>
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<ProductSection storeName={storeName} products={products} />} />
          <Route path="/product/*" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews reviews={reviews} />} />
          <Route path="/tos" element={<TOS />} />
        </Routes>
      </div>
    </div>)
}

export default StoreFront;
