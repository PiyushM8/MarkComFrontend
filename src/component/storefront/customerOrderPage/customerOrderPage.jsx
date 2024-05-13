import { useEffect, useState } from "react";
import "./customerOrderPage.css"
import { useLocation } from "react-router";
import { getInvoiceById } from "../../../services/invoice";
import { createFeedback } from "../../../services/feedback";
import { showLogin } from "../../../utils/loginregister";
import { createQuery } from "../../../services/query";

function CustomerInvoicePage() {
    const location = useLocation()
    const invoiceId = location.pathname.split("/")[3];

    const [rating, setRating] = useState(0)
    const [ratingReason, setRatingReason] = useState("")
    const [invoice, setInvoice] = useState({})
    const [queryData, setQueryData] = useState({})

    const onload = async () => {
        const response = await getInvoiceById(invoiceId)

        if (response.status === 401) {
            showLogin()
        } else if (response.status === 403) {
            alert(response.data.message)
        } else {
            setInvoice(response.data)
        }
    }

    const displayRating = (e, rating) => {
        const stars = document.querySelectorAll('.star');
        if (rating >= 1 && rating <= 5) {
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
        if (response.status === 200) {
            alert("Successfully Created Feedback")
        } else {
            alert("Error creating the feedback")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        queryData.Email = invoice.CustomerEmail;
        queryData.StoreName = location.pathname.split("/")[1]
        const queryResponse = await createQuery(queryData)

        const queryCreationStatus = queryResponse.status;

        if (queryCreationStatus === 200) {
            alert("Successfully Contacted Seller")
            window.location.href = queryResponse.data.link
        } else if (queryCreationStatus === 400) {
            alert("Bad request. Maybe missing email or reason")
        } else if (queryCreationStatus === 401) {
            alert("Not authorized. Pleaese log into your customer account")
        } else if (queryCreationStatus === 500) {
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
            {invoice && (
                <div className="invoice-p-top">
                    <div className="invoice-p-details">
                        <h1 className="invoice-p-headers">Your Order For {invoice.Title}</h1>
                        <p className="invoice-p-order-id">Order Id: {invoice.InvoiceId}</p>

                        <b>Customer Email:</b> {invoice.CustomerEmail}<br />
                        <b>Order Price:</b> ${(invoice.InvoicePrice || 0).toFixed(2)}<br />
                        <b>Payment Method:</b> {invoice.PaymentMethod}<br />
                        <b>Quantity:</b> {invoice.Quantity}<br />
                        <b>Order Status:</b> {invoice.InvoiceStatus}<br />
                    </div>
                    <div className="invoice-contact-form">
                        <h2 className="invoice-p-headers">Contact</h2>
                        <form onSubmit={handleSubmit}>
                            <h3>Reason</h3>
                            <input placeholder="Reason for contacting" name="Reason" className="contact-reason-input" onChange={handleChange} />
                            <h3>Message</h3>
                            <textarea name="Content" className="contact-input" onChange={handleChange} placeholder="Type your message here..." />
                            <input className="store-contact-form-submit" type="submit" value='Contact'/>
                        </form>
                    </div>
                </div>
            )}
            <h2>Leave feedback on your order</h2>
            <form onSubmit={onSubmit}>
                <div className="rating">
                    <span className="star" onClick={e => displayRating(e, 1)}>&#9733;</span>
                    <span className="star" onClick={e => displayRating(e, 2)}>&#9733;</span>
                    <span className="star" onClick={e => displayRating(e, 3)}>&#9733;</span>
                    <span className="star" onClick={e => displayRating(e, 4)}>&#9733;</span>
                    <span className="star" onClick={e => displayRating(e, 5)}>&#9733;</span>
                    <p id="ratingMessage"></p>
                </div>
                <textarea className="feedback-input" placeholder="Reason for your rating..." onChange={onChange} />
                <input type="submit" value="Leave Feedback" className="leave-feedback-btn"/>
            </form>
        </div>
    )
}

export default CustomerInvoicePage;
