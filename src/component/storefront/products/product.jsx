import "./product.css"

function Product({product})
{
    return (
        <div className="store-product-item-cont">
            <div className="product-text-cont"><b>Title:</b> {product.Title}</div>
            <div className="product-text-cont"><b>Price:</b> {product.Price}</div>
            <div className="product-text-cont"><b>Description:</b> {product.Description}</div>
            <div className="product-text-cont"><b>Stock:</b> {product.Stock}</div>
            <div className="product-text-cont"><button>Purchase - ${(product.Price).toFixed(2)}</button></div>
        </div>
    )
}

export default Product