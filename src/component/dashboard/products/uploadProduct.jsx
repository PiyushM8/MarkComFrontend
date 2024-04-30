import { useLocation, useNavigate } from "react-router-dom"
import { createProduct, getProductById, updateProduct } from "../../../services/product"
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

    const [ selectedFile, setSelectedFile ] = useState();
    const [ productData, setProductData ] = useState({})

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
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
            
            setProductData(product)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const uploadProduct = async (formData) => {
        const response = await createProduct(formData)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const pathName = location.pathname
        if(pathName.includes("/dashboard/products/edit"))
        {
            const productId = pathName.split("/edit/")[1]
            await updateProduct(productId, productData)

            navigate("/dashboard/products")
            window.location.reload()
        }else{
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append("product", JSON.stringify(productData))

            await uploadProduct(formData)
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if(name === "image")
        {
            const img = document.getElementById("imageInput").files[0]
            console.log(img)
        }else{
            setProductData({
                ...productData,
                [name]: value
            })
        }
    };

    return (
        <form className="upload-product-form-cont" onSubmit={e => handleSubmit(e)}>
            <div className="upload-top-inputs">
                <div className="input-item title-input-item">
                    <h3 className="input-item-header">Title</h3>
                    <input className="upload-input" placeholder="Enter Title" name="Title" value={productData.Title} onChange={handleChange}/>
                </div>
                <div className="input-item stock-input-item">
                    <h3 className="input-item-header">Stock</h3>
                    <input className="upload-input" placeholder="Enter Stock" name="Stock" value={productData.Stock} onChange={handleChange} type="number"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Price</h3>
                    <input className="upload-input" placeholder="Enter Price" name="Price" value={productData.Price} onChange={handleChange} type="number"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Product Type</h3>
                    <input className="upload-input" placeholder="Product Type" name="ProductType" value={productData.ProductType} onChange={handleChange}/>
                </div>
            </div>
            <div className="input-item">
                <h3 className="input-item-header">Description</h3>
                <textarea className="upload-textarea" placeholder="Enter Title" name="Description" value={productData.Description} onChange={handleChange}/>
            </div>
            <div>
                <input type="file" name="image" id="imageInput" accept="image/*" onChange={e => handleFileChange(e)}/>
            </div>
            <div className="upload-action-btn">
                <input type="submit" value="Save Product" className="save-product"/>
            </div>
        </form>
    )
}

export default UploadProduct