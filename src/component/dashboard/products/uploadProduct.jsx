import { useLocation, useNavigate } from "react-router-dom"
import { createProduct, getProductById } from "../../../services/product"
import "./uploadProduct.css"
import { useEffect, useState } from "react"
/**
 * Purpose: This file will be used to contain the javascript and html for
 *          - Product Creation
 *          - Product Editing
 *
 * Author: Paul Kim
 * Last Modified: 2/26/2024
 * To Do(s):
 */

function UploadProduct()
{
    const navigate = useNavigate()
    const location = useLocation()

    const [ price, setPrice ] = useState()
    const [ title, setTitle ] = useState("")
    const [ productType, setProducType ] = useState("")
    const [ description, setDescription ] = useState("")

    /**
     * This function will load the product details into the inputs if we're editing the product.
     * If checks the url to check if we are editing the product
     */
    const load = async () => {
        const pathName = location.pathname
        if(pathName.includes("/dashboard/products/edit"))
        {
            const productId = pathName.split("/products/edit/")[1]
            const response = await getProductById(productId)
            const product = response.data
            
            setPrice(product.Price)
            setTitle(product.Title)
            setProducType(product.ProductType)
            setDescription(product.Description)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const uploadProduct = async (e) => {
        e.preventDefault()
        
        const title = document.getElementById("title").value
        const price = document.getElementById("price").value
        const productType = document.getElementById("productType").value
        const description = document.getElementById("description").value

        const product = {
            title: title,
            price: price,
            productType: productType,
            description: description
        }

        const response = await createProduct(product)
        switch(response.status)
        {
            case 201:
                alert("Success: Product Created")
                navigate("/dashboard/products")
                window.location.reload()
                break;
            case 422:
                alert("Failed to Create: Invalid Input")
                break;
            case 500:
                alert("Failed to Create: Internal Server Erro")
                break;
            default:
                alert("Unknown Error")
                break;
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()
    }

    const handleSubmit = async (e) => {
        const pathName = location.pathname
        if(pathName.includes("/dashboard/products/edit"))
        {
            updateProduct(e)
        }else{
            uploadProduct(e)
        }
    }

    return (
        <form className="upload-product-form-cont" onSubmit={e => handleSubmit(e)}>
            <div className="upload-top-inputs">
                <div className="input-item title-input-item">
                    <h3 className="input-item-header">Title</h3>
                    <input className="upload-input" placeholder="Enter Title" id="title" name="title" value={title}/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Price</h3>
                    <input className="upload-input" placeholder="Enter Price" id="price" name="price" value={price} type="number"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Product Type</h3>
                    <input className="upload-input" placeholder="Product Type" id="productType" name="productType" value={productType}/>
                </div>
            </div>
            <div className="input-item">
                <h3 className="input-item-header">Description</h3>
                <textarea className="upload-textarea" placeholder="Enter Title" id="description" name="description" value={description}/>
            </div>
            <div className="upload-action-btn">
                <input type="submit" value="Save Product" className="save-product"/>
            </div>
        </form>
    )
}

export default UploadProduct