import { useNavigate } from "react-router-dom"
import { createProduct } from "../../../services/product"
import "./uploadProduct.css"

function UploadProduct()
{
    const navigate = useNavigate()

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
                    <input className="upload-input" placeholder="Enter Title" id="title"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Price</h3>
                    <input className="upload-input" placeholder="Enter Price" id="price" type="number"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Product Type</h3>
                    <input className="upload-input" placeholder="Product Type" id="productType"/>
                </div>
            </div>
            <div className="input-item">
                <h3 className="input-item-header">Description</h3>
                <textarea className="upload-textarea" placeholder="Enter Title" id="description"/>
            </div>
            <div className="upload-action-btn">
                <input type="submit" value="Save Product" className="save-product"/>
            </div>
        </form>
    )
}

export default UploadProduct