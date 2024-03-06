import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const getMessagesByQueryId = async (queryId) =>
{
    try{
        const response = await api.get(`${RouteConstants.MESSAGE}/${queryId}`)
        console.log(response)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}