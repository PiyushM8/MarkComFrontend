import "./register.css"

function Register()
{
    return (
        <div class="signin-register-main">
            <h1>Register</h1>
            <div class="signin-register-div">
                <h2>Register to Sell Your Products With MarCom</h2>

                <p>Email</p>
                <input placeholder="Enter your email"/>

                <p>Username</p>
                <input placeholder="Enter your username"/>

                <p>Password</p>
                <input placeholder="Enter your password" type="password"/>

                <p>Confirm Password</p>
                <input placeholder="Confirm your password" type="password"/>

                <div class="signin-register-options">
                    Have an account? <a>Sign in</a>
                </div>

                <button class="signin-register-btn">Register</button>
            </div>
        </div>
    )
}

export default Register;