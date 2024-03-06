import Product from "./product"

function ProductPage({products})
{
    return (<div>
        <h2>Products</h2>
        <div className="products-cont">
        {products.map(product => {
                return <Product product={product}/>
            })}
        </div>
    </div>)
}

export default ProductPage