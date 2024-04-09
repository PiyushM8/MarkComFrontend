import { Link } from "react-router-dom";
import "./navbar.css";
import { showLogin, showRegistration } from "../../utils/loginregister";

function Navbar() {

  return (
    <div className="navbar-cont">
      <div className="navbar-items-cont">
        <div className="navbar-comp-info">
          <div className="navbar-name-">
            <h3 className="navbar-comp-name">Markcom</h3>
            <span className="navbar-moto">Buy</span>
          </div>
        </div>
        <div className="navbar-extra-cont">
          <Link className="nav-item" to={"/"}>
            <div>Home</div>
          </Link>
          <div className="nav-item" onClick={showRegistration}>
            <div>Register</div>
          </div>
          <div className="nav-item" onClick={showLogin}>
            <div>Login</div>
          </div>
          {/* Add Feedback link */}
          <Link className="nav-item" to={"/feedback"}>
            <div>Feedback</div>
          </Link>
          {/* Add Contact link */}
          <Link className="nav-item" to={"/contact"}>
            <div>Contact</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
