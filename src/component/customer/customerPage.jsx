import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CustomerPage()
{
    let navigate = useNavigate()

    useEffect(() => {
        const jwtToken = window.sessionStorage.getItem("Authorization")
        if(!jwtToken)
        {
            navigate("/login")
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
                <div className="column-one">f</div>
                <div className="column-two">f</div>
                <div className="column-three">f</div>
            </div>
            <div className="dashboard-main-cont">
                <div className="column-one dashboard-nav">
                    <Link to={"/customer/invoices"} className="db-n-item">
                        Invoices
                    </Link>
                    <Link to={"/customer/queries"} className="db-n-item">
                        Queries
                    </Link>
                </div>
                <div className="column-two dashboard-page-cont">
                    {/* <Routes>
                        <Route path='/invoices' element={<ProductList/>}/>
                        <Route path='/queries' element={<ProductList/>}/>
                    </Routes> */}
                </div>
                <div className="column-three">b</div>
            </div>
            <div className="dashboard-bottom-cont">
                <div className="column-one">
                    <button onClick={signout}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerPage;