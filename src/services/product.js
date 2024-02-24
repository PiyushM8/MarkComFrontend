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