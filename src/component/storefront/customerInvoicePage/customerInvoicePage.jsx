import { useEffect, useState } from "react";
import "./customerInvoicePage.css"
import { useLocation } from "react-router";
import { getInvoiceById } from "../../../services/invoice";
import { createFeedback } from "../../../services/feedback";

function CustomerInvoicePage()
{
    const location = useLocation()
    const invoiceId = location.pathname.split("/")[3];

    const [ rating, setRating ] = useState(0)
    const [ ratingReason, setRatingReason ] = useState("")
    const [ invoice, setInvoice] = useState({})

    const onload = async () => 
    {
        const response = await getInvoiceById(invoiceId)
        console.log(response.data)
        setInvoice(response.data)
    }

    const displayRating = (e, rating) => 
    {
        const stars = document.querySelectorAll('.star');
        if(rating >= 1 && rating <= 5)
        {
            setRating(rating)
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('filled'); // Fill the star
                } else {
                    star.classList.remove('filled'); // Unfill the star
                }
            });
            document.getElementById('ratingMessage').innerHTML = 'You rated ' + rating + ' stars.';
        }
    }

    const onChange = (e) => {
        setRatingReason(e.target.value)
    }
    
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(rating)
        console.log(ratingReason)
        const feedback = {
            Rating: rating,
            Message: ratingReason,
            InvoiceId: invoiceId
        }

        console.log(invoiceId)
        const response = await createFeedback(feedback)
        console.log(response.status)
        if(response.status === 200)
        {
            alert("Successfully Created Feedback")
        }else{
            alert("Error creating the feedback")
        }
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

            <form onSubmit={onSubmit}>
                <div class="rating">
                    <span class="star" onClick={e => displayRating(e, 1)}>&#9733;</span>
                    <span class="star" onClick={e => displayRating(e, 2)}>&#9733;</span>
                    <span class="star" onClick={e => displayRating(e, 3)}>&#9733;</span>
                    <span class="star" onClick={e => displayRating(e, 4)}>&#9733;</span>
                    <span class="star" onClick={e => displayRating(e, 5)}>&#9733;</span>
                    <p id="ratingMessage"></p>
                </div>
                <textarea placeholder="Reason for your rating..." onChange={onChange}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default CustomerInvoicePage;