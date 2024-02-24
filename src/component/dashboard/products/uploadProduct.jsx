import "./uploadProduct.css"

function UploadProduct()
{
    const uploadProduct = (e) => {
        const title = document.getElementById("title").value
        const price = document.getElementById("price").value
        const type = document.getElementById("type").value
        const description = document.getElementById("description").value
        e.preventDefault()
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
                    <input className="upload-input" placeholder="Enter Price" id="price"/>
                </div>
                <div className="input-item">
                    <h3 className="input-item-header">Product Type</h3>
                    <input className="upload-input" placeholder="Product Type" id="type"/>
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