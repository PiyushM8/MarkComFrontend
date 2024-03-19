import "./productPage.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { getProductById } from "../../../services/product"

import Checkout from "../checkout/checkout"
import { createInvoice } from "../../../services/invoice"

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

    /**
     * 
     * @param {*} e 
     */
    const submitOrder = async () =>
    {
        const email = document.getElementById("p-page-email").value
        const productId = location.pathname.split("/product/")[1]

        const order = {
            ProductId: productId,
            Quantity: orderAmount,
            CustomerEmail: email,
            IpAddress: "0.0.0.0",
            PaymentMethod: "Credit Card",
        }

        const response = await createInvoice(order);
        const status = response.status
        if(status === 200)
        {
            alert("Successfully Created Order")
        }else{
            alert("Error with creating order")
        }
    }

    /**
     * Increment/Decrement quantity for the quantity input
     * 
     * @param {*} e The click event
     */
    const changeQuantity = (e) => 
    {
        // Change the value to an int or else it will concat the "1"
        let oAmount = parseInt(orderAmount);

        if (e.target.id === "i-quantity") {
            oAmount += 1
        }else {
            oAmount -= 1
        }

        // Change the state of the order amount to the new quantity
        setOrderAmount(oAmount)
    }

    const onChange = (e) => {
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
                        <button className="p-page-checkout" onClick={submitOrder}><i class="fa-solid fa-cart-shopping"/> Purchase - $9.99</button>
                    </div>
                    <input id="p-page-email" className="p-page-quantity-input" type="email" placeholder="Ex. example@gmail.com"/>
                </div>
                <div className="">

                </div>
            </div>
            <Checkout/>
        </div>
    )
}

export default ProductPage