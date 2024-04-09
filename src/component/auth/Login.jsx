import { Link, useNavigate } from "react-router-dom"
import { requestLogin } from "../../services/auth"
import { hideLogin, showLogin, showRegistration } from "../../utils/loginregister"

function Login()
{
    let navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        // Retrieve email and password from the dom
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        // Double check if email and password exist
        if(email && password)
        {
            const response = await requestLogin(email, password)

            const responseStatus = response.status;

            // Will need to be store on web storage either
            const responseData = response.data;

            if(responseStatus === 200)
            {
                const user = responseData.user

                window.sessionStorage.setItem("UserDetails", JSON.stringify(user));
                window.sessionStorage.setItem("Authorization", responseData.jwtToken);

                if(user.AccountType === "Customer")
                {
                    navigate("/customer")
                }else if(user.AccountType === "Merchant"){
                    navigate("/dashboard")
                }
            }else if(responseStatus === 401){
                alert("Incorrect Credentials")
            }else{
                alert("Unknown Error")
            }
        }else{
            alert("Email or Password Missing")
        }
    }

    return (
        <div id="login-form" className="signin-register-main">
            <div className="signin-register-header">
                <h1>Login</h1>
                <div onClick={hideLogin}>X</div>
            </div>
            <form className="signin-register-div" onSubmit={e => login(e)}>
                <h2>Login to Sell Your Products With MarCom</h2>

                <p>Email</p>
                <input placeholder="Enter your email" id="email" required/>

                <p>Password</p>
                <input placeholder="Enter your password" id="password" type="password" required/>

                <div className="signin-register-options">
                    Need an account <span onClick={showRegistration}>Register</span>
                </div>

                <input className="signin-register-btn" type="submit" value={"Login"}  onClick={login}/>
            </form>
        </div>
    )
}

export default Login