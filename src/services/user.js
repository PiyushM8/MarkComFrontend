import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const getUserByUsername = async (username) =>
{
    try{
        const response = await api.get(`${RouteConstants.USER}/${username}/all`)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}