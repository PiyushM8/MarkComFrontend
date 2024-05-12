import "./storefront.css"
import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ProductSection from "./products/productSection"
import ContactForm from "./queries/contactForm"
import Reviews from "./reviews/reviews"
import TOS from "./tos/tos"
import ProductPage from "./products/productPage"
import CustomerInvoicePage from "./customerOrderPage/customerOrderPage"
import UserNavbar from "../userNavbar/usernavbar"
import Sellers from "./sellers/sellers"
import { showLogin } from "../../utils/loginregister" // Importing showLogin function
import Home from "../homepage/landing" // Import

function StoreFront({ storeName }) {
  const [reviews, setReviews] = useState([
    { rating: 5, message: "Excellent service!" },
    { rating: 4, message: "Good products, fast shipping" },
    // Continue hardcoded reviews
  ]);

  useEffect(() => {
    if (window.sessionStorage.getItem("UserDetails"))
      document.getElementById("user-navbar-cont").style.display = "flex"
    else
      document.getElementById("user-navbar-cont").style.display = "none"
  }, [])

  return (
    <div className="storefront-container">
      <div className="storefront-header-cont">
        <div className="storefront-navbar-background">
          <div className="storefront-navbar-cont column-two">
            <div className="storefront-info-cont">
              <Link to={`/${storeName}#products`} className="storefront-info-item">{storeName.charAt(0).toUpperCase() + storeName.slice(1) + "'s Store"}</Link>
            </div>
            <div className="storefront-extra-cont">
              <Link to={`/`} className="storefront-nav-link">Home</Link>
              <button onClick={showLogin} className= "storefront-nav-link">Login</button> {/* Using the showLogin function */}
              <Link to={`/${storeName}/contact`} className="storefront-nav-link">Contact</Link>
              <Link to={`/${storeName}/reviews`} className="storefront-nav-link">Reviews</Link>
              <Link to={`/${storeName}#products`} className="storefront-nav-link product-nav">Products</Link>
              <Link to={`/${storeName}/sellers`} className="storefront-nav-link explore-sellers-button"> Explore Sellers </Link>
            </div>
          </div>
        </div>
        <UserNavbar/>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<ProductSection storeName={storeName}/>} />
          <Route path="/product/*" element={<ProductPage />} />
          <Route path="/order/*" element={<CustomerInvoicePage/>} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/reviews" element={<Reviews reviews={reviews} />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/showLogin" element={<showLogin/>} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default StoreFront;
