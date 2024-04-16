import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const createFeedback = async (feedback) =>
{
    try{
        const response = await api.post(RouteConstants.FEEDBACK, feedback)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const getFeedbackByStoreName = async (storeName) =>
{
    try{
        const response = await api.get(`${RouteConstants.FEEDBACK}/store/${storeName}`)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const getFeedbackByProductId = async (productId) =>
{
    try{
        const response = await api.get(`${RouteConstants.FEEDBACK}/${productId}`)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}