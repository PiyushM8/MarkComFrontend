import "./storefront.css"

import { useEffect, useState } from "react"
import { getUserByUsername } from "../../services/user"
import { Link, Route, Routes } from "react-router-dom"
import ProductPage from "./products/productPage"
import Contact from "./contact/contact"

function StoreFront({ storeName })
{
    const [ products, setProducts ] = useState([])

    const getProducts = async () => {
        const retrievedProducts = await getUserByUsername(storeName)
        console.log(retrievedProducts.data)
        setProducts(retrievedProducts.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="storefront-container">
            <div className="storefront-header-cont">
                <div>{storeName}</div>
                <div className="storefront-nav-cont">
                    <Link to={`/${storeName}`}>Home</Link>
                    <Link to={`/${storeName}/contact`}>Contact</Link>
                    <Link to={`/${storeName}/reviews`}>Reviews</Link>
                    <Link to={`/${storeName}/tos`}>TOS</Link>
                </div>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<ProductPage products={products}/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/reviews"/>
                    <Route path="/tos"/>
                </Routes>
            </div>
        </div>)
}

export default StoreFront