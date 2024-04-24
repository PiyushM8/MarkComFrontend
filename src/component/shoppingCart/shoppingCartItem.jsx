import { deleteShoppingCartItem } from "../../services/shoppingCart"

function ShoppingCartItem({shoppingCartItem, shoppingCartChanged, setShoppingCartChanged})
{
    const deleteItem = async () => {

        const response = await deleteShoppingCartItem(shoppingCartItem.CartItemId)
        if(response.status === 200)
        {
            alert("Deleted Item")
            setShoppingCartChanged(!shoppingCartChanged)
        }else{
            alert("Internal Server Error")
        }
    }

    return (
        <div className="shopping-cart-item">
            <div className="shopping-cart-item-info">
                <img className="shopping-cart-item-img" src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${shoppingCartItem.ProductImage}/public`}/>
                {shoppingCartItem.Title} {shoppingCartItem.Quantity}x
            </div>
            <div className="shopping-cart-item-price">
                ${(shoppingCartItem.Price) * (shoppingCartItem.Quantity)}
            </div>
            <div className="shopping-cart-item-actions">
                <button className="shopping-cart-item-remove-btn" onClick={deleteItem}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default ShoppingCartItem