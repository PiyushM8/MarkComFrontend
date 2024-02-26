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
        const response = await api.get(RouteConstants.PRODUCT, product)
        console.log(response)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const deleteProductById = async (productId) =>
{
    try{
        const response = await api.delete(`${RouteConstants.PRODUCT}/${productId}`)
        console.log(response)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}