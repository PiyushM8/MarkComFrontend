import { Route, Routes } from 'react-router'

import './customerInvoices.css'

import CustomerInvoicePage from './customerInvoicePage'

import { useEffect, useState } from 'react'
import { getInvoices } from '../../../services/invoice'

function CustomerInvoices() {
    const [invoices, setInvoices] = useState([])

    const onload = async () => {
        const invoiceResponse = await getInvoices()
        setInvoices(invoiceResponse.data)
    }

    useEffect(() => {
        onload()
    }, [])

    return (
        <div className="db-page-containter">
            <Routes>
                <Route path='/' element={
                    <div className='db-page-containter'>
                        <div className="db-page-title db-page-item">
                            <h2 className="db-page-title-header">Invoices</h2>
                        </div>
                        <div className="cd-invoices-cont">
                            <div className="invoice-table-cont">
                                {invoices.map((invoice) => {
                                    return <div className='cd-invoice-preview'>
                                        <div className='cd-invoice-preview-header'>
                                            <div className='cd-invoice-p-title-and-id'>
                                                <div className='cd-invoice-p-title'>
                                                    {invoice.Quantity}x - {invoice.Title}
                                                </div>
                                                <div className='cd-invoice-p-id'>
                                                    Invoice #: {invoice.InvoiceId}
                                                </div>
                                            </div>
                                            <div className='cd-invoice-p-total'>
                                                <div className='cd-invoice-p-total-header'>
                                                    Total
                                                </div>
                                                <div className='cd-invoice-p-total-price'>
                                                    ${invoice.InvoicePrice}
                                                </div>
                                            </div>
                                            <div className='cd-invoice-p-status'>
                                                Paid
                                            </div>
                                        </div>
                                        <div className='cd-invoice-preview-main'>
                                            <div>
                                                <img className='cd-invoice-p-main-img' src={`https://imagedelivery.net/BMDilndsvZPipd90__49rQ/${invoice.ProductImage}/public`} />
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>} />
                <Route path='/*' element={CustomerInvoicePage} />
            </Routes>
        </div>
    )
}

export default CustomerInvoices