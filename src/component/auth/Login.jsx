import { Link } from "react-router-dom"
import { requestLogin } from "../../services/auth"

function Login()
{
    const login = async (e) => {
        e.preventDefault()
        // Retrieve email and password from the dom
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        // Double check if email and password exist
        if(email && password)
        {
            const loginStatus = await requestLogin(email, password)
        }
    }

    return (
        <div class="signin-register-main">
            <h1>Login</h1>
            <form class="signin-register-div" onSubmit={e => login(e)}>
                <h2>Login to Sell Your Products With MarCom</h2>

                <p>Email</p>
                <input placeholder="Enter your email" id="email" required/>

                <p>Password</p>
                <input placeholder="Enter your password" id="password" type="password" required/>

                <div class="signin-register-options">
                    Need an account <Link to={"/register"}>Register</Link>
                </div>

                <input class="signin-register-btn" type="submit" value={"Login"}  onClick={login}/>
            </form>
        </div>
    )
}

export default Login