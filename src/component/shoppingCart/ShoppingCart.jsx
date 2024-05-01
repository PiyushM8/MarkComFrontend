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

    const loopThroughCartAndOrder = async () => {
        let successfulCount = 0;

        for(let i = 0; i < shoppingCart.length; i++)
        {
            const shoppingCartItem = shoppingCart[i];
            
            const invoice = {
                Quantity: shoppingCartItem.Quantity,
                ProductId: shoppingCartItem.ProductId
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
                    alert("Successful Created Order")
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
        await loopThroughCartAndOrder();

        setShoppingCartChanged(!shoppingCartChanged)
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
    <div>
        <div id="shopping-cart" className="shopping-cart-cont">
            <h2>
                Your Shopping Cart
            </h2>
            {shoppingCart.map((shoppingCartItem) => {
                return <ShoppingCartItem shoppingCartItem={shoppingCartItem} shoppingCartChanged={shoppingCartChanged} setShoppingCartChanged={setShoppingCartChanged}/>
            })}
            <button onClick={submitOrder}>Order Now</button>
        </div>
        <div id="order-success">
            <h2>Successfully Ordered</h2>
            <h4>Go to <Link to={"/customer/orders"}>dashboard</Link> to view your orders.</h4>
        </div>
    </div>)
}

export default ShoppingCart