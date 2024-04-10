import "./contact.css"
import { Route, Routes } from "react-router-dom"

function ContactForm()
{
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <div className="store-contact-page-container">
                        <h1>Contact us at... (Support Email)</h1>
                    </div>
                }/>
            </Routes>
        </div>
    )
}

export default ContactForm