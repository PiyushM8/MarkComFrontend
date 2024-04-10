import { Link } from "react-router-dom"
import "./usernavbar.css"
import { signout } from "../../utils/signout"

function UserNavbar()
{
    return (
        <div id="user-navbar-cont" className="user-navbar-cont">
            <Link to="/customer" className="user-navbar-dashboard">Go to Dashboard</Link>
            <div className="user-navbar-logout" onClick={signout}>
                Sign out
            </div>
        </div>)
}

export default UserNavbar