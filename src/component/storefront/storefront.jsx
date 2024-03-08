import "./storefront.css"

import { useEffect, useState } from "react"
import { getUserByUsername } from "../../services/user"
import { Link, Route, Routes } from "react-router-dom"
import ProductPage from "./products/productPage"
import Contact from "./contact/contact"
import Reviews from "./reviews/reviews"
import TOS from "./tos/tos"

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
                <div>{storeName + "'s Store"}</div>
                <div className="storefront-nav-cont">
                    <Link to={`/${storeName}`} className="storefront-nav-link">Home</Link>
                    <Link to={`/${storeName}/contact`} className="storefront-nav-link">Contact</Link>
                    <Link to={`/${storeName}/reviews`} className="storefront-nav-link">Reviews</Link>
                    <Link to={`/${storeName}/tos`} className="storefront-nav-link">TOS</Link>
                </div>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<ProductPage products={products}/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/reviews" element={<Reviews reviews={reviews}/>}/>
                    <Route path="/tos" element={<TOS/>}/>
                </Routes>
            </div>
        </div>)
}

export default StoreFront;
