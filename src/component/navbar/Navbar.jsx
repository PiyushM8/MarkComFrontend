import { Link } from "react-router-dom";
import "./navbar.css"

function Navbar()
{
    return (
        <div className="navbar-cont">
            <div className="navbar-items-cont">
                <div className="navbar-comp-info">
                    <img className="nav-comp-logo" src="https://cdn.discordapp.com/attachments/1024529988210413632/1210397763972632616/globe.png?ex=65ea69c3&is=65d7f4c3&hm=53c276b3830b969b017a672512620f2aa2d2e12562dc4b37414457e3df55dbf8&"/>
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
                </div>
            </div>
        </div>
    )
}

export default Navbar;