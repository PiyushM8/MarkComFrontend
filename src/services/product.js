import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const createProduct = async (product) =>
{
    try{
        const response = await api.post(RouteConstants.PRODUCT, product)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const getProducts = async (product) =>
{
    try{
        console.log("sent")

        const response = await api.get(RouteConstants.PRODUCT, product)
        console.log("Retrieveied")
        console.log(response)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}