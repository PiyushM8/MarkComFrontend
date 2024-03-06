import { Link } from "react-router-dom";

import "./register.css"

import { requestRegistration } from "../../services/auth";
import { useState } from "react";

function Register()
{
    const [ accountType, setAccountType ] = useState("")

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

        // Create the user object which will be sent to the backend
        const user = {
            email: email,
            username: username,
            password: password,
            accountType: accountType
        }
        try{
            // Try to register the user
            const response = await requestRegistration(user);
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

    const pickAccountType = async (e) => {
        const accountType = e.target.id;
        
        setAccountType(accountType)

        document.getElementById("account-type-selector").style.display = "none"
        document.getElementById("register-form").style.display = "block"
    }

    return (
        <div className="signin-register-main">
            <h1>Register</h1>
            <div id="account-type-selector" className="signin-register-div account-type-choices fade-in">
                <h2>Choose your type of account</h2>
                <div className="register-acc-types" id="Merchant" onClick={e => pickAccountType(e)}>
                    <i className="fa-solid fa-store"/> Merchant
                </div>
                <div className="register-acc-types" id="Customer" onClick={e => pickAccountType(e)}>
                    <i className="fa-solid fa-cart-shopping"/> Customer
                </div>
                <div className="signin-register-options">
                    Have an account? <Link to={"/login"}>Sign in</Link>
                </div>
            </div>
            <form id="register-form" className="signin-register-div fade-in" onSubmit={e => register(e)}>
                <h2>Register to display your products to the world</h2>

                <p>Email</p>
                <input placeholder="Enter your email" id="email"/>

                <p>Username</p>
                <input placeholder="Enter your username" id="username" maxLength="20"/>

                <p>Password</p>
                <input placeholder="Enter your password" id="password" type="password"/>

                <p>Confirm Password</p>
                <input placeholder="Confirm your password" id="confirm-password" type="password"/>

                <div className="signin-register-options">
                    Have an account? <Link to={"/login"}>Sign in</Link>
                </div>

                <input className="signin-register-btn" value="Register" type="submit"/>
            </form>
        </div>
    )
}

export default Register;