export const showLogin = () => {
    document.getElementById("login-form").style.display = "block"
    hideRegistration()
}

export const showRegistration = () => {
    document.getElementById("registration-form").style.display = "block"
    hideLogin()
}

export const hideLogin = () =>
{
    document.getElementById("login-form").style.display = "none"
}

export const hideRegistration = () =>
{
    document.getElementById("registration-form").style.display = "none"
}