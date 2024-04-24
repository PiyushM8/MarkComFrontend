import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const updateShoppingCart = async (shoppingCartItem) =>
{
    try{
        const response = await api.put(RouteConstants.SHOPPINGCART, shoppingCartItem)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const getShoppingCart = async () => {
    try{
        const response = await api.get(RouteConstants.SHOPPINGCART)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}

export const deleteShoppingCartItem = async (id) => {
    try{
        const response = await api.delete(`${RouteConstants.SHOPPINGCART}/${id}`)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}