import { useEffect, useState } from "react";
import "./customerOrderPage.css"
import { useLocation } from "react-router";
import { getInvoiceById } from "../../../services/invoice";
import { createFeedback } from "../../../services/feedback";
import { showLogin } from "../../../utils/loginregister";
import { createQuery } from "../../../services/query";

function CustomerInvoicePage()
{
    const location = useLocation()
    const invoiceId = location.pathname.split("/")[3];

    const [ rating, setRating ] = useState(0)
    const [ ratingReason, setRatingReason ] = useState("")
    const [ invoice, setInvoice] = useState({})
    const [ queryData, setQueryData ] = useState({})

    const onload = async () => 
    {
        const response = await getInvoiceById(invoiceId)
        
        if(response.status === 401)
        {
            showLogin()
        }else if(response.status === 403){
            alert(response.data.message)
        }else{
            setInvoice(response.data)
        }
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

    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        queryData.Email = invoice.CustomerEmail;
        queryData.StoreName = location.pathname.split("/")[1]
        const queryResponse = await createQuery(queryData)

        const queryCreationStatus = queryResponse.status;

        if(queryCreationStatus === 200)
        {
            alert("Successfully Contacted Seller")
            window.location.href = queryResponse.data.link
        }else if(queryCreationStatus === 400){
            alert("Bad request. Maybe missing email or reason")
        }else if(queryCreationStatus === 401){
            alert("Not authorized. Pleaese log into your customer account")
        }else if(queryCreationStatus === 500){
            alert("Internal Server Error")
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setQueryData({
            ...queryData,
            [name]: value
        })
    };

    useEffect(() => {
        onload()
    }, [])

    return (
        <div className="customer-invoice-page-cont">
            Customer Email: {invoice.CustomerEmail}<br/>
            Order Price: {invoice.InvoicePrice}<br/>
            Payment Method: {invoice.PaymentMethod}<br/>
            Quantity: {invoice.Quantity}<br/>
            Order Status: {invoice.InvoiceStatus}<br/>
            OrderId: {invoice.InvoiceId}

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

            <h1>Contact</h1>
            <form className="store-contact-form" onSubmit={handleSubmit}>
                <h3>Reason</h3>
                <input name="Reason" onChange={handleChange}/>
                <h3>Message</h3>
                <textarea name="Content" onChange={handleChange} placeholder="Type your message here..."/>
                <input className="store-contact-form-submit" type="submit"/> 
            </form>
        </div>
    )
}

export default CustomerInvoicePage;