export const signout = () => {
    window.sessionStorage.removeItem("Authorization")
    window.sessionStorage.removeItem("UserDetails")
    window.location.href = window.location
}