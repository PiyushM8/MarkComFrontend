import { useEffect, useState } from "react";
import "./customerInvoicePage.css"
import { useLocation } from "react-router";
import { getInvoiceById } from "../../../services/invoice";

function CustomerInvoicePage()
{
    const location = useLocation()
    const invoiceId = location.pathname.split("/")[3];

    const [invoice, setInvoice] = useState({})

    const onload = async () => 
    {
        const response = await getInvoiceById(invoiceId)
        console.log(response.data)
        setInvoice(response.data)
    }

    const setRating = (e, rating) => 
    {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('filled'); // Fill the star
            } else {
                star.classList.remove('filled'); // Unfill the star
            }
        });
        document.getElementById('ratingMessage').innerHTML = 'You rated ' + rating + ' stars.';
    }

    useEffect(() => {
        onload()
    }, [])

    return (
        <div className="customer-invoice-page-cont">
            Customer Email: {invoice.CustomerEmail}<br/>
            Invoice Price: {invoice.InvoicePrice}<br/>
            Payment Method: {invoice.PaymentMethod}<br/>
            Quantity: {invoice.Quantity}<br/>
            Invoice Status: {invoice.InvoiceStatus}<br/>
            InvoiceId: {invoice.InvoiceId}
            <div class="rating">
                <span class="star" onClick={e => setRating(e, 1)}>&#9733;</span>
                <span class="star" onClick={e => setRating(e, 2)}>&#9733;</span>
                <span class="star" onClick={e => setRating(e, 3)}>&#9733;</span>
                <span class="star" onClick={e => setRating(e, 4)}>&#9733;</span>
                <span class="star" onClick={e => setRating(e, 5)}>&#9733;</span>
            </div>
            <p id="ratingMessage"></p>
        </div>
    )
}

export default CustomerInvoicePage;