import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const createQuery = async (query) =>
{
    try{
        const response = await api.post(RouteConstants.QUERY, query)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}