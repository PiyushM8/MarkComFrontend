import { useEffect } from "react"
import "./product"
import { useLocation } from "react-router"
import { getProductById } from "../../../services/product"

function ProductPage()
{
    const location = useLocation()

    const onload = async () => {
        const productId = location.pathname.split("/product/")[1]
        const product = await getProductById(productId)
        console.log(product)
    }

    useEffect(() => {
        onload()
    })

    return (
        <div>
            Product
        </div>
    )
}

export default ProductPage