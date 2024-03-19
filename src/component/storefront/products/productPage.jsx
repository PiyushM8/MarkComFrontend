import "./productPage.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { getProductById } from "../../../services/product"

import Checkout from "../checkout/checkout"

function ProductPage()
{
    const location = useLocation()
    const [ product, setProduct ] = useState({})
    const [ orderAmount, setOrderAmount ] = useState(1)

    const onload = async () => {
        const productId = location.pathname.split("/product/")[1]
        console.log(productId)
        const response = await getProductById(productId)
        setProduct(response.data)
    }

    const changeQuantity = (e) => 
    {
        let oAmount = parseInt(orderAmount);
        console.log(e.target.id)
        console.log(orderAmount)
        if (e.target.id === "i-quantity") {
            oAmount += 1
        }else {
            oAmount -= 1
        }
        setOrderAmount(oAmount)
    }

    const onChange = (e) => {
        if(!isNaN(e.target.value))
            setOrderAmount(e.target.value)
    }

    useEffect(() => {
        onload()
    }, [])

    return (
        <div className="product-page-cont">
            <div className="p-page-main-info-cont">
                <div className="p-page-main-image-cont">
                    <img className="p-page-main-image" src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${product.ProductImage}/public`}/>
                </div>
                <div className="p-page-main-info">
                    <div className="p-page-main-header">
                        <div>
                            <h2 className="p-page-title">{product.Title}</h2>
                            <div className="p-page-reviews"><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/> (39)</div>
                        </div>
                        <div className="p-page-stock">
                            {product.Stock} in stock
                        </div>
                    </div>
                    <div className="p-page-description">
                        {product.Description}
                    </div>
                    <div className="p-page-quantity-checkout">
                        <div className="p-page-quantity-setter">
                            <div className="p-page-quantity-down" id="d-quantity" onClick={changeQuantity}>-</div>
                            <input className="p-page-quantity-input" type="number" onChange={onChange} value={orderAmount} placeholder="0" min={0}/>
                            <div className="p-page-quantity-up" id="i-quantity" onClick={changeQuantity}>+</div>
                        </div>
                        <button className="p-page-checkout"><i class="fa-solid fa-cart-shopping"/> Purchase - $9.99</button>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
            <Checkout/>
        </div>
    )
}

export default ProductPage