import { useEffect, useState } from "react"
import "./storefront.css"
import { getUserByUsername } from "../../services/user"
import Product from "./products/product"

function StoreFront({ storeName })
{
    const [ products, setProducts ] = useState([])

    const getProducts = async () => {
        const retrievedProducts = await getUserByUsername(storeName)
        console.log(retrievedProducts.data)
        setProducts(retrievedProducts.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            {products.map(product => (<Product product={product}/>))}
        </div>
    )
}

export default StoreFront