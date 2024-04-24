import { useEffect, useState } from "react"
import { showLogin } from "../../utils/loginregister"
import { getShoppingCart } from "../../services/shoppingCart"
import ShoppingCartItem from "./shoppingCartItem"

import "./shoppingCart.css"

function ShoppingCart()
{
    const [ shoppingCart, setShoppingCart ] = useState([])
    const [ shoppingCartChanged, setShoppingCartChanged] = useState(true)

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

    return (<div className="shopping-cart-cont">
        <h2>
            Your Shopping Cart
        </h2>
        {shoppingCart.map((shoppingCartItem) => {
            return <ShoppingCartItem shoppingCartItem={shoppingCartItem} shoppingCartChanged={shoppingCartChanged} setShoppingCartChanged={setShoppingCartChanged}/>
        })}
    </div>)
}

export default ShoppingCart