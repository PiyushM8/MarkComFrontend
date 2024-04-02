import { Route, Routes } from 'react-router'

import './customerInvoices.css'

import CustomerInvoicePage from './customerInvoicePage'

import { useEffect } from 'react'
import { getInvoices } from '../../../services/invoice'

function CustomerInvoices()
{
    const onload = async () => {
        const invoiceResponse = await getInvoices()
        console.log(invoiceResponse.data)
    }

    useEffect(() => {
        onload()
    })

    return (
        <div className="db-page-containter">
            <Routes>
                <Route path='/*' element={CustomerInvoicePage}/>
            </Routes>
            <div className="db-page-title db-page-item">
                <h2 className="db-page-title-header">Invoices</h2>
            </div>
            <div className="db-page-item">
                <div className="invoice-table-cont">
                    <div className="invoice-item-cont invoice-item-head">
                        <div className="invoice-item-email">
                            Product
                        </div>
                        <div className="invoice-item-name">
                            Quantity
                        </div>
                        <div className="invoice-item-quanity">
                            Amount
                        </div>
                        <div className="invoice-item-price">
                            Actions
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInvoices