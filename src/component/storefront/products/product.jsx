import { Link } from "react-router-dom"
import "./product.css"

function Product({storeName, product})
{
    return (
        <div className="store-product-item-cont">
            <Link  to={`/${storeName}/product/${product.ProductId}`}>
                <img className="p-item-image" src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`}/>
                <div className="p-item-info">
                    <div>
                        <div className="product-text-cont p-item-title">{product.Title}</div>
                    </div>
                    <div className="p-item-extra-info">
                        <div className="product-text-cont">${product.Price}</div>
                        <div className="p-item-stock">{product.Stock} in stock</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Product