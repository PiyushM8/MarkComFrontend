import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const createInvoice = async (invoice) =>
{
    try{
        const response = await api.post(RouteConstants.INVOICE, invoice)
        console.log(response)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}