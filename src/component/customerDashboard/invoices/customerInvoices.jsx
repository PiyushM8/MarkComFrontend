import { Route, Routes } from 'react-router'

import './customerInvoices.css'

import CustomerInvoicePage from './customerInvoicePage'

import { useEffect, useState } from 'react'
import { getInvoices } from '../../../services/invoice'
import CustomerInvoicePreview from './invoicePreview'

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
                            <h2 className="db-page-title-header">Orders</h2>
                        </div>
                        <div className="cd-invoices-cont">
                            {invoices.map((invoice) => {
                                return <CustomerInvoicePreview invoice={invoice}/>
                            })}
                        </div>
                    </div>} />
                <Route path='/*' element={CustomerInvoicePage} />
            </Routes>
        </div>
    )
}

export default CustomerInvoices