import { Link } from "react-router-dom";

import "./register.css"

import { requestRegistration } from "../../services/auth";

function Register()
{
    /**
     * Attempt to register a user
     */
    const register = async (e) =>
    {
        // Prevent default form submission
        e.preventDefault()

        // Get all the values from the dom
        const email = document.getElementById("email").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirm-password").value

        // Run input checks
        // Check if all inputs have been entered
        if(!email || !username || !password || !confirmPassword)
        {
            alert("Fill in all values")
            return;
        }

        // Check if pass and confirm password match
        if(password !== confirmPassword)
        {
            alert("Passwords Don't Match")
            return;
        }
        
        // Vague check of email format
        if(!email.includes("@") || !email.includes(".") || email.length < 7)
        {
            alert("Invalid Email")
            return;
        }

        // Create the seller object which will be sent to the backend
        const seller = {
            email: email,
            username: username,
            password: password
        }
        try{
            // Try to register the user
            const response = await requestRegistration(seller);
            const responseStatus = response.status;
            if(responseStatus === 200)
            {
                alert("Registration Successful")
            }else if(responseStatus === 409){
                const resData = response.data;
                if(resData === "Email already exist")
                {
                    alert("Email already taken")
                }else if(resData === "Username already exist"){
                    alert("Username already taken")
                }
            }else if(responseStatus === 500){
                alert("Internal Server Error")
            }
        }catch(err){
            console.log(err)
            alert("[ERROR]: Sending request to /register route to server")
        }
    }

    return (
        <div className="signin-register-main">
            <h1>Register</h1>
            <form class="signin-register-div" onSubmit={e => register(e)}>
                <h2>Register to display your products to the world</h2>

                <p>Email</p>
                <input placeholder="Enter your email" id="email"/>

                <p>Username</p>
                <input placeholder="Enter your username" id="username" maxLength="20"/>

                <p>Password</p>
                <input placeholder="Enter your password" id="password" type="password"/>

                <p>Confirm Password</p>
                <input placeholder="Confirm your password" id="confirm-password" type="password"/>

                <div class="signin-register-options">
                    Have an account? <Link to={"/login"}>Sign in</Link>
                </div>

                <input class="signin-register-btn" value="Register" type="submit"/>
            </form>
        </div>
    )
}

export default Register;