import { Route, Routes } from "react-router-dom";
import "./dashboardInvoicePage.css"
import { useEffect, useState } from "react";
import { getInvoices } from "../../../services/invoice";

function DashboardInvoicePage() {

    const [ invoices, setInvoices ] = useState([])

    const onload = async () => {
        const invoicesResponse = await getInvoices()
        setInvoices(invoicesResponse.data)
    }

    useEffect(() => {
        onload()
    }, [])

    return (
        <div>
            <div className="db-page-containter">
                <Routes>
                    <Route path='/' element={
                        <div className='db-page-containter'>
                            <div className="db-page-title db-page-item">
                                <h2 className="db-page-title-header">Orders</h2>
                            </div>
                            <div className="cd-invoices-cont">
                                    {invoices.map((invoice) => {
                                        return <div className='cd-invoice-preview'>
                                            <div className='cd-invoice-preview-header'>
                                                <div className='cd-invoice-p-title-and-id'>
                                                    <div className='cd-invoice-p-title'>
                                                        {invoice.Quantity}x - {invoice.Title}
                                                    </div>
                                                    <div className='cd-invoice-p-id'>
                                                        Order #: {invoice.InvoiceId}
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
                                        </div>
                                    })}
                            </div>
                        </div>} />
                </Routes>
            </div>
        </div>
    );
}

export default DashboardInvoicePage;