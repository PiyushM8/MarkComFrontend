import "./checkout.css"

function Checkout()
{
    return (
        <div className="checkout-cont">
            <table className = "divTable">
            <tr><td><div1 className = "OrderConfirm">
                <table className = "OrderTable">
                    <tr><td>Price: $5.00</td></tr>
                    <tr><td>Product: Name of Product</td></tr>
                    <tr><td>Quantity: 1</td></tr>
                </table>
            </div1></td></tr>
            <br/>
            <tr><td><div2 className = "CustomerInput">
                <table className = "CustTable">
                <tr><td>Enter Your E-mail Address</td></tr>
                <tr><td>
                    <form className = "email">
                    <label for = "email">email: </label>
                    <input type = "email" id = "email" name = "email"></input>
                    </form>
                </td></tr>
                </table>
            </div2></td></tr>
            <br/>
            <tr><td><div3 className = "PaymentOptions">
                <table className = "PayTable">
                <tr><td>Select Payment Option</td></tr>
                <tr><td><button type = "button" className = "creditOrDebit">
                    <img src = "https://t4.ftcdn.net/jpg/04/06/75/39/240_F_406753914_SFSBhjhp6kbHblNiUFZ1MXHcuEKe7e7P.jpg" width = "150" height = "30" /></button><br/><br/></td></tr>
                <tr><td><button type = "button" className = "paypal">
                    <img src = "https://1000logos.net/wp-content/uploads/2021/04/Paypal-logo.png" width = "130" height = "30" /></button></td></tr>
                </table>
            </div3></td></tr></table>
            <br/>
            <button type = "submit" className = "submit">SUBMIT</button>
            
        </div>
    )
}

export default Checkout