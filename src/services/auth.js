import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const requestRegistration = async (sellerInfo) =>
{
    try{
        const response = await api.post(RouteConstants.REGISTER, sellerInfo)
        console.log(response)
    }catch(err){
        console.log(err)
    }
}

/**
 * Request a login
 * 
 * @param {*} email The email to login with
 * @param {*} password The password to login with
 * @returns The response from the backend
 */
export const requestLogin = async (email, password) =>
{
    try{
        // Send a request to the backend
        const response = await api.post(RouteConstants.LOGIN, {
            email: email,
            password: password
        })

        // If there were no errors then just return the response
        return response;
    }catch(err){

        // Return the response in the error
        console.log(err)
        return err.response
    }
}