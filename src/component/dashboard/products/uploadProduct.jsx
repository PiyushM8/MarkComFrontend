import { useLocation, useNavigate } from "react-router-dom"
import { createProduct, getProductById } from "../../../services/product"
import "./uploadProduct.css"
import { useEffect, useState } from "react"

function UploadProduct()
{
    const navigate = useNavigate()
    const location = useLocation()

    const [ product, setProduct ] = useState({})

    const load = async () => {
        const pathName = location.pathname
        if(pathName.includes("/dashboard/products/edit"))
        {
            const productId = pathName.split("/products/edit/")[1]
            const response = await getProductById(productId)
            const product = response.data
            setProduct(product)
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

    return (
        <form className="upload-product-form-cont" onSubmit={e => uploadProduct(e)}>
            <div className="upload-top-inputs">
                <div className="input-item title-input-item">
                    <h3 className="input-item-header">Title</h3>
                    <input className="upload-input" placeholder="Enter Title" id="title" value={product.Title}/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Price</h3>
                    <input className="upload-input" placeholder="Enter Price" id="price" value={product.Price} type="number"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Product Type</h3>
                    <input className="upload-input" placeholder="Product Type" id="productType" value={product.ProductType}/>
                </div>
            </div>
            <div className="input-item">
                <h3 className="input-item-header">Description</h3>
                <textarea className="upload-textarea" placeholder="Enter Title" id="description" value={product.Description}/>
            </div>
            <div className="upload-action-btn">
                <input type="submit" value="Save Product" className="save-product"/>
            </div>
        </form>
    )
}

export default UploadProduct