import { Link } from "react-router-dom"
import "./product.css"

function Product({storeName, product})
{
    return (
        <div className="store-product-item-cont">
                <div className="product-text-cont"><b>Title:</b> {product.Title}</div>
                <div className="product-text-cont"><b>Price:</b> {product.Price}</div>
                <div className="product-text-cont"><b>Description:</b> {product.Description}</div>
                <div className="product-text-cont"><b>Stock:</b> {product.Stock}</div>
                <Link to={`/${storeName}/product/${product.ProductId}`}>

                <div className="product-text-cont"><button>Purchase - ${(product.Price).toFixed(2)}</button></div>
            </Link>
        </div>
    )
}

export default Product