import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Navbar from "../navbar/Navbar";
import Landing from "./landing";

function Homepage()
{
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <div>
                
            </div>
        </div>
    )
}

export default Homepage;