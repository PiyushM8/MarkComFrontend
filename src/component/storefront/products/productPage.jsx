import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { getProductById } from "../../../services/product";
import { createInvoice } from "../../../services/invoice";
import { getFeedbackByProductId } from "../../../services/feedback";
import "./productPage.css";
import Checkout from "../checkout/checkout";

function ProductPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState({});
    const [feedback, setFeedback] = useState([]);
    const [orderAmount, setOrderAmount] = useState(1);
    const [orderPrice, setOrderPrice] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [starRatings, setStarRatings] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    });
    const [selectedRatingFilter, setSelectedRatingFilter] = useState(null);

    const onload = async () => {
        const productId = location.pathname.split("/product/")[1];
        const productResponse = await getProductById(productId);
        const feedbackResponse = await getFeedbackByProductId(productId);
        setFeedback(feedbackResponse.data);
        setProduct(productResponse.data);
        setOrderPrice(productResponse.data.Price.toFixed(2));

        // Calculate average rating
        if (feedbackResponse.data.length > 0) {
            const totalRating = feedbackResponse.data.reduce((acc, cur) => acc + cur.Rating, 0);
            const avgRating = totalRating / feedbackResponse.data.length;
            setAverageRating(avgRating.toFixed(1));

            // Calculate star ratings
            const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            feedbackResponse.data.forEach(feedback => {
                ratingsCount[feedback.Rating]++;
            });

            // Calculate percentages for each rating
            const totalReviews = feedbackResponse.data.length;
            const ratingPercentages = {};
            Object.keys(ratingsCount).forEach(key => {
                ratingPercentages[key] = ((ratingsCount[key] / totalReviews) * 100).toFixed(2);
            });

            setStarRatings(ratingPercentages);
        }
    };

    const submitOrder = async () => {
        const email = document.getElementById("p-page-email").value;
        const productId = location.pathname.split("/product/")[1];

        const order = {
            ProductId: productId,
            Quantity: orderAmount,
            CustomerEmail: email,
            IpAddress: "0.0.0.0",
            PaymentMethod: "Credit Card",
        };

        const response = await createInvoice(order);
        const status = response.status;
        if (status === 200) {
            alert("Successfully Created Order");
            navigate("src/component/storefront/checkout/checkout.jsx"); // Redirect to checkout page
        } else {
            alert("Error with creating order");
        }
    };

    const changeQuantity = (e) => {
        let oAmount = parseInt(orderAmount);

        if (e.target.id === "i-quantity") {
            oAmount += 1;
        } else {
            oAmount -= 1;
        }

        setOrderAmount(oAmount);
    };

    const onChange = (e) => {
        setOrderAmount(e.target.value);
    };

    const handleFilterChange = (rating) => {
        setSelectedRatingFilter(rating);
    };

    const openCheckout = (e) => {
        document.getElementById("product-checkout").style.display = "block"
    }

    useEffect(() => {
        onload();
    }, []);

    return (
        <div className="product-page-cont">
            <Checkout />
            <div className="p-page-main-info-cont">
                <div className="p-page-main-image-cont">
                    <img className="p-page-main-image" src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`} alt={product.Title} />
                </div>

                <div className="p-page-main-info">
                    <div className="p-page-main-header">
                        <h2 className="p-page-title">{product.Title}</h2>
                        <div className="p-page-stock">
                            {product.Stock} in stock
                        </div>
                    </div>
                    {/* Display average rating here */}
                    <div className="p-page-reviews">
                        {averageRating > 0 && (
                            <>
                                {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
                                    <i key={index} className="fas fa-star"></i>
                                ))}
                                {averageRating % 1 !== 0 && (
                                    <i className="fas fa-star-half-alt"></i>
                                )}
                            </>
                        )}
                        <span>({averageRating})</span>
                    </div>
                    <div className="p-page-description">
                        {product.Description}
                    </div>
                    <div className="p-page-quantity-checkout">
                        <div className="p-page-quantity-setter">
                            <div className="p-page-quantity-down" id="d-quantity" onClick={changeQuantity}>-</div>
                            <input className="p-page-quantity-input" type="number" onChange={onChange} value={orderAmount} placeholder="0" min={0} />
                            <div className="p-page-quantity-up" id="i-quantity" onClick={changeQuantity}>+</div>
                        </div>
                        <button className="p-page-checkout" onClick={openCheckout}><i className="fas fa-cart-shopping" /> Purchase - ${`${orderPrice}`}</button>
                    </div>
                </div>
            </div>
            {/* Reviews Section */}
            <div className="p-page-reviews-section">
                    <h3 className="p-page-reviews-title">Customer Reviews</h3>
                    {/* Filter */}
                    <div className="p-page-review-filter">
                        <span>Filter by rating:</span>
                        {[5, 4, 3, 2, 1].map(star => (
                            <button
                                key={star}
                                onClick={() => handleFilterChange(star)}
                                className={`p-page-filter-btn ${selectedRatingFilter === star ? 'active' : ''}`}
                            >
                                {star} stars
                            </button>
                        ))}
                        <button onClick={() => handleFilterChange(null)} className={`p-page-filter-btn ${!selectedRatingFilter ? 'active' : ''}`}>All</button>
                    </div>
                    {/* Star Rating Distribution Bars */}
                    <div className="p-page-star-rating-bars">
                        {[5, 4, 3, 2, 1].map(star => (
                            <div key={star} className="p-page-star-rating-bar">
                                <span className="p-page-star-rating">{star} stars: </span>
                                <div className="p-page-star-rating-bar-fill" style={{ width: `${starRatings[star]}%` }}></div>
                                <span className="p-page-bar-percentage">{starRatings[star]}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Reviews List */}
                    <ul className="p-page-reviews-list">
                        {feedback
                            .filter(review => !selectedRatingFilter || review.Rating === selectedRatingFilter)
                            .map((review, index) => (
                                <li key={index} className="p-page-review">
                                    <div className="p-page-review-header">
                                        <div className="p-page-review-rating">{review.Rating}</div>
                                        <div className="p-page-review-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fas fa-star${i < review.Rating ? ' active' : ''}`}></i>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="p-page-review-comment">{review.Message}</p>
                                </li>
                            ))}
                    </ul>
                </div>
        </div>
    );
}

export default ProductPage;



