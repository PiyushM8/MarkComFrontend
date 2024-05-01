import { RouteConstants } from "../constants/AppConstants"
import api from "./apiConfig"

export const getInvoices = async () => {
    try{
        const response = await api.get(`${RouteConstants.INVOICE}`)
        console.log(response)
        return response
    }catch(err){
        console.log(err)
    }
}

export const getInvoiceById = async (invoiceId) =>
{
    try{
        const response = await api.get(`${RouteConstants.INVOICE}/${invoiceId}`)
        console.log(response)
        return response;
    }catch(err){
        console.log(err)
        return err.response;  
    }
}

export const createInvoice = async (invoice) =>
{
    try{
        const response = await api.post(RouteConstants.INVOICE, invoice)
        return response;
    }catch(err){
        console.log(err)
        return err.response;
    }
}