import { Link } from "react-router-dom"

function CustomerInvoicePreview({ invoice }) {
    return (<div className='cd-invoice-preview'>
        <Link to={`/${invoice.Username}/order/${invoice.InvoiceId}`} className='cd-invoice-preview-header'>
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
                {invoice.InvoiceStatus}
            </div>
        </Link>
    </div>)
}

export default CustomerInvoicePreview