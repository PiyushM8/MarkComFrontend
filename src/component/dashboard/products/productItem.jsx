import { Link } from "react-router-dom"
import "./productItem.css"

function ProductItem({ product })
{
    return (
        <div className="product-item-cont">
            <div className="product-item-title">
                {product.Title}
            </div>
            <div className="product-item-stock">
                {product.Stock}
            </div>
            <div className="product-item-price">
                {product.Price}
            </div>
            <div className="product-item-actions">
                <div className="product-action-item">
                    <div><i class="fas fa-eye"/></div>
                </div>
                <Link className="product-action-item">
                    <i class="fas fa-edit"/>
                </Link>
                <div className="product-action-item">
                    <div><i class="fas fa-trash"/></div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem