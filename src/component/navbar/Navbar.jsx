import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar-cont">
      <div className="navbar-items-cont">
        <div className="navbar-comp-info">
          <img
            className="nav-comp-logo"
            src=""
            alt="Company Logo"
          />
          <div className="navbar-name-">
            <h3 className="navbar-comp-name">Markcom</h3>
            <span className="navbar-moto">OUR SLOGAN</span>
          </div>
        </div>
        <div className="navbar-extra-cont">
          <Link to={"/"}>
            <div>Home</div>
          </Link>
          <Link to={"/register"}>
            <div>Register</div>
          </Link>
          <Link to={"/login"}>
            <div>Login</div>
          </Link>
          {/* Add Feedback link */}
          <Link to={"/feedback"}>
            <div>Feedback</div>
          </Link>
          {/* Add Contact link */}
          <Link to={"/contact"}>
            <div>Contact</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
