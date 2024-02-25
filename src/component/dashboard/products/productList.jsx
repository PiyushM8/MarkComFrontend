import { Link, Route, Routes, useLocation } from "react-router-dom"

import ProductItem from "./productItem"

import UploadProduct from "./uploadProduct"

import "./product.css"


import { useEffect, useState } from "react"
import { getProducts } from "../../../services/product"

function ProductList()
{
    const location = useLocation()
    const [ products, setProducts ] = useState([])

    // Since useEffect is not async we will create a function for it

    useEffect(() => {
        const load = async () => {
            const pathName = location.pathname;
            console.log(pathName)
            if(pathName === "/dashboard/products")
            {
                const response = await getProducts()
                const retrievedProducts = response.data;
                console.log(retrievedProducts)
                setProducts(retrievedProducts)
                return response
            }
        }

        load()
    }, [])

    const openUpload = () => {
        document.getElementById("upload-cancel").style.display = "block"
        document.getElementById("add-product").style.display = "none"
    }

    const cancel = () => {
        document.getElementById("upload-cancel").style.display = "none"
        document.getElementById("add-product").style.display = "block"
    }

    return (
        <div className="product-page-cont">
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Products</h2>
                <div className="db-page-header-actions">
                    <Link to={"/dashboard/products"} className="db-page-action-btn" id="upload-cancel" onClick={cancel}>Cancel</Link>
                    <Link to={"/dashboard/products/add"} className="db-page-action-btn" id="add-product" onClick={openUpload}>Add Product</Link>
                </div>
            </div>
            <div className="db-page-item">
                <Routes>
                    <Route path="/" element={
                        <div className="product-table-cont">
                            <div className="product-item-cont product-table-head">
                                <div className="product-item-title product-table-header-item">
                                    Title
                                </div>
                                <div className="product-item-stock">
                                    Stock
                                </div>
                                <div className="product-item-price">
                                    Price
                                </div>
                                <div className="product-item-actions">
                                    Actions
                                </div>
                            </div>

                            {products.map((product) => {
                                return <ProductItem key={product.productId} product={product}/>
                            })}
                        </div>
                    }/>
                    <Route path='/add' element={<UploadProduct/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default ProductList