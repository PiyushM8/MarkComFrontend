import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomerInvoices from "./invoices/customerInvoices";
import { showLogin } from "../../utils/loginregister";
import Queries from "../dashboard/queries/queries";

function CustomerPage()
{
    let navigate = useNavigate()

    useEffect(() => {
        const jwtToken = window.sessionStorage.getItem("Authorization")
        const user = JSON.parse(window.sessionStorage.getItem("UserDetails"));

        if (!jwtToken) {
            navigate("/")
            showLogin();
        }else{
            if(user.AccountType === "Merchant")
            {
                navigate("/dashboard");
            }
        }
    }, [])

    const signout = () => {
        window.sessionStorage.removeItem("Authorization")
        window.sessionStorage.removeItem("UserDetails")
        navigate("/")
    }

    return (
        <div className="dashboard-cont">
            <div className="dashboard-top-cont">
                <div className="column-one"></div>
                <div className="column-two"></div>
                <div className="column-three"></div>
            </div>
            <div className="dashboard-main-cont">
                <div className="column-one dashboard-nav">
                    <Link to={"/customer/orders"} className="db-n-item">
                        Orders
                    </Link>
                    <Link to={"/customer/messages"} className="db-n-item">
                        Messages
                    </Link>
                    <button onClick={signout}>Sign Out</button>
                </div>
                <div className="column-two dashboard-page-cont">
                    <Routes>
                        <Route path='/orders' element={<CustomerInvoices/>}/>
                        <Route path='/messages/*' element={<Queries/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default CustomerPage;