import { Link, Route, Routes } from "react-router-dom"
import "./product.css"
import UploadProduct from "./uploadProduct"

function ProductList()
{
    const openUpload = () => {
        document.getElementById("upload-cancel").style.display = "block"
        document.getElementById("save-product").style.display = "block"
        document.getElementById("add-product").style.display = "none"
    }

    const cancel = () => {
        document.getElementById("upload-cancel").style.display = "none"
        document.getElementById("save-product").style.display = "none"
        document.getElementById("add-product").style.display = "block"
    }

    return (
        <div className="product-page-cont">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Products</h2>
                <div className="db-page-header-actions">
                    <Link to={"/dashboard/products"} className="db-page-action-btn" id="upload-cancel" onClick={cancel}>Cancel</Link>
                    <Link to={"/dashboard/products/add"} className="db-page-action-btn" id="add-product" onClick={openUpload}>Add Product</Link>
                    <Link to={"/dashboard/products"} className="db-page-action-btn" id="save-product">Save Product</Link>
                </div>
            </div>
            <div className="db-page-item">
                <Routes>
                    <Route path='/add' element={<UploadProduct/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default ProductList