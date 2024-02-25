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
                Actions
            </div>
        </div>
    )
}

export default ProductItem