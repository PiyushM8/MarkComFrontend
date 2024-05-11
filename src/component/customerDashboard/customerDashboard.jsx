import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomerInvoices from "./invoices/customerInvoices";
import { showLogin } from "../../utils/loginregister";
import Queries from "../dashboard/queries/queries";
import { signout } from "../../utils/signout";
import "./customerDashboard.css";
import Sellers from "./sellers";
import Landing from "../homepage/landing";

function CustomerPage() {
  let navigate = useNavigate();

  useEffect(() => {
    const jwtToken = window.sessionStorage.getItem("Authorization");
    const user = JSON.parse(window.sessionStorage.getItem("UserDetails"));

    if (!jwtToken) {
      navigate("/");
      showLogin();
    } else {
      if (user.AccountType === "Merchant") {
        navigate("/dashboard");
      }
    }
  }, []);

  return (
    <div className="dashboard-cont">
      <div className="dashboard-top-cont">
        <div className="column-one">
          <Link to="../homepage/landing"><strong>MarCom</strong></Link>
        </div>
        <div className="column-two"></div>
        <div className="column-three"></div>
        {/* Apply the signout button with the signout-btn class */}
        <button className="signout-btn" onClick={signout}>
          Sign Out
        </button>
      </div>
      <div className="dashboard-main-cont">
        <div className="column-one dashboard-nav">
          <Link to={"/customer/orders"} className="db-n-item">
            Orders
          </Link>
          <Link to={"/customer/messages"} className="db-n-item">
            Messages
          </Link>
          <Link to={"/customer/sellers"} className="db-n-item">
            Explore Sellers
          </Link>
        </div>
        <div className="column-two dashboard-page-cont">
          <Routes>
            <Route path="/orders" element={<CustomerInvoices />} />
            <Route path="/messages/*" element={<Queries />} />
            <Route path="/sellers" element={<Sellers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
