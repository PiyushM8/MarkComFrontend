import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Feedback from "../feedback/feedback";
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
                <Route path="/feedback" element={<Feedback/>}/>
            </Routes>
            <div>
                
            </div>
        </div>
    )
}

export default Homepage;
