import { useState } from "react"
import "./contact.css"
import { createQuery } from "../../../services/query"
import { Route, Routes, useLocation } from "react-router-dom"
import ContactPage from "./contactPage"

function ContactForm()
{
    const location = useLocation()

    const [ queryData, setQueryData ] = useState({})

    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        queryData.StoreName = location.pathname.split("/")[1]
        const queryResponse = await createQuery(queryData)

        const queryCreationStatus = queryResponse.status;

        if(queryCreationStatus === 200)
        {
            alert("Successfully Created Query")
        }else if(queryCreationStatus === 400){
            alert("Bad request. Maybe missing email or reason")
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

    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <div className="store-contact-page-container">
                        <h1>Contact</h1>
                        <form className="store-contact-form" onSubmit={handleSubmit}>
                            <h3>Email</h3>
                            <input name="Email" onChange={handleChange}/>
                            <h3>Reason</h3>
                            <input name="Reason" onChange={handleChange}/>
                            <h3>Message</h3>
                            <textarea name="Content" onChange={handleChange} placeholder="Type your message here..."/>
                            <input className="store-contact-form-submit" type="submit"/> 
                        </form>
                    </div>
                }/>
                <Route path="/*" element={<ContactPage/>}/>
            </Routes>
        </div>
    )
}

export default ContactForm