import { useEffect, useState } from "react"
import { showLogin } from "../../utils/loginregister"
import { getShoppingCart } from "../../services/shoppingCart"
import ShoppingCartItem from "./shoppingCartItem"

import "./shoppingCart.css"
import { createInvoice } from "../../services/invoice"
import { Link } from "react-router-dom"

function ShoppingCart()
{
    const [ shoppingCart, setShoppingCart ] = useState([])
    const [ shoppingCartChanged, setShoppingCartChanged] = useState(true)

    const loopThroughCartAndOrder = async (ccNumber, ccMonth, ccYear, ccCVV) => {
        let successfulCount = 0;

        for(let i = 0; i < shoppingCart.length; i++)
        {
            const shoppingCartItem = shoppingCart[i];
            
            const invoice = {
                Quantity: shoppingCartItem.Quantity,
                ProductId: shoppingCartItem.ProductId,
                CardNumber: ccNumber,
                ExpirationDate: `${ccMonth}/${ccYear}`,
                CVV: `${ccCVV}`,
            }

            const response = await createInvoice(invoice);

            if(response.status === 200)
            {
                successfulCount++;
            }

            if(i === shoppingCart.length - 1)
            {
                console.log(successfulCount)
                if(shoppingCart.length === successfulCount)
                {
                    alert("Successfully Created Order")
                    document.getElementById("order-success").style.display = "block"
                    document.getElementById("shopping-cart").style.display = "none"
                }else{
                    alert("Error with creating the order")
                }
            }
        }
    }

    const submitOrder = async () => 
    {        
        const numberRegex = /^(?:\d{4}-){3}\d{4}$|^\d{16}$/;
        const cvvRegex = /^\d{3}$/;
        const monthRegex = /^(1[0-2]|[1-9])$/;
        const yearRegex = /^\d{2}$/;

        function isValidCreditCard(input) {
            return numberRegex.test(input);
        }

        function isValidCvv(input) {
            return cvvRegex.test(input);
        }

        function isValidMonth(input) {
            return monthRegex.test(input);
        }

        function isValidYear(input) {
            return yearRegex.test(input);
        }

        const ccNumber = document.getElementById("cc-number").value;
        const ccMonth = document.getElementById("cc-month").value;
        const ccYear = document.getElementById("cc-year").value;
        const ccCVV = document.getElementById("cc-cvv").value;

        if(isValidCreditCard(ccNumber) && isValidMonth(ccMonth) && isValidYear(ccYear) && isValidCvv(ccCVV))
        {
            await loopThroughCartAndOrder(ccNumber, ccMonth, ccYear, ccCVV);
            setShoppingCartChanged(!shoppingCartChanged)
        }else{
            if(!isValidCreditCard(ccNumber))
                alert("Invalid CC Number")
            else if(!isValidMonth(ccMonth))
                alert("Invalid CC Month")
            else if(!isValidYear(ccYear))
                alert("Invalid CC Year")
            else if(!isValidCvv(ccCVV))
                alert("Invalid CC CVV")
        }
    }

    const onload = async () => {
        const response = await getShoppingCart()

        if(response.status === 200)
        {
            console.log(response.data)
            setShoppingCart(response.data)
        }else if(response.status === 500)
            alert("Internal Server Error")
    }

    useEffect(() => {
        if(window.sessionStorage.getItem("UserDetails"))
        {
            onload()
        }else{
            showLogin()
        }
    }, [shoppingCartChanged])

    return (
    <div className="shopping-cart-checkout-page">
        <div className="shopping-cart-section">
            <div id="shopping-cart" className="shopping-cart-cont">
                <h2>
                    Your Shopping Cart
                </h2>
                {shoppingCart.map((shoppingCartItem) => {
                    return <ShoppingCartItem shoppingCartItem={shoppingCartItem} shoppingCartChanged={shoppingCartChanged} setShoppingCartChanged={setShoppingCartChanged}/>
                })}
            </div>
            <div id="order-success">
                <h2>Successfully Ordered</h2>
                <h4>Go to <Link to={"/customer/orders"}>dashboard</Link> to view your orders.</h4>
            </div>
        </div>
        <div className="checkout-section">
            <h2>
                Checkout
            </h2>
            <div className="card-num-and-expiration-date-cvv">
                <div>
                    <h5 className="card-info-header">Card Number</h5>
                    <input id="cc-number" className="card-number-input" placeholder="xxxx-xxxx-xxxx-xxxx"/>
                </div>
                <div>
                    <h5 className="card-info-header">Expiration Date</h5>
                    <div>
                        <input id="cc-month" className="card-month" placeholder="3"/>
                        <input id="cc-year" className="card-year" placeholder="24"/>
                    </div>
                </div>
                <div>
                    <h5 className="card-info-header">CVV</h5>
                    <input id="cc-cvv" className="card-cvv-input" placeholder="xxx"/>
                </div>
            </div>
            <button className="order-button" onClick={submitOrder}>Pay Now</button>
        </div>
    </div>)
}

export default ShoppingCart