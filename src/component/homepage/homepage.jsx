import { Route, Routes } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Landing from "./landing";
import ShoppingCart from "../shoppingCart/ShoppingCart";

function Homepage()
{
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/shoppingcart" element={<ShoppingCart/>}/>
            </Routes>
        </div>
    )
}

export default Homepage;
