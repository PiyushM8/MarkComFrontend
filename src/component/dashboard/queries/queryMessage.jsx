import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import "./queries.css"
import Message from "./message/message"
import { addMessageToQueryId, getMessagesByQueryId } from "../../../services/message"
import { getQueryById } from "../../../services/query"

function QueryMessage()
{
    const location = useLocation()
    const queryId = location.pathname.split("/")[3]

    const [ messages, setMessages ] = useState([])
    const [ query, setQuery ] = useState({})
    const [ msgResponse, setMsgResponse] = useState('');
    const [ successfulUpload, setSuccessfulUpload] = useState(false);

    const loadMessage = async () => {
        const messagesResponse = await getMessagesByQueryId(queryId)
        const queryResponse = await getQueryById(queryId)

        setMessages(messagesResponse.data)
        setQuery(queryResponse.data)
    }

    const handleInputChange = (event) => {
        setMsgResponse(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ownerResponse = document.getElementById("owner-response").value
        
        const response = await addMessageToQueryId(queryId, ownerResponse)
        const responseStatus = response.status;

        if(responseStatus === 200)
        {
            alert("Created Message")
            setSuccessfulUpload(!successfulUpload)
        }else{
            alert("Failed to create Message")
        }
    }

    useEffect(() => {
        loadMessage()
    }, [successfulUpload])

    return (
        <div className="db-query-messenger-container">
            <div className="db-query-messenger-header">
                Messages with {query.Email}
            </div>
            <div className="query-messages-cont">
                {messages.map((message) => {
                    return <Message message={message}/>
                })}
            </div>
            <form className="db-query-respond-cont" onSubmit={handleSubmit}>
                <input id="owner-response"className="db-query-response-input" placeholder="Enter your response..." onChange={handleInputChange}/>
                <input className="db-query-response-btn" type="submit" value="Reply" disabled={!msgResponse.trim()}/>
            </form>
        </div>
    )
}

export default QueryMessage