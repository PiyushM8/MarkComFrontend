import "./product.css"

function Product({product})
{
    return (
        <div className="store-product-item-cont">
            <div>Title: {product.Title}</div>
            <div>Price: {product.Price}</div>
            <div>Description: {product.Description}</div>
            <div>Stock: {product.Stock}</div>
            <button>Purchase - ${(product.Price).toFixed(2)}</button>
        </div>
    )
}

export default Product