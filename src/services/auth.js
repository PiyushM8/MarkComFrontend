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

export const requestLogin = async (email, pass) =>
{
    try{
        const response = await api.post(RouteConstants.LOGIN, {
            email: email,
            password: pass
        })
        console.log(response)
    }catch(err){
        console.log(err)
    }
}