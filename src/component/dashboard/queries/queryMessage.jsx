import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import "./queries.css"
import Message from "./message/message"
import { addMessageToQueryId, getMessagesByQueryId } from "../../../services/message"

function QueryMessage()
{
    const location = useLocation()
    const queryId = location.pathname.split("/")[3]
    const [ messages, setMessages ] = useState([])

    const loadMessage = async () => {
        const response = await getMessagesByQueryId(queryId)
        setMessages(response.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ownerResponse = document.getElementById("owner-response").value
        
        const response = await addMessageToQueryId(queryId, ownerResponse)
        const responseStatus = response.status;

        if(responseStatus === 200)
        {
            alert("Created Message")
        }else{
            alert("Failed to create Message")
        }
    }

    useEffect(() => {
        loadMessage()
    }, [])

    return (
        <div className="db-query-messenger-container">
            <div className="db-query-messenger-header">
                Messages with {messages[0].Author}
            </div>
            <div>
                {messages.map((message) => {
                    return <Message message={message}/>
                })}
            </div>
            <form className="db-query-respond-cont" onSubmit={handleSubmit}>
                <input id="owner-response"className="db-query-response-input" placeholder="Enter your response..."/>
                <input className="db-query-response-btn" type="submit" value="Reply"/>
            </form>
        </div>
    )
}

export default QueryMessage