import { useState } from "react"
import "./contact.css"
import { createQuery } from "../../../services/query"
import { useLocation } from "react-router-dom"

function Contact()
{
    const location = useLocation()

    const [ queryData, setQueryData ] = useState({})

    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        queryData.StoreName = location.pathname.split("/")[1]
        await createQuery(queryData)
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setQueryData({
            ...queryData,
            [name]: value
        })
    };

    return (
        <div className="store-contact-page-container">
            <h1>Contact</h1>
            <form className="store-contact-form" onSubmit={handleSubmit}>
                <h3>Email</h3>
                <input name="Email" onChange={handleChange}/>
                <h3>Reason</h3>
                <input name="Reason" onChange={handleChange}/>
                <h3>Message</h3>
                <textarea name="Content" onChange={handleChange}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Contact