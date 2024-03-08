import "./product.css"

function Product({product})
{
    return (
        <div className="store-product-item-cont">
            <div><b>Title:</b> {product.Title}</div>
            <div><b>Price:</b> {product.Price}</div>
            <div><b>Description:</b> {product.Description}</div>
            <div><b>Stock:</b> {product.Stock}</div>
            <button>Purchase - ${(product.Price).toFixed(2)}</button>
        </div>
    )
}

export default Product