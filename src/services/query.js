import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const getQueriesBySellerId = async () =>
{
    try{
        const response = await api.get(RouteConstants.QUERY)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const getQueryById = async (queryId) =>
{
    try{
        const response = await api.get(`${RouteConstants.QUERY}/${queryId}`)
        return response;
    }catch(err){
        return err.response;
    }
}

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