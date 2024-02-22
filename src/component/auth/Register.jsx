import { Link } from "react-router-dom";
import "./register.css"

function Register()
{
    const register = () =>
    {
        const email = document.getElementById("email").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirm-password").value

        

        if(password === confirmPassword)
        {

        }else{
            alert("Passwords Don't Match")
        }
    }

    return (
        <div class="signin-register-main">
            <h1>Register</h1>
            <div class="signin-register-div">
                <h2>Register to Sell Your Products With MarCom</h2>

                <p>Email</p>
                <input placeholder="Enter your email" id="email"/>

                <p>Username</p>
                <input placeholder="Enter your username" id="username"/>

                <p>Password</p>
                <input placeholder="Enter your password" id="password" type="password"/>

                <p>Confirm Password</p>
                <input placeholder="Confirm your password" id="confirm-password" type="password"/>

                <div class="signin-register-options">
                    Have an account? <Link to={"/login"}>Sign in</Link>
                </div>

                <button class="signin-register-btn" onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Register;