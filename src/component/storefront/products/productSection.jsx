import { useEffect, useState } from "react";
import Product from "./product"
import { useLocation } from "react-router";
import TypingAnimation from "./typingAnimation";

function ProductSection({ storeName, products }) {
    const location = useLocation();

    let isDoing = false;
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrase = `${storeName.charAt(0).toUpperCase() + storeName.slice(1)}'s Store!`

    useEffect(() => {
        if (location.pathname.split("/").length == 2)
        {
            function typeWriter() 
            {
                if (isDoing === false) {
                    if (!isDeleting && charIndex < phrase.length) {
                        console.log(isDeleting)
                        console.log(charIndex)
                        setCharIndex(prevCharIndex => prevCharIndex + 1);
                        setTimeout(typeWriter, 200); // Typing speed
                    } else if (isDeleting && charIndex > 0) {
                        setCharIndex(prevCharIndex => prevCharIndex - 1);
                        setTimeout(typeWriter, 200); // Backspacing speed
                    } else {
                        console.log(isDeleting)
                        setIsDeleting(!isDeleting);
                        setTimeout(typeWriter, 1000);
                    }
                }
            }
            typeWriter()
            return () => {
                clearTimeout(); // Clear all timeouts to cancel ongoing animations
            };
        }
    }, []);

    return (<div>
        <div className="storefront-intro-cont">
            <div className="storefront-intro-content">
                <div className="storefront-intro-item sf-i-title">
                    <TypingAnimation text={`${storeName.charAt(0).toUpperCase() + storeName.slice(1)}'s Store!`}/>
                    <a href="#products" className="start-shopping">
                        View Products <i class="fa-solid fa-arrow-right"></i>
                    </a>
                    <div className="st-i-overview">
                        <div>
                            <h3 className="st-i-o-header">Reviews</h3>
                            <p className="st-i-o-data"><i class="fa fa-star" /> 4.5 <span className="reviews-amount">(2)</span></p>
                        </div>
                        <div>
                            <h3 className="st-i-o-header">Products</h3>
                            <p className="st-i-o-data"><i class="fa fa-shop" /> 41</p>
                        </div>
                        <div>
                            <h3 className="st-i-o-header">Sales</h3>
                            <p className="st-i-o-data"><i class="fa fa-cart-shopping" /> 38</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="product-section-background-cont">
            <div  className="product-section-cont">
                <h2 className="products-header">Products</h2>
                <div className="products-cont">
                    {products.map(product => {
                        return <Product storeName={storeName} product={product} />
                    })}
                </div>
            </div>
        </div>
    </div>)
}

export default ProductSection