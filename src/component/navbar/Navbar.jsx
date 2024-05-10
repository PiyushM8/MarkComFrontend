// ./src/components/navbar/navbar.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { showLogin, showRegistration } from "../../utils/loginregister";

function Navbar() {

  useEffect(() => {
    const userDetails = window.sessionStorage.getItem("UserDetails")
    if(userDetails)
    {
      document.getElementById("login-register-home").style.display = "none"
      document.getElementById("nav-dashboard-btn").style.display = "block"
    }else{
      document.getElementById("login-register-home").style.display = "flex"
      document.getElementById("nav-dashboard-btn").style.display = "none"
    }
  })

  return (
    <div className="navbar-cont">
      <div className="navbar-items-cont">
        <div className="navbar-comp-info">
          <div className="navbar-name-">
            <h3 className="navbar-comp-name">MarCom</h3>
            <span className="navbar-moto">Buy, Sell, Empower</span>
          </div>
        </div>
        <div className="navbar-extra-cont">
          <Link className="nav-item" to={"/"}>
            <div>Home</div>
          </Link>
          <div id="login-register-home">
            <div className="nav-item" onClick={showRegistration}>
              <div>Register</div>
            </div>
            <div className="nav-item" onClick={showLogin}>
              <div>Login</div>
            </div>
          </div>
          <Link className="nav-item" to={"/sellers"}>
            <div>Find Sellers</div>
          </Link>
          <Link to="/customer" id="nav-dashboard-btn">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
