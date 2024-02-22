import { Link } from "react-router-dom";
import "./navbar.css"

function Navbar()
{
    return (
        <div className="navbar-cont">
            <div className="navbar-comp-name">
                MarCom
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
            </div>
        </div>
    )
}

export default Navbar;