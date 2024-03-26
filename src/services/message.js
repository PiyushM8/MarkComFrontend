import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const getMessagesByQueryId = async (queryId) =>
{
    try{
        const response = await api.get(`${RouteConstants.MESSAGE}/${queryId}`)
        return response;
    }catch(err){
        return err.response;
    }
}

export const addMessageToQueryId = async (queryId, content) =>
{
    try{
        const response = await api.post(`${RouteConstants.MESSAGE}/${queryId}`, {
            Content: content
        })
        return response;
    }catch(err){
        console.log(err)
        return err.response
    }
}