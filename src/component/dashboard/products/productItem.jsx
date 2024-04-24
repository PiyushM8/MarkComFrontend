import { Link, useNavigate } from "react-router-dom"
import "./productItem.css"
import { deleteProductById } from "../../../services/product"

function ProductItem({ product })
{
    const deleteProduct = async () => {
        const response = await deleteProductById(product.ProductId)
        if(response.data.rowsAffected > 0)
        {
            window.location.reload()
        }else{
            alert("Product not deleted")
        }
    }

    return (
        <div className="product-item-cont">
            <div className="product-item-title">
                {product.Title}
            </div>
            <div className="product-item-stock">
                {product.Stock}
            </div>
            <div className="product-item-price">
                ${product.Price}
            </div>
            <div className="product-item-actions">
                <div className="product-action-item">
                    <div><i className="fas fa-eye"/></div>
                </div>
                <Link to={`/dashboard/products/edit/${product.ProductId}`} className="product-action-item">
                    <i className="fas fa-edit"/>
                </Link>
                <div className="product-action-item" onClick={deleteProduct}>
                    <div><i className="fas fa-trash"/></div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem