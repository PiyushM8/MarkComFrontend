import React from "react";
import "./productItem.css";
import { deleteProductById } from "../../../services/product";

function ProductItem({ product }) {
  const deleteProduct = async () => {
    const response = await deleteProductById(product.ProductId);
    if (response.data.rowsAffected > 0) {
      window.location.reload();
    } else {
      alert("Product not deleted");
    }
  };

  const handleViewProduct = () => {
    window.location.href = `/${product.SellerUsername}/product/${product.ProductId}`;
  };

  const handleEditProduct = () => {
    window.location.href = `/dashboard/products/edit/${product.ProductId}`;
  };

    return (
        <div className="product-item-cont">
            <div className="product-item-title">
                {product.Title}
            </div>
            <div className="product-item-stock">
                {product.Stock > 0 ? `${product.Stock} in stock` : "Out of Stock"}
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

export default ProductItem;
