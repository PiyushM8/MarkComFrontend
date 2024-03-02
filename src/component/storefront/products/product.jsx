import "./product.css"

function Product({product})
{
    return (
        <div>
            <div>{product.Title}</div>
            <div>{product.Price}</div>
            <div>{product.Description}</div>
            <div>{product.Stock}</div>
        </div>
    )
}

export default Product